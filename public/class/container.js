const fs = require('fs');
const encoding = "utf-8";

class Container {
    constructor (path) {
        
        this.filePath = path;
        this.createFirstFile();
        const products = fs.readFileSync(this.filePath, encoding);
        this.container = JSON.parse(products)
    }
    
    createFirstFile(){
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, '[]');
        }
    }

    saveAll (products) {
        const dataToString = JSON.stringify(products, null, 2);
        fs.writeFileSync(this.filePath, dataToString, encoding);
    }

    save = async (product) => {
        const lastId = this.container.length; 

        try {
            product.id = lastId+1;
            this.container.push(product);
            this.saveAll(this.container);
            return product;
        } catch (error) {
            console.log (error);
        };
    };

    update = async (id, product) => {
        try {
            const index = await this.container.findIndex(prod => prod.id === id);
            
            this.container[index] = product;    
            this.saveAll(this.container);
            return product;
        } catch (error) {
            console.log (error);
        };
    };
    update = async (id, product) => {
        try {
                const index = await this.container.findIndex(prod => prod.id === id);
                
                if(index<=0 || isNaN(id) || productToUpdate.Error) 
                {
                    const notFind = {Error: "Producto no encontrado"};
                    return notFind;            
                } else {
                    product.name = index.name;
                    product.price = index.price;
                    product.description = index.description;  
                    product.universe = index.universe;
                    product.details = index.details;
                    product.stock = index.stock;
                }

            
            
            this.saveAll(this.container);
        } catch (err) {
            console.log ( 'lo sentimos a habido un error', err);
        };
    };
    
    getById  = async (id) => {
        try { 
            const product = await this.container.find(product => product.id == id);
            if(id <= 0 || id > this.container.length || isNaN(id)){
                const notFind = {Error: "Producto no encontrado"};
                return notFind;            
            }
            return product
        } catch (err) {
            console.log ('Lo sentimos ha habido un error', err);
        };
    };
            

    getAll = async() => {
        try{
            return this.container;

        } catch (err) {
              console.log ('lo setimos a habido un error', err);
        };
    };

    getRandom = async() =>{
        try{
            const random = Math.floor(Math.random() * this.container.length);
            return this.container[random];
        } catch (err) {
            console.log ('lo sentimos a habido un error', err);
        };
    };

    deleteById = async (id) => {
        try {
            const filtered = this.container.filter(product => product.id !== id);
            this.container = filtered;
            this.saveAll(filtered);
        } catch (error) {
            console.log ('Lo sentimos ha habido un error', error);
        };
    };
        

    deleteAll = async () => {
        try {
            this.container = [];
            this._saveAll([]);
        } catch (error) {
            console.log ('Lo sentimos ha habido un error', error);
        }

    };
};


module.exports = Container;

