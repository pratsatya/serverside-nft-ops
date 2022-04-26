const nearAPI = require('near-api-js');
const { loadavg } = require('os');
const { keyStores, connect, utils } = nearAPI;
const homedir = require("os").homedir();
const CREDENTIALS_DIR = ".near-credentials";
const credentialsPath = require("path").join(homedir, CREDENTIALS_DIR);
const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);


// define near methods
async function nearInit(config) {
    // near init
    const near = await connect(config);
    console.log("*************************************************************************************** ",near);
    return near;
}

async function loadAccount(near,sender_account) {
    // near account 
    const account = await near.account(sender_account);
    console.log("*************************************************************************************** ",account);
    return account;
}

function loadContract(account,contract_name,contract_view_methods,contract_change_methods) {
    //load contract
    const contract = new nearAPI.Contract(
        account, // the account object that is connecting
        contract_name,
        {
          viewMethods: contract_view_methods, // view methods do not change state but usually return a value
          changeMethods: contract_change_methods, // change methods modify state
          sender: account, // account object to initialize and sign transactions.
        }
    );
    console.log("*************************************************************************************** ",contract);
}

async function accountState(near,wl_near_id) {
    console.log("*************************************************************************************** account state for: ",wl_near_id);
    // check near account state
    const wl_account = await near.account(wl_near_id);
    const accountstate = await wl_account.state();
    console.log(accountstate);
    return accountstate;
}





async function near_nftTransfer(config,contract_name,contract_view_methods,contract_change_methods,sender_account,token_ids,wl_ids) {

        const near = await nearInit(config);
        const account = await loadAccount(near,sender_account);
        const contract = loadContract(account,contract_name,contract_view_methods,contract_change_methods);

        // call contract
        for (let iter = 0; iter < wl_ids.length; iter++) {
            const wl_near_id = wl_ids[iter][0];
            //check account state
            try{
                const accountstate = await accountState(near,wl_near_id);
                //     for (let token_iter = 0; token_iter < token_ids.length; token_iter++) {
        //         const token_element = token_ids[token_iter];
        //         const methodcall = await contract.nft_mint_single( { token_type_id: token_element, receiver_id: element },
        //                                                             "300000000000000", // attached GAS (optional)
        //                                                             // "1000000000000000000000000" // attached deposit in yoctoNEAR (optional)
        //                                                             utils.format.parseNearAmount("1")
        //                                                           );
        //         console.log("*************************************************************************************** ",element,"  |  ",token_element);
        //         console.log(methodcall)
        //     }      
            }
            catch(e){
                console.log("Error out\n",e);
            }
        }
    }



module.exports = {
    nearInit,
    loadAccount,
    loadContract,
    accountState,
    near_nftTransfer
};











//near call uniqart-v1.testnet nft_mint_single '{"token_type_id":"9519", "receiver_id":"prats.testnet"}' --accountId near_lottery.testnet --gas 300000000000000 --deposit 0.1