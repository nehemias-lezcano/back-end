

import bcrypt from 'bcryptjs'

// crear el hash- lo usamos en register
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

// generar la funcion para comparar contraseña- lo usamos en login

export const isValidPassword = (password,user) => bcrypt.compareSync(password, user.password)



export default bcrypt