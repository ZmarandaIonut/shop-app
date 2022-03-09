const fs = require("fs");

function getData(path){
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf-8", (err, data) => {
            if(err) 
               reject("Error!");
            else{
                resolve(data);
            }
        })
    });
}

module.exports = {
    getData
}