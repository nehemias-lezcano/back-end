const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data);
    }

    getProducts() {
        return this.products;
    }

    getProductById(idProduct) {
        const product = this.products.find((p) => p.id === idProduct);
        return product;
    }

    addProduct(product) {
        const { title, description, price, thumbnail, code, stock } = product;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Some data is missing');
            return;
        }

        const isCodeRepeat = this.products.some((p) => p.code === code);
        if (isCodeRepeat) {
            console.log('Code already used');
            return;
        }

        const id = this.products.length > 0 ? Math.max(...this.products.map((p) => p.id)) + 1 : 1;

        const newProduct = { id, title, description, price, thumbnail, code, stock };
        this.products.push(newProduct);
        this.saveProducts(); // Guardar en el archivo
        console.log('Product added');
        return newProduct;
    }

    updateProduct(idProduct, updatedFields) {
        const productIndex = this.products.findIndex((p) => p.id === idProduct);

        if (productIndex === -1) {
            console.log('Product not found');
            return;
        }

        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
        this.saveProducts(); // Guardar en el archivo
        console.log('Product updated');
        return this.products[productIndex];
    }

    deleteProduct(idProduct) {
        const productIndex = this.products.findIndex((p) => p.id === idProduct);

        if (productIndex === -1) {
            console.log('Product not found');
            return;
        }

        this.products.splice(productIndex, 1);
        this.saveProducts(); // Guardar en el archivo
        console.log('Product deleted');
    }
}

const manager = new ProductManager('products.json');

manager.addProduct({
    title: 'Samsung',
    description: 'Smartphone',
    price: 5000,
    thumbnail: 'samsung.jpg',
    code: '4535sdfsdfsd',
    stock: 16,
});

manager.addProduct({
    title: 'Tablet Samsung',
    description: 'Tablet',
    price: 3000,
    thumbnail: 'tablet.jpg',
    code: '45645cvxvdf',
    stock: 13,
});

console.log(manager.getProducts());
