import { Router } from "express";
import { ProductManager } from "../dao/managerFileS/productManager.js";
import { ProductManagerDB } from "../dao/managerDB/productManagerDB.js";
import { CartManagerDB } from "../dao/managerDB/cartsManagerDB.js";

const productManagerDB = new ProductManagerDB();
const cartManagerDB = new CartManagerDB();
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

/*
routerViews.get("/products", async (req, res) => {

  if (!req.session.user) {

    return res.redirect("/api/views/login")
    
  }

  let products = await productManagerDB.findAll(req.query)

  let productsDB = products.payload

  const productsObject = productsDB.map(p => p.toObject());

  res.render("products", {
    productsData: productsObject,
    user: req.session.user
  });


});
*/
routerViews.get("/products", async (req, res) => {

  if (!req.session.passport) {

    return res.redirect("/api/views/login")

  }

  let products = await productManagerDB.findAll(req.query)

  let productsDB = products.payload

  const productsObject = productsDB.map(p => p.toObject());

  const { name } = req.user


  res.render("products", {
    productsData: productsObject,
    user: { name },
    style: "product"
  });


});

routerViews.get("/carts/:cartId", async (req, res) => {

  const { cartId } = req.params

  let cartById = await cartManagerDB.findCartById(cartId);

  let cartArray = cartById.products;

  const cartArrayObject = cartArray.map(doc => doc.toObject());

  console.log(cartArrayObject);

  res.render("cart", {
    cartData: cartArrayObject
  });

});



routerViews.get("/login", async (req, res) => {

  // console.log(req);

  if (req.session.user) {

    return res.redirect("/api/views/products")

  }

  res.render("login")

});


routerViews.get("/signup", async (req, res) => {

  if (req.session.user) {

    return res.redirect("/api/views/products")

  }

  res.render("signup")

});

routerViews.get("/profile", async (req, res) => {

  res.render("profile")

});

routerViews.get("/restaurarPassword", async (req, res) => {

  res.render("restaurarPassword")


});

routerViews.get('/error', async (req, res) => {

  //console.log(req);

 let message = req.session.messages[0]

  res.render("error", { message })
})

export { routerViews };
