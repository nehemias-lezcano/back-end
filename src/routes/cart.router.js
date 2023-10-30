import { Router } from "express";
import { CartManager } from "../dao/managerFileS/cartManager.js";
import { CartManagerDB } from "../dao/managerDB/cartsManagerDB.js";
const routerCart = Router();
const cartManager = new CartManager();
const cartManagerBD = new CartManagerDB();

/* FILE SYSTEM

routerCart.get("/", async (req, res) => {
  try {
    let cart = await cartManager.getCart();

    res.status(200).json({ message: "Total Cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routerCart.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    let cartFiltrado = await cartManager.getCartById(+cid);

    if (!cartFiltrado) {
      res.status(404).json({ message: "cart not found" });
    } else {
      res.status(200).json({ message: "cart found", cartFiltrado });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
routerCart.post("/", async (req, res) => {
  try {
    let response = await cartManager.addCart();
    res.json({ response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routerCart.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let response = await cartManager.deleteCartById(+id);

    if (!response) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart delete" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routerCart.post("/:cid/product/:pid", async (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;

  try {
    let response = await cartManager.addProductInCart(+cid, +pid);
    res.json({ response, message: "Added product" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

*/

//Nuevo DB


routerCart.get("/", async (req, res) => {

  try {
    const carts = await cartManagerBD.findAllCart()



    res.status(200).json({ message: "carts total", carts });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routerCart.get("/:idCart", async (req, res) => {

  const { idCart } = req.params;

  try {
    const cart = await cartManagerBD.findCartById(idCart);

    res.status(200).json({ message: "cart by id", cart });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


routerCart.post("/", async (req, res) => {

  try {
    const createCart = await cartManagerBD.createOneCart();


    res.status(200).json({ message: "carrito creado", cart: createCart });


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routerCart.post("/:idCart/products/:idProduct", async (req, res) => {

  const { idCart, idProduct } = req.params;

  try {
    const productAdded = await cartManagerBD.addProductToCart(idCart, idProduct);

    res.status(200).json({ message: "PRODUCTO AGREGADO", product: productAdded });


  } catch (error) {

    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export { routerCart };

//653b11f7f4fb2fc0b83af757/products/6539b0275e3d00bf535dd2cf