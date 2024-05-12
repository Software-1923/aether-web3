const express = require('express');
const expressWs = require('express-ws');
const axios = require('axios');
const mongoose = require('mongoose');
const app = express();
expressWs(app);

const path = require('path');
const fs = require('fs');
const Web3 = require('web3');

const crypto = require('crypto');
const THREE = require('three');
const WebSocket = require('ws');

// .env dosyasını yükleyin
require('dotenv').config();

// Çevre değişkenlerine process.env üzerinden erişim sağlayabilirsiniz
// Örneğin: process.env.VARIABLE_NAME

// Ethereum sağlayıcısının URL'sini güncelleyin
const ethereumProviderUrl = process.env.API_INFURA_URL || 'https://mainnet.infura.io/v3/api';
const web3 = new Web3(new Web3.providers.HttpProvider(ethereumProviderUrl));

const PORT = process.env.PORT || 7050;
const mongoDBUrl = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const loadRemoteIndexUrl = process.env.MAIN_SERVER_LOAD_REMOTE_INDEX_URL;

mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true, dbName });

const clients = [];
let apiKey = generateRandomString();

// HTTP başlıklarını ayarlayan middleware ekleniyor
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// CORS middleware ekleniyor
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

// Dist klasöründeki dosyaları servis et
app.use('/get-file/:fileName', async (req, res) => {
  const fileName = req.params.fileName;

  if (!fileName) {
    return res.status(400).send('Dosya adı belirtilmedi.');
  }

  try {
      const fileContent = await fs.promises.readFile(path.join(__dirname, 'dist', fileName), 'utf8');
      res.send(fileContent);
    } catch (error) {
      // Eğer dosya bulunamazsa, 404.html sayfasına yönlendir
      res.redirect('/error-page/404.html');
    }
  });

// /load-remote-index endpoint'i eklendi
app.get('/load-remote-index', async (req, res) => {
  try {
    const response = await axios.get(loadRemoteIndexUrl);
    res.set('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    // Eğer dosya bulunamazsa, 404.html sayfasına yönlendir
    res.redirect('/error-page/404.html');
  }
});

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.use((req, res) => {
  // Yönlendirme tanımlaması olmayan tüm istekler için 404.html sayfasına yönlendir
  res.redirect('/error-page/404.html');
});

// /web3-info endpoint'i eklendi
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

app.ws('/web3', async (ws, req) => {
  try {
    const accounts = await web3.eth.getAccounts();

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

    apiKey = `A-fS-${generateRandomString()}`;
    const hashedApiKey = crypto.createHash('sha256').update(apiKey).digest('hex');

    ws.send(`Connected accounts: ${accounts.join(', ')}\nAPI Key: ${hashedApiKey}`);
  } catch (error) {
    console.error('Web3 interaction error:', error.message);
    ws.send('Error during Web 3 interaction');
  }

  clients.push(ws);

  ws.on('close', () => {
    const index = clients.indexOf(ws);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});

setInterval(() => {
  apiKey = `A-fS-${generateRandomString()}`;
  console.log('API Key updated:', apiKey);
}, 20000);

function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&!?#-+_';
  let result = '';
  const length = 24;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

app.post('/send-transaction', (req, res) => {
  if (req.headers['x-api-key'] === apiKey) {
    const message = 'Hello! This message is sent only to the person connecting to the server.';
    const encryptionMethod = getRandomEncryptionMethod();

    const encryptedMessage = encryptMessage(message, encryptionMethod);
    console.log(`Transaction encrypted with ${encryptionMethod}:`, encryptedMessage);

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

function getRandomEncryptionMethod() {
  const encryptionMethods = ['aes-256-cbc', 'aes-192-cbc', 'aes-128-cbc'];
  const randomIndex = Math.floor(Math.random() * encryptionMethods.length);
  return encryptionMethods[randomIndex];
}

app.listen(PORT, () => {
  console.log(`Main Server Running: http://localhost:${PORT}`);
});
