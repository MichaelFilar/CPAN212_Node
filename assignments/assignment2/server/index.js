import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "./models/recipe.js";
import recipe_router from "./routers/recipe_router.js"
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
    Recipe.find().then((results) => {
        res.json(results)
    })
})

app.use("/", recipe_router)
