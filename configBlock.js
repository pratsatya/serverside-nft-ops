const nearAPI = require('near-api-js');
const { keyStores, connect, utils } = nearAPI;
const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = require("path").join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);


//define methods
function getConfig(env) {
    switch(env){
        case 'mainnet':
            return {
                networkId: "mainnet",
                keyStore, 
                nodeUrl: "https://rpc.mainnet.near.org",
                walletUrl: "https://wallet.near.org",
                helperUrl: "https://helper.mainnet.near.org",
                explorerUrl: "https://explorer.near.org"
            }

        case 'testnet':
            return {
                networkId: "testnet",
                keyStore, 
                nodeUrl: "https://rpc.testnet.near.org",
                walletUrl: "https://wallet.testnet.near.org",
                helperUrl: "https://helper.testnet.near.org",
                explorerUrl: "https://explorer.testnet.near.org",
            }
    }
}
function getContractConfig(env){
    switch(env){
        case 'mainnet':
            return { contract_type:'uniqart-v1.near'}

        case 'testnet':
            return { contract_type: 'uniqart-v1.testnet'}
    }
}


module.exports = {
    getConfig,
    getContractConfig
};








// const config = {
//   networkId: "testnet",
//   keyStore, 
//   nodeUrl: "https://rpc.testnet.near.org",
//   walletUrl: "https://wallet.testnet.near.org",
//   helperUrl: "https://helper.testnet.near.org",
//   explorerUrl: "https://explorer.testnet.near.org",
// };