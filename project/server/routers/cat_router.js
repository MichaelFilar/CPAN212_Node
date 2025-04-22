import express from "express";
import Cat from "../models/cat.js";
import cors from "cors";

const router = express.Router();
router.use(cors());

router.get("/cat", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    Cat.find().then((results) => {
        res.json(results);
    })
})

router.get("/cat/:id", (req, res) => {
    const catID = req.params.id;
    console.log(catID);

    Cat.findById(catID).then((results) => {
        if (!results) {
            return res.status(404).send({ message: "Cat not found"})
        }
        res.json(results);
    })
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get("/search", (req, res) => {
    const filters = {}

    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        filters.$or = [
            {name: regex},
            {description: regex},
            {categories:regex},
            {colour: regex}
       ]
    }

    if(req.query.description) {
        let descSplit = req.query.description.split();
        filters.descSplit = descSplit;
    }

    if(req.query.name) {
        filters.name = req.query.name;
    }
    if (req.query.colour) {
        filters.colour = req.query.colour;
    }
    if (req.query.size) {
        filters.size = req.query.size;
    }
    if (req.query.price) {
        switch (req.query.price) {
            case "1":
                filters.price = {
                    $gte: 0.00,
                    $lte: 50.00
                };
                break;
            case "2":
                filters.price = {
                    $gte: 50.00,
                    $lte: 100.00
                };
                break;
            case "3":
                filters.price = {
                    $gte: 100.00,
                    $lte: 150.00
                };
                break;
            case "4":
                filters.price = {
                    $gte: 150.00,
                    $lte: 200.00
                };
            case "5":
                filters.price = {
                    $gte: 200.00
                };
                break;

        }
    }
    if (req.query.minRating) {
        if (req.query.maxRating) {
                    filters.rating = {
                        $gte: req.query.minRating,
                        $lte: req.query.maxRating
                    };
            } else {
                filters.rating = {
                    $gte: req.query.minRating
                }
            }
        } else
    
    if (req.query.maxRating) {
        filters.rating = {
            $lte: req.query.maxRating
        }
    }
    console.log("FILTERS:");
    console.log(filters);

    Cat.find(filters).then((results) => {
        res.json(results);
    })
})

router.put("/cat/:id", (req,res) => {
    const catID = req.params.id;
    console.log(catID + "edit");

    Cat.findByIdAndUpdate(catID)
    .then(()=>{
        res.json({message:"update successful"})
    })
})

router.delete("/cat/:id", (req,res) => {
    Cat.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.json({message:"Deleted"})
    })
})

router.post("/cat", (req, res) => {
    console.log(req?.body);
    const {name, description, colour, size, categories, image} = req.body;

    let newCat = new Cat({
        name,
        description,
        colour,
        size,
        categories,
        image
    })

    newCat.save().then(() => {
        res.json({message: "Data saved"})
    })
})

export default router;