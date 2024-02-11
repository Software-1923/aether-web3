const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 9050;

// Web3 bilgilerini almak için axios kullanımı
axios.get('http://localhost:7050/web3-info')
  .then(response => {
    console.log(response.data);

    // response.data üzerinden gerekli bilgileri alarak işlemlerinizi gerçekleştirin
    // Örneğin, response.data.connectedAccounts, response.data.apiKey, gibi bilgileri kullanarak işlemler yapabilirsiniz.
  })
  .catch(error => {
    console.error('Error fetching data from server.js:', error.message);
});

// Statik dosyaları sunmak için express.static middleware'i kullanılıyor
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../dist')));

// JSX, TS, TSX dosyalarını sunmak için aşağıdaki satırları ekleyebilirsiniz
app.use('*.jsx', express.static(path.join(__dirname, '../public')));
app.use('*.tsx', express.static(path.join(__dirname, '../public')));
app.use('*.ts', express.static(path.join(__dirname, '../public')));

// HTML dosyalarını sunmak için
app.use('*.html', express.static(path.join(__dirname, '../public')));

// CSS dosyalarını sunmak için
app.use('*.css', express.static(path.join(__dirname, '../public')));

// JS dosyalarını sunmak için
app.use('*.js', express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
  console.log(`Public server is running on port ${PORT}.`);
});


