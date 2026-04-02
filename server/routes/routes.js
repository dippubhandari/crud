import express from 'express'
import UserController from '../controller/userController.js'

const userRoutes = express.Router()

userRoutes.get('/user-data', UserController.userData)
userRoutes.post('/add-user', UserController.addUser)
userRoutes.delete('/delete-all-users', UserController.deleteAllUsers)
userRoutes.get('/hello', UserController.hello)
userRoutes.post('/add-data', UserController.addData)
userRoutes.get('/get-all-data', UserController.allData)

userRoutes.delete('/delete-user/:id', UserController.deleteUser)

export default userRoutes