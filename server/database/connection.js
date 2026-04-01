import mongoose from "mongoose";

const databaseConnection = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: "user"
        }
        const isConncted = await mongoose.connect(DATABASE_URL, DB_OPTIONS)
        isConncted ? console.log("Database connected Successfully") : console.log("Database is not connted")

    } catch (error) {
        console.log(error)
    }
}

export default databaseConnection;