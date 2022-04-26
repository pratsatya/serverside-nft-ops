// import methods
const configBlock = require('./configBlock.js');
const nearMethods = require('./nearMethods.js');
const readFile = require('./readFile.js');

//user defined vars
//*******************************************************************************
const env = "testnet";

const contract_view_methods = [];
const contract_change_methods = ["nft_mint_single"];

const sender_account = "near_lottery.testnet"

const wl_file = "./wl_spots.csv"
// const wl_ids = ["prats.testnet","testbaby.testnet","dogeboi.testnet"];

const token_ids = ["9520","9519"]
//*******************************************************************************

//get config
const config = configBlock.getConfig(env);
//get contract name
const contract_name = configBlock.getContractConfig(env).contract_type;
console.log(contract_name);


//Call Methods*******************************************************************
//*******************************************************************************
//*******************************************************************************

//transfer nfts
// const wl_ids = 
readFile.readFile(wl_file).then(async (wl_ids) => {
    console.log("appjs out: ",wl_ids);
    nearMethods.near_nftTransfer(config,contract_name,contract_view_methods,contract_change_methods,sender_account,token_ids,wl_ids);
}).catch();
