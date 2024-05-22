const express = require('express');
const next = require('next');
const expressWs = require('express-ws');
const axios = require('axios');
const app = express();
expressWs(app);

const path = require('path');
const fs = require('fs');
const Web3 = require('web3');

const crypto = require('crypto');
const THREE = require('three');
const WebSocket = require('ws');

require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: './src' });
const handle = nextApp.getRequestHandler();

const ethereumProviderUrl = process.env.API_INFURA_URL || 'https://mainnet.infura.io/v3/api';
const web3 = new Web3(new Web3.providers.HttpProvider(ethereumProviderUrl));

const PORT = process.env.PORT || 7050;
const loadRemoteIndexUrl = process.env.MAIN_SERVER_LOAD_REMOTE_INDEX_URL;

// İstemci bağlantıları için bir dizi
const clients = [];
// Başlangıçta rastgele oluşturulan API anahtarı
let apiKey = generateRandomString();

// Her 20 saniyede bir API anahtarını güncelleme
setInterval(() => {
  apiKey = `A-fS-${generateRandomString()}`;
  console.log('API Key updated:', apiKey);
}, 20000);

// Rastgele dize oluşturma fonksiyonu
function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&!?#-+_';
  let result = '';
  const length = 24;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

// Şifreleme yöntemleri dizisi
const encryptionMethods = ['aes-256-cbc', 'aes-192-cbc', 'aes-128-cbc'];

// Rastgele şifreleme yöntemi seçme fonksiyonu
function getRandomEncryptionMethod() {
  const randomIndex = Math.floor(Math.random() * encryptionMethods.length);
  return encryptionMethods[randomIndex];
}

// Mesaj şifreleme fonksiyonu
function encryptMessage(message, method) {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(method, key, iv);

  let encrypted = cipher.update(message, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
}

nextApp.prepare().then(() => {
  // Güvenlik başlıklarını ayarlama
  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // CORS başlıklarını ayarlama
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-api-key');

    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  // Statik dosyaları ve API yollarını yönetme
  app.use(express.static('public'));
  app.use(express.json());

  // Belirli bir dosyayı alma rotası
  app.use('/get-file/:fileName', async (req, res) => {
    const fileName = req.params.fileName;

    if (!fileName) {
      return res.status(400).send('Dosya adı belirtilmedi.');
    }

    try {
      const fileContent = await fs.promises.readFile(path.join(__dirname, 'dist', fileName), 'utf8');
      res.send(fileContent);
    } catch (error) {
      res.redirect('/error-page/404.html');
    }
  });

  // Uzaktan index.html dosyasını yükleme rotası
  app.get('/load-remote-index', async (req, res) => {
    try {
      const response = await axios.get(loadRemoteIndexUrl);
      res.set('Content-Type', response.headers['content-type']);
      res.send(response.data);
    } catch (error) {
      res.redirect('/error-page/404.html');
    }
  });

  // Statik dosyalar için /dist dizinini kullanma
  app.use(express.static(path.join(__dirname, 'dist')));
  app.use(express.json());

  // Ana sayfa rotası
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
  });

  // Bulunamayan rotalar için 404 sayfasına yönlendirme
  app.use((req, res) => {
    res.redirect('/error-page/404.html');
  });

  // Web3 bilgilerini alma rotası
  app.get('/web3-info', async (req, res) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const apiKeyInfo = `API Key: ${crypto.createHash('sha256').update(apiKey).digest('hex')}`;
      const responseData = {
        connectedAccounts: accounts,
        apiKey: apiKeyInfo,
      };
      res.json(responseData);
    } catch (error) {
      console.error('Web3 interaction error:', error.message);
      res.status(500).send('Error during Web 3 interaction');
    }
  });

  // WebSocket bağlantı rotası
  app.ws('/web3', async (ws, req) => {
    try {
      const accounts = await web3.eth.getAccounts();

      // Three.js sahne kurulumu (örnek)
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();

      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      const animate = function () {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      };

      animate();

      // Yeni API anahtarı oluşturma ve gönderme
      apiKey = `A-fS-${generateRandomString()}`;
      const hashedApiKey = crypto.createHash('sha256').update(apiKey).digest('hex');

      ws.send(`Connected accounts: ${accounts.join(', ')}\nAPI Key: ${hashedApiKey}`);
    } catch (error) {
      console.error('Web3 interaction error:', error.message);
      ws.send('Error during Web 3 interaction');
    }

    // İstemciyi diziye ekleme
    clients.push(ws);

    // Bağlantı kapatıldığında istemciyi diziden çıkarma
    ws.on('close', () => {
      const index = clients.indexOf(ws);
      if (index !== -1) {
        clients.splice(index, 1);
      }
    });
  });

  // İşlem gönderme rotası (API anahtarı doğrulaması ile)
  app.post('/send-transaction', (req, res) => {
    if (req.headers['x-api-key'] === apiKey) {
      const message = 'Hello! This message is sent only to the person connecting to the server.';
      const encryptionMethod = getRandomEncryptionMethod();

      const encryptedMessage = encryptMessage(message, encryptionMethod);
      console.log(`Transaction encrypted with ${encryptionMethod}:`, encryptedMessage);

      // Şifrelenmiş mesajı tüm bağlı istemcilere gönderme
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(encryptedMessage);
        }
      });

      res.status(200).send('Transaction sent successfully.');
    } else {
      res.status(401).send('Unauthorized. Invalid API key.');
    }
  });

  // Express.js için özel yolları tanımlama
  app.get('/api/web3-info', async (req, res) => {
    // Web3 ile ilgili işlemler burada yapılacak
  });

  // WebSocket bağlantıları için yol
  app.ws('/web3', (ws, req) => {
    // WebSocket ile ilgili işlemler burada yapılacak
  });

  // Tüm diğer yolları Next.js handler'ına yönlendirme
  app.get('*', (req, res) => {
    return handle(req, res);
  });

  // Sunucuyu başlat
  app.listen(PORT, () => {
    console.log(`Main Server Running: http://localhost:${PORT}`);
  });
});