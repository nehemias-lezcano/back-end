
class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, stock) {
        const product = {
            id: !this.products.length ? 1 : this.products[this.products.length - 1].id + 1,
            title,
            description,
            price,
            thumbnail,
            stock
        };
        this.products.push(product);
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);

        if (product) {
            return product;
        } else {
            console.error("Product not found");
            return null; // Puedes devolver null u otro valor indicativo de que el producto no se encontró
        }
    }
}

// Ejemplo de uso:
const productManager = new ProductManager();
productManager.addProduct("Producto 1", "Descripción del producto 1", 19.99, "imagen1.jpg", 10);
productManager.addProduct("Producto 2", "Descripción del producto 2", 29.99, "imagen2.jpg", 5);

const productId = 1;
const foundProduct = productManager.getProductById(productId);

if (foundProduct) {
    console.log("Product found:", foundProduct);
} else {
    console.log("Product not found");
}

