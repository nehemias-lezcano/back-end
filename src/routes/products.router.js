import { Router } from "express";
import { ProductManager } from "../productManager.js";

const routerProduct = Router();
const productManager = new ProductManager();

routerProduct.get("/", async (req, res) => {
  const { limit } = req.query;

  try {
    let products = await productManager.getProduct();

    if (limit) {
      let productsLimitados = products.slice(0, +limit);

      res.status(200).json({ message: "product found", productsLimitados });
    } else {
      res.status(200).json({ message: "product total", products });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routerProduct.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    let productoFiltrado = await productManager.getProductById(+pid);

    if (!productoFiltrado) {
      res.status(404).json({ message: "product not found" });
    } else {
      res.status(200).json({ message: "product found", productoFiltrado });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routerProduct.post("/", async (req, res) => {
  const { title, description, price, code, stock, category } = req.body;

  if (!title || !description || !price || !code || !stock || !category) {
    return res.status(400).json({ message: "Some data is missing" });
  }

  try {
    let response = await productManager.addProduct(req.body);
    res.json({ message: "product created", response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routerProduct.delete("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    let response = await productManager.deleteProductById(+pid);

    if (!response) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ message: "User delete" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routerProduct.put("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const response = await productManager.updateProduct(+pid, req.body);

    if (!response) {
      return res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ message: "User update" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { routerProduct };
