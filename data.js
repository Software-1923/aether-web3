const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const detectEthereumProvider = require('@metamask/detect-provider');
const dotenv = require('dotenv').config({ path: './.env' }); // dotenv modülünü kullanarak server.env dosyasını oku

const alchemyApiKey = process.env.ALCHEMY_API_KEY;
const alchemyUrl = process.env.ALCHEMY_URL; // Yeni eklenen Alchemy URL parametresi

const alchemyWeb3 = createAlchemyWeb3(alchemyApiKey, alchemyUrl); // Alchemy URL parametresini createAlchemyWeb3 fonksiyonuna ekleyin

async function fetchData() {
  try {
    const provider = await detectEthereumProvider();
    if (provider) {
      if (provider !== window.ethereum) {
        console.error('Doğru Ethereum sağlayıcısı bulunamadı.');
        return;
      }
      console.log('Metamask sağlayıcısı algılandı.');
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      console.log('Connected accounts:', accounts);
      return accounts;
    } else {
      console.error('Metamask sağlayıcısı bulunamadı.');
      return;
    }
  } catch (error) {
    console.error('Erişim engellendi:', error.message);
    throw new Error('Error during Metamask interaction');
  }
}

async function main() {
  try {
    const accounts = await fetchData();
    // Burada hardhat.config.js dosyasıyla ilgili bir işlem yapılıyor. Bu kısmı projenize göre güncelleyin.
    // Örneğin, hardhat.config.js dosyasını require ederek veya fonksiyon çağrısı yaparak kullanabilirsiniz.
    // const hardhatConfig = require('./hardhat.config.js');
    // console.log('Hardhat config result:', await hardhatConfig(accounts, ethAddress));
  } catch (error) {
    console.error('Ana fonksiyonun çalıştırılması sırasında hata oluştu:', error.message);
  }
}

main();

module.exports = fetchData;

