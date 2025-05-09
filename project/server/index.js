import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Cat from "./models/cat.js";
import cat_router from "./routers/cat_router.js"
import user_router from "./routers/user_router.js"
import order_router from "./routers/order_router.js"
import cors from "cors";

dotenv.config()
const app = express();
const PORT = process.env.PORT || 8001;
app.use(cors());



app.use(express.urlencoded({ extended: true}))
app.use(express.json());



mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Database is connecting")
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
    })
})

app.get("/", (req, res) => {
    Cat.find().then((results) => {
        res.json(results)
    })
})

app.use("/", cat_router)
app.use("/user", user_router);
app.use("/order", order_router);
