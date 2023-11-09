import { Router } from "express";
import { UsersManagerDB } from "../dao/managerDB/usersManagerDB.js"
const routerSessions = Router();
const usersManagerDB = new UsersManagerDB();


routerSessions.post("/signup", async (req, res) => {

  const { name, last_name, email, password } = req.body

  if (!email || !password || !name || !last_name) {

    return res.status(400).json({ message: "Faltan datos requeridos" });

  }

  try {

    const createUser = await usersManagerDB.createOne(req.body);
    res.status(200).json({ message: "User creado", user: createUser });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routerSessions.post("/login", async (req, res) => {

  const { email, password } = req.body

  if (!email || !password) {

    return res.status(400).json({ message: "Faltan datos requeridos" });

  }

  try {
    const user = await usersManagerDB.findByEmail(email);

    if (!user) {
      return res.redirect("/api/views/signup")
    }

    const passwordVald = user.password === password;

    if (!passwordVald) {

      return res.status(404).json({ message: "Clave incorrecta" });

    }

    let correoAdmin = "adminCoder@coder.com";
    let claveAdmin = "adminCod3r123";

    if (password === claveAdmin && email === correoAdmin) {

      req.session.user = { email, name: user.name, isAdmin: true };

    } else {

      req.session.user = { email, name: user.name, isAdmin: false };

    };

    res.redirect("/api/views/products")

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});


routerSessions.get("/signout", async (req, res) => {

  req.session.destroy(() => { res.redirect("/api/views/login") })

});

export { routerSessions };
