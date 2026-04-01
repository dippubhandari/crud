
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
            console.log(error)
        }
    }
    static hello = (req, res) => {
        console.log("This is inside hello controller")
        res.send("Hello response")
    }
    static userData = (req, res) => {
        console.log("User Controller runs")
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
            console.log(error)
            res.send({ msg: "Something Went Wrong" })
        }
    }
}

export default UserController