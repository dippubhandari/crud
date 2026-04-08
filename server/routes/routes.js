import express from 'express'
import UserController from '../controller/userController.js'
import multer from 'multer'


// const upload = multer({ dest: 'images/' })
const userRoutes = express.Router()

// multer 
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'images/'), // folder to save
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});


const upload = multer({ storage: storage });


userRoutes.get('/user-data', UserController.userData)
userRoutes.post('/add-user', UserController.addUser)
userRoutes.delete('/delete-all-users', UserController.deleteAllUsers)
userRoutes.get('/hello', UserController.hello)
userRoutes.post('/add-data', upload.single('image'), UserController.addData)
userRoutes.get('/get-all-data', UserController.allData)
userRoutes.get('/get-user/:id', UserController.getParticularUser)

userRoutes.patch('/update-user-data/:id', upload.single('image'), UserController.updateUserData)

userRoutes.delete('/delete-user/:id', UserController.deleteUser)

export default userRoutes