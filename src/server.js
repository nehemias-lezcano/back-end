import express from "express";
import { routerProduct } from "./routes/products.router.js";
import { routerCart } from "./routes/cart.router.js";
import { engine } from "express-handlebars";
import { __dirname } from "./utils.js";
import { routerViews } from "./routes/views.router.js";
import { Server } from "socket.io";
import { ProductManager } from "./dao/managerFileS/productManager.js";
import { MessageManagerDB } from "./dao/managerDB/messagesManagerDB.js";
import { ProductManagerDB  } from "./dao/managerDB/productManagerDB.js";
import "./db/configDB.js"

const productManager = new ProductManager();
const messageManager = new MessageManagerDB();

const productManagerDB = new ProductManagerDB ();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/products", routerProduct);

app.use("/api/carts", routerCart);

app.use("/api/views", routerViews);

const httpServer = app.listen(8080, () => {
  console.log("LEYENDO PUERTO 8080");
});

const socketServer = new Server(httpServer);

const messagesTotal = [];

socketServer.on("connection", async (socket) => {

  console.log("CLIENTE CONECTADO");

  const productosOld = await productManager.getProduct();

  socket.emit("productsInitial", productosOld);

  socket.on("addProduct", async (product) => {

    const producto = await productManager.addProduct(product);

    const productosActualizados = await productManager.getProduct();

    socket.emit("productUpdate", productosActualizados);

    console.log(product);
  });

  socket.on("deleteProduct", async (productId) => {
    const productosOld = await productManager.getProduct();

    const producto = await productManager.deleteProductById(+productId);

    const productosActualizados = await productManager.getProduct();

    socket.emit("productDelete", productosActualizados);


  });


  //SERVER CHAT

  socket.on("newUser", (nUser) => {

    socket.broadcast.emit("userConnected", nUser)

  })

  socket.on("message", async (info) => {

    messagesTotal.push(info);

    const messageTotal = await messageManager.createOneMessage(info);

    socketServer.emit("chatTotal", messagesTotal)

  })



  

});
 

