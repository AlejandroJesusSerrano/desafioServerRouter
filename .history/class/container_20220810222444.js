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

    saveToTable = async (item) => {
        try {
        this.container.push(item);
        this.saveAll(this.container);
        return item;
        } catch (err) {
            console.log(err);
        }
    };

    update = async (id, product) => {
        try {
            const index = await this.container.findIndex(prod => prod.id == id);
            
            this.container[index] = product;
            this.saveAll(this.container);
            return product;
            } catch (err) {
            
            console.log ( 'lo sentimos a habido un error', err);
        }
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
            

    getAll() {
            return this.container
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



// const fs = require('fs');
// const encoding = "utf-8";

// class Container {
//     constructor (path) {
        
//         this.filePath = path;
//         this.createFirstFile();
//         const data = fs.readFileSync(this.filePath, encoding);
//         this.container = JSON.parse(data)
//     }
    
//     createFirstFile(){
//         if (!fs.existsSync(this.filePath)) {
//             fs.writeFileSync(this.filePath, '[]');
//         }
//     };


//     saveAll (data) {
//         const dataToString = JSON.stringify(data, null, 2);
//         fs.writeFileSync(this.filePath, dataToString, encoding);
//     }

//     getAll() {
//         return this.container
//     };

//     save = async (item) => {
//         const lastId = this.container.length; 

//         try {
//             item.id = lastId+1;
//             this.container.push(item);
//             this.saveAll(this.container);
//             return item;
//         } catch (error) {
//             console.log (error);
//         };
//     };

//     saveToTable(item) {
//             this.container.push(item);
//             this.saveAll(this.container);
//             return item;
//     };
    
//     //?UPDATE ASYNC, Funciona: averiguar si con map destructurar el objeto que se devuelve. 
//     // update(id, item) => {
//     //     try {
//     //         const index = await this.container.findIndex(itm => itm.id == id);
            
//     //         this.container[index] = item;
//     //         this.saveAll(this.container);
//     //         return item;
//     //         } catch (err) {
            
//     //         console.log ( 'lo sentimos a habido un error', err);
//     //     }
//     // };

//                                                 //! VER PARA CORREGIR DESPUES DE LA ENTREGA

//     //* FUNCIONA Y DEVUELVE ARRAY, No es el metodo recomendado. 
//     update(id, item) {
//         const index = this.container.findIndex(itm => itm.id == id);
                
//         this.container[index] = item;
//         this.saveAll(this.container);
//     };
    
//     getById  = async (id) => {
//         try { 
//             const item = await this.container.find(item => item.id == id);
//             if(id <= 0 || id > this.container.length || isNaN(id)){
//                 const notFind = {Error: "item no encontrado"};
//                 return notFind;            
//             }
//             return item
//         } catch (err) {
//             console.log ('Lo sentimos ha habido un error', err);
//         };
//     };
            

//     getAll() {
//             return this.container
//     };

//     getRandom = async() =>{
//         try{
//             const random = Math.floor(Math.random() * this.container.length);
//             return this.container[random];
//         } catch (err) {
//             console.log ('lo sentimos a habido un error', err);
//         };
//     };

//     deleteById = async (id) => {
//         try {
//             const filtered = this.container.filter(item => item.id !== id);
//             this.container = filtered;
//             this.saveAll(filtered);
//         } catch (error) {
//             console.log ('Lo sentimos ha habido un error', error);
//         };
//     };
        

//     deleteAll = async () => {
//         try {
//             this.container = [];
//             this._saveAll([]);
//         } catch (error) {
//             console.log ('Lo sentimos ha habido un error', error);
//         }

//     };
// };


// module.exports = Container;