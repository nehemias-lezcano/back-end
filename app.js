class ProductManager {
    constructor() {
    this.products = []
}

    getProducts() {
    console.log(this.products);
    return this.products
}

getProductById(idProduct) {
    const product = this.products.find((p) => p.id === idProduct)
    if (!product) {
    console.log('Not found')
    return
}
    return product
}

addProduct(product) {
    const { name, price, stock, code } = product
    if (!name || !price || !stock || !code) {
    console.log('Some data is missing')
    return
}
    const isCodeRepeat = this.products.some((p) => p.code === code)
    if (isCodeRepeat) {
        console.log('Code already used')
        return
}
    let id
    if (!this.products.length) {
    id = 1

    } else {
    id = this.products[this.products.length - 1].id + 1
    }
    
    const newProduct = { id, ...product }
    this.products.push(newProduct)
    console.log('Product added')
    return newProduct
}
} /* fin del product manager*/


  // product  = {name,price,stock,code}
const manager = new ProductManager()
manager.addProduct({
    name: 'Samsung',
    price: 5000,
    code: '4535sdfsdfsd',
    stock: 16,
})
  manager.addProduct({
    name: 'Tablet samsung',
    price: 3000,
    code: '45645cvxvdf',
    stock: 13,
    })
    manager.getProducts()