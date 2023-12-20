//Importaciones
const express = require('express')
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const { Server } = require('socket.io')
const logger = require('morgan')
const { connectDB } = require('./config/configServer')
const passport = require('passport')
require('dotenv').config()
const cors = require('cors')

const router = require('./routes/index')
const { socketProducts } = require('./utils/socketProducts')
const { socketChat } = require('./utils/socketChat')
const { 
    initPassportGithub, 
    initPassportJwt 
} = require('./config/configPassport')



//Inicializaciones
const app = express()
const PORT = process.env.PORT || 8080

connectDB()

//Configuraciones
const httpServer = app.listen(PORT, () => {
    console.log('Listening on port 8080')
})

//Setear motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//Setear body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Setear cors
app.use(cors())

//Setear static
app.use('/static', express.static(__dirname + '/public'))
app.use(cookieParser('secretWord'))

//Setear passport
initPassportJwt()
initPassportGithub()
passport.use(passport.initialize())


//Setear socket.io
const io = new Server(httpServer)
socketProducts(io)
socketChat(io)

//Llamada a las rutas
app.use(router)


//Middlewares
app.use(logger('dev'))


