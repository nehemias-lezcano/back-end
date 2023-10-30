import { Router } from "express";
import { ProductManager } from "../dao/managerFileS/productManager.js";

const productManager = new ProductManager();
const routerViews = Router();

routerViews.get("/", async (req, res) => {
  let products = await productManager.getProduct();

  res.render("home", {
    products: products,
  });
});

routerViews.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts");
});


routerViews.get("/chat", async (req, res) => {
  res.render("chat");
});
export { routerViews };
