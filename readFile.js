const fs = require('fs'); 
const {parse} = require('csv-parse');
const { resolve } = require('path');
const { rejects } = require('assert');


//define methods
function readFile(wl_file){
    return new Promise((resolve,reject) => {
          try {
            const records = [];
            // Initialize the parser
            const parser = parse({
            delimiter: ','
            });
            // Use the readable stream api to consume records
            parser.on('readable', function(){
                let record;
                while ((record = parser.read()) !== null) {
                records.push(record);
                }
            });
            // Catch any error
            parser.on('error', function(err){
                console.error(err.message);
                reject();
            });
            parser.on('end', function() {
                console.log("from readFile: ",records);
                resolve(records);
            });
    
        // open the file and pipe it into the parser
        fs.createReadStream(wl_file).pipe(parser);
        }  
        catch {
            reject();
        }
    });
        
}

module.exports = {
    readFile
};