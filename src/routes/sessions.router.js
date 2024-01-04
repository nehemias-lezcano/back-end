import { Router } from 'express'
const router = Router()
import SessionsController from '../controllers/sessions.controller.js'
import passport from 'passport'
import passportCall from '../passport.jwt/passportCall.js'//rutas con proteccion
import authorization from '../passport.jwt/authorizacionJwtRole.js'
import {sessionsController} from '../controllers/sessions.controller.js'

const sessionsController = new SessionsController();

router.post('/login', sessionsController.login);
router.post('/register', sessionsController.register);



 
export default router