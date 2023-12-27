//Importaciones
const express = require('express')
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const { Server } = require('socket.io')
const {logger} = require('./config/logger')
const { connectDB } = require('./config/configServer')
const passport = require('passport')
require('dotenv').config()
const cors = require('cors')

// swagger
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')



const router = require('./routes/index')
const { socketProducts } = require('./utils/socketProducts')
const { socketChat } = require('./utils/socketChat')
const { 
    initPassportGithub, 
    initPassportJwt 
} = require('./config/configPassport')
const { errorHandler } = require('./middlewares/error.middleware')
const addLogger = require('./middlewares/addLogger.middleware')
const { swaggerOptions } = require('./docs/swagger')



//Inicializaciones
const app = express()
const PORT = process.env.PORT || 8080

connectDB()
//Inicio logger
app.use(addLogger)

//Configuraciones
const httpServer = app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`)})



//Setear motor de plantillas Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//Setear body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Setear cors
app.use(cors())

const specs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))



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

//Llamada al middleware de error
app.use(errorHandler)

