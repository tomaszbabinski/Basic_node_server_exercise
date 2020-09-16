const product = [];

module.exports = class Product{
    constructor(t){
        this.title = t;
    }

    save(){
        products.push(this);    
    }

    static fetchAll(){
        return this.products;
    }
}