import mongoose from 'mongoose';
import dotenv from 'dotenv';
import commander from '../utils/commander.js';
import MongoSingleton from '../utils/singleton.js';

dotenv.config();

const { mode } = commander.opts();
dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
});

// Cargar las variables de entorno
const {
  MONGO_URL_LOCAL,
  PERSISTENCE,
  PORT,
  JWT_PRIVATE_KEY,
  GMAIL_USER_APP,
  GMAIL_PASS_APP
} = process.env;

// Crear una instancia de MongoSingleton
MongoSingleton.getInstance();

const connectDb = async () => {
  try {
    const url = MONGO_URL_LOCAL || 'mongodb://localhost:27017/comision39750';
    const port = PORT
    // Conectar a la base de datos MongoDB
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Base de datos conectada');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

//connectDb();





/* import mongoose from 'mongoose';
import {connect} from 'mongoose';

import dotenv from 'dotenv'
import { JWT_PRIVATE_KEY } from '../utils/jwt.js';
import commander from '../utils/commander.js';

import MongoSingleton from '../utils/singleton.js';


const {mode} =commander.opts()
dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
});


const connectDb = () => {
    const url = process.env.MONGO_URL_LOCAL || 'mongodb://localhost:27017/comision39750';
    const persistence = process.env.PERSISTENCE;
    const port = process.env.PORT;
    const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;
    gmail_user_app : process.env.GMAIL_USER_APP;
    gmail_pass_app : process.env.GMAIL_PASS_APP,
    
    MongoSingleton.getInstance();

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Base de datos conectada');
    })
    .catch((err) => {
        console.error('Error al conectar a la base de datos:', err);
    });
};


//let url = process.env.MONGO_URL_LOCAL
//const url = 'mongodb://localhost:27017/comision39750'

/* const configServer= {
     connectDb:() => {
    connect(url)
      console.log('Base de datos conectada');
  }
 }   */
/* const connectDb = () => {
    persistence:process.env.PERSISTENCE;
    port:process.env.PORT;
    JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY

    MongoSingleton.getInstance()
   /* try {
       connect(url)
       console.log(`MongoDB Connected Puerto: ${url}`);
 
  
  } catch (err) {
      console.log(err);
      } 
  }; 
   */
   
  export default connectDb 