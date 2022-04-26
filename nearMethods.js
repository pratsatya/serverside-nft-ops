const nearAPI = require('near-api-js');
const { keyStores, connect, utils } = nearAPI;
const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = require("path").join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);


async function near_nftTransfer(config,token_ids,wl_ids) {
        // near account 
        const near = await connect(config);
        console.log("*************************************************************************************** ",near);
        // console.log(near);
          
        // get account
        const account = await near.account("near_lottery.testnet");
        console.log("*************************************************************************************** ",account);
        // console.log(account);
          
        //load contract
        const contract = new nearAPI.Contract(
            account, // the account object that is connecting
            "uniqart-v1.testnet",
            {
              // viewMethods: ["getMessages"], // view methods do not change state but usually return a value
              changeMethods: ["nft_mint_single"], // change methods modify state
              sender: account, // account object to initialize and sign transactions.
            }
        );
        console.log("*************************************************************************************** ",contract);
        // console.log(contract);

        // call contract
        for (let iter = 0; iter < wl_ids.length; iter++) {
            const element = wl_ids[iter];
            for (let token_iter = 0; token_iter < token_ids.length; token_iter++) {
                const token_element = token_ids[token_iter];
                const methodcall = await contract.nft_mint_single( { token_type_id: token_element, receiver_id: element },
                                                                    "300000000000000", // attached GAS (optional)
                                                                    // "1000000000000000000000000" // attached deposit in yoctoNEAR (optional)
                                                                    utils.format.parseNearAmount("1")
                                                                  );
                console.log("*************************************************************************************** ",element,"  |  ",token_element);
                console.log(methodcall)
            }      
        }
    }









module.exports = {
    near_nftTransfer
};











//near call uniqart-v1.testnet nft_mint_single '{"token_type_id":"9519", "receiver_id":"prats.testnet"}' --accountId near_lottery.testnet --gas 300000000000000 --deposit 0.1