import { Router } from "express";
import { UsersManagerDB } from "../dao/managerDB/usersManagerDB.js"
import { hashData, compareData, generateToken } from "../utils.js";
import passport from "passport";

const routerSessions = Router();
const usersManagerDB = new UsersManagerDB();

/* LOGIN Y SIGNUP MANUAL

routerSessions.post("/signup", async (req, res) => {

  const { name, last_name, email, password } = req.body

  if (!email || !password || !name || !last_name) {

    return res.status(400).json({ message: "Faltan datos requeridos" });

  }

  try {

   const hashedPassword = await hashData(password);

    const createUser = await usersManagerDB.createOne({...req.body, password:hashedPassword});
    res.status(200).json({ message: "User creado", user: createUser })

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

    //const passwordVald = user.password === password;

    const passwordValdHash= await compareData(password, user.password);

    if (!passwordValdHash) {

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

*/



routerSessions.post("/signup", passport.authenticate("signup"), (req, res) => {

  return res.redirect("/api/views/products")

}


)


routerSessions.post("/login", passport.authenticate("login", { failureMessage: true, failureRedirect: "/api/views/error" }), (req, res) => {

  const { name, last_name, email } = req.user

  const token = generateToken({
    name,
    last_name,
    email
  });

  res.cookie("token", token, { maxAge: 60000, httpOnly: true })

  return res.redirect("/api/sessions/current")


}
)



routerSessions.get("/current", passport.authenticate("current", { session: false }), (req, res) => {

  const user = req.user
  res.json({ message: user })

})



routerSessions.get("/auth/github", passport.authenticate('github', { scope: ['user:email'] }));



routerSessions.get("/callback", passport.authenticate('github', {
  successRedirect: "/api/views/products",
  failureRedirect: "/api/views/error"
}),)


routerSessions.get("/signout", async (req, res) => {

  req.session.destroy(() => { res.redirect("/api/views/login") })

});


routerSessions.post("/restaurarPassword", async (req, res) => {

  const { email, newPassword } = req.body


  if (!email || !newPassword) {

    return res.status(400).json({ message: "Faltan datos requeridos" });

  }

  try {
    const user = await usersManagerDB.findByEmail(email);


    if (!user) {
      return res.redirect("/api/views/signup")
    }

    const hashedNewPassword = await hashData(newPassword);

    user.password = hashedNewPassword;

    await user.save()

    res.status(200).json({ message: "password update" });




  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});
export { routerSessions };
