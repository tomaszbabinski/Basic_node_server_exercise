const fs = require('fs');
const path = require('path');
const rootPath = require('../util/path')

const getProductsFromFile = cb => {
    const p = path.join(rootPath,'data','products.json');    
    fs.readFile(p,(err,fileContent) => {
        if(err){
            cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}
module.exports = class Product{
    constructor(t){
        this.title = t;
    }
    save(){
        const p = path.join(rootPath,'data','products.json');
        fs.readFile(p,(err,fileContent) => {
            let products = [];
            if(!err){
                products = JSON.parse(fileContent);    
            }
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err) => {
                console.log(err);
            });
        })    
    }
    static fetchAll(cb){
      getProductsFromFile(cb);
    }
};