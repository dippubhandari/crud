
import UserModel from "../models/userModel.js"
class UserController {
    static deleteAllUsers = async (req, res) => {
        try {
            const isDeleted = await UserModel.deleteMany({});
            if (isDeleted) {
                res.send("Deleted All user")
            }
            else {
                res.send("Not Delted")
            }
        } catch (error) {
        }
    }

    // deleting particular user

    static deleteUser = async (req, res) => {
        try {
            const id = req.params.id
            const deleteUser = await UserModel.findByIdAndDelete(id)
            if (deleteUser) {
                res.status(200).json({
                    message: "The user is deleted successfullyh",
                    success: true
                })
            }

        } catch (error) {
            res.status(500).json({
                message: "Something Went Wrong",
                success: false
            })
        }
    }

    static hello = (req, res) => {
        res.send("Hello response")
    }
    static userData = (req, res) => {
        res.send("Hellow i am from controller")
    }
    static addUser = async (req, res) => {
        try {
            const { name, email } = req.body
            // checking if the email already exist or not
            const checkEmail = await UserModel.findOne({ email })
            if (checkEmail) {
                res.send({ checkEmail, msg: "Already Existed this email" })
            }
            else {
                await UserModel.create({ name, email })
                res.send({ msg: "Account Created Succesfully" })
            }
        } catch (error) {
            res.send({ msg: "Something Went Wrong" })
        }
    }

    static addData = async (req, res) => {
        try {

            const { name, age, contact } = req.body
            const image = req.file ? req.file.path : null;
            const addData = await UserModel.create({ name, age, contact, image })
            if (addData) {
                res.status(200).json({
                    success: true,
                    message: "Successfully Data Added",
                    user: addData
                })

            }
            else {
                res.status(400).json({
                    success: false,
                    message: error.message
                })
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    static allData = async (req, res) => {

        try {
            const allData = await UserModel.find()
            res.status(200).json({
                success: true,
                message: "All data find success",
                user: allData
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    // fetching particular user based on id

    static getParticularUser = async (req, res) => {
        try {
            const id = req.params.id

            const user = await UserModel.findById(id)
            if (user) {
                res.status(200).json({
                    success: true,
                    message: "User data sent",
                    user
                })
            }
            else {
                res.status(50).json({
                    success: false,
                    message: "Something went wrong",

                })
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }

    // updating the particular user 
    static updateUserData = async (req, res) => {
        try {
            const id = req.params.id
            const updateFields = req.body
            console.log(updateFields)
            if (req.file) {
                updateFields.image = req.file.path
            }
            const updatedUser = await UserModel.findByIdAndUpdate(
                id,
                { $set: updateFields },
                { new: true }
            );
            if (updatedUser) {
                res.status(200).json({
                    success: true,
                    message: "Updated Successfully",
                    updatedUser: updatedUser
                })
            }
            else {
                res.status(500).json({
                    success: false,
                    message: "Something Went Wrong",
                    updatedUser
                })
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    }
}

export default UserController