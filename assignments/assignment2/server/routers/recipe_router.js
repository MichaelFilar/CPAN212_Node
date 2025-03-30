import express from "express";
import Recipe from "../models/recipe.js";
import cors from "cors";

const router = express.Router();
router.use(cors());

router.get("/recipe", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    Recipe.find().then((results) => {
        res.json(results);
    })
})

router.get("/recipe/:id", (req, res) => {
    const recipeID = req.params.id;
    console.log(recipeID);

    Recipe.findById(recipeID).then((results) => {
        if (!results) {
            return res.status(404).send({ message: "Recipe not found"})
        }
        res.json(results);
    })
})

router.get("/search", (req, res) => {
    const filters = {}

    if(req.query.name) {
        filters.name = req.query.title;
    }
    if(req.query.pages) {
        let pages = parseInt(req.query.pages)
        if(req.query.logicalOperator) {
            switch (req.query.logicalOperator) {
                case gte:
                    filters.pages = {$gte:{pages}}
                    break;
            
                default:
                    filters.pages = pages;
                    break;
            }
        }
        filters.pages = pages;
    }
    Recipe.findById(filters).then((results) => {
        res.json(results);
    })
})

router.put("/recipe/:id", (req,res) => {
    const recipeID = req.params.id;
    console.log(recipeID + "edit");

    Recipe.findByIdAndUpdate(recipeID)
    .then(()=>{
        res.json({message:"update successful"})
    })
})

router.delete("/recipe/:id", (req,res) => {
    Recipe.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.json({message:"Deleted"})
    })
})

router.post("/recipe", (req, res) => {
    console.log(req?.body);
    const {name, description, difficulty, ingredients, steps} = req.body;

    let newRecipe = new Recipe({
        name,
        description,
        difficulty,
        ingredients,
        steps
    })

    newRecipe.save().then(() => {
        res.json({message: "Data saved"})
    })
})

export default router;