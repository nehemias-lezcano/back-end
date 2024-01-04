import fs from 'fs'
//const fs = require('fs')
const path = './productManager.js'
 class productManager{
    constructor(){
        this.products =[]
            this.path = '../src/dao/products.json'
        
    }
    __appendProduct = async () => {

        const toJSON = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, toJSON)
    };

    addProduct = async (title, description, price, status, category, thumbnails, code, stock) => {
        const productsFS = await this.getProducts();
        // console.log(productsFS);
        this.products = productsFS
        
        let product = {
            title,
            description,
            price,
            status,
            category,
            thumbnails,
            code,
            stock
        }
        // console.log(product, 'codigo----');
        // Validacion de codigo 
        const validarCodigo = this.products.find(productos => productos.code === product.code)
        if (validarCodigo) {
            return { status: "error", message: 'product not added, existing code' }
        }
        // ID Autoincremental
        if (this.products.length === 0) {
            product.id = 1
        } else {
            product.id = this.products[this.products.length - 1].id + 1
        }
        //console.log(product,"antes del if");
        // Verifica que el objeto tenga todos sus valores
        if (Object.values(product).every(value => value)) {
            (product.status === 'false')? product.status = false : product.status = true;
            console.log(product.price, 'precio');
            product.price = Number(product.price)
            product.stock = Number(product.stock)
            product.thumbnails = [product.thumbnails]
            this.products.push(product);
            this.__appendProduct()
            return { status: "success", message: 'registered product', producto: product };

        }
        return { status: "error", message: ' Error Complete all ' };

    }

    getProducts = async () => {
        try {
            const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
            if (getFileProducts.length === 0) return [];
            return JSON.parse(getFileProducts)
        } catch (err) {
            console.log(err);
            return { status: "error", error: err }
        }

    }

    getProductById = async (id) => {
        try {
            const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
            const parseProducts = JSON.parse(getFileProducts);
            console.log(parseProducts[id - 1]);
            if (!parseProducts[id - 1]) return 'Error! does not exist'

            return parseProducts[id - 1]
        }
        catch (err) {
            console.log(err);
        }
    }



    updateProduct = async (pid, data) => {
        const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
        const parseProducts = JSON.parse(getFileProducts);
        // console.log(parseProducts);
        if (isNaN(Number(pid))) return { status: "error", message: 'Invalid id' };

        const findId = parseProducts.findIndex(product => product.id == pid)
        if (findId === -1) return { status: "error", message: 'id not found' };

        const returnedTarget = Object.assign(parseProducts[pid - 1], data);

        parseProducts[pid - 1] = returnedTarget;

        this.products = parseProducts
        this.__appendProduct()
        return returnedTarget

    }

    deleteProduct = async (pid) => {
        const getFileProducts = await fs.promises.readFile(this.path, 'utf-8')
        const parseProducts = JSON.parse(getFileProducts);
        if (isNaN(Number(pid))) return { status: "error", message: 'Invalid id' };

        const findId = parseProducts.findIndex(product => product.id == pid)
        if (findId === -1) return { status: "error", message: 'id not found' };

        const filtro = parseProducts.filter(product => product.id !== pid)
        // console.log(parseProducts);
        this.products = filtro;
        this.__appendProduct();
        return { status: "success", message: `the product with id ${pid}  was deleted` }
    }
};

const instancia = new productManager();
//const test = async () => {                                                                                                                                    
//await instancia.addProduct ("Mermelada de durazno", 'Con azucar mascabo',250,true, "Mermelada","Sin imagen","A111",25);
//await instancia.addProduct('Mermelada de ciruela','Con ciruelas amarillas', 300,true,"Mermelada","Sin imagen","A112",25) 
//await instancia.addProduct('Mermelada de damasco','Con jenjibre',350,true,"Mermelada", "Sin imagen", "A113", 25),
//await instancia.addProduct('Mermelada de higos','De higos negros',350,true,"Mermelada","Sin imagen","A114",25),
//await instancia.addProduct('Mermelada de tomates','De tomates perita',300,true, "Mermelada","Sin imagen","A115",25),
//await instancia.addProduct('Higos en almibar', "Con pedacitros de nuez",550,true,"Conserva","Sin imagen","B111",15),
//await instancia.addProduct('Duraznos en almibar','Con canela',450,true,"Conserva", "Sin imagen","B112",15),
//await instancia.addProduct('Peras en almibar ','Con almibar de limon',450,true, "Conserva","Sin imagen","B113",15),
//await instancia.addProduct('Dulce de membrillo','Barra de dulce de membrillo',650,true,"Dulce en barra","Sin imagen","C111",10),
//await instancia.addProduct('Dulce de batata','Barra de dulce de batata',650,true,"Dulce en barra","Sin imagen","C112",10)
//};
// const test = async () => {
//     // await instancia.deleteProduct(5)
//     const ver = await instancia.getProducts()
//     // const filtro = ver
//     // console.log(filtro);
//     console.log(ver)
// }
// test();
// // console.log(instancia.products);

// console.log(instancia.getProductById(4))
// // instancia.getProductById(2);
// // instancia.getProductById(4);
/* instancia.updateProduct(1, {
   "title": "Mermelada de Frambuesa",
   "description": "con semillas",
   "price": 550,
    "status":true,
    "category" :"Mermelada",
    "thumbnails": "sin imagen",
    "code": "A116",
    "stock": 15,
  })
 //instancia.deleteProduct(3)*/

export default productManager;
//module.export = productManager
