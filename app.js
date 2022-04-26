// import methods
const configBlock = require('./configBlock.js');
const nearMethods = require('./nearMethods.js');
const readFile = require('./readFile.js');

// const fs = require('fs'); 
// const {parse} = require('csv-parse');

//user defined vars
//*******************************************************************************
const wl_file = "./wl_spots.csv"
// const wl_ids = ["prats.testnet","testbaby.testnet","dogeboi.testnet"];
const env = "testnet";
const token_ids = ["9520","9519"]
//*******************************************************************************

//read csv
const wl_ids = readFile.readFile(wl_file);

//get config
const config = configBlock.getConfig(env);

// call nft ops
nearMethods.near_nftTransfer(config,token_ids,wl_ids); //(config,token_ids,wl_ids)
