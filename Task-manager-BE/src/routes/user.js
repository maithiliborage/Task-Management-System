import express from 'express'
import auth from '../common/auth.js'
import UserController from '../controllers/user.js'

const router = express.Router()

router.post('/signup',UserController.create)
router.post('/login',UserController.login)

router.post('/registeruser',auth.validate ,UserController.registerUser)
router.get('/getdata',UserController.getUserData)
router.get('/emails', UserController.getUserEmail)
router.get('/getuser/:id',UserController.getIndividualUser)
router.put('/updateuser/:id',UserController.updateUserData)
router.delete('/deleteuser/:id',UserController.deleteUser)

export default router
