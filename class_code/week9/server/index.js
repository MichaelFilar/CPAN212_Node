import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./models/book.js";
import book_router from "./routers/book_router.js"

dotenv.config()
const app = express();
const PORT = process.env.PORT || 6000;





mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Database is connecting")
    app.listen(PORT, () => {
        console.log(`htt://localhost:${PORT}`)
    })
})

app.get("/", (req, res) => {
    Book.find().then((results) => {
        res.json(results)
    })
})

app.use("/book", book_router)
