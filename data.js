// data.js
const Web3 = require('web3');
const web3 = new Web3('https://eth-mainnet.g.alchemy.com/v2/W0euO4lKSsktbMBH3QVnxMR2Vkbh5qIm');

async function fetchData() {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log('Connected accounts:', accounts);
    return accounts;
  } catch (error) {
    console.error('Web3 interaction error:', error.message);
    throw new Error('Error during Web 3 interaction');
  }
}

// fetchData functionunu çağıran bir async fonksiyon içinde çalıştırılmalıdır
async function main() {
  try {
    const accounts = await fetchData();
    const hardhatConfig = require('./hardhat.config.js'); // Dosya yolunu doğru bir şekilde güncelleyin
    console.log('Hardhat config result:', await hardhatConfig(accounts));
  } catch (error) {
    console.error('Error during main function execution:', error.message);
  }
}

main();

module.exports = fetchData;


