import express from 'express'
import UserController from '../controller/userContrller.js'

const userRoutes = express.Router()

userRoutes.get('/user-data', UserController.userData)
userRoutes.post('/add-user', UserController.addUser)
userRoutes.delete('/delete-all-users', UserController.deleteAllUsers)
userRoutes.get('/hello', UserController.hello)

export default userRoutes