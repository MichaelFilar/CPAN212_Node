import express from "express";
import Book from "../models/book.js";

const router = express.Router();

router.get("/", (req, res) => {
    Book.find().then((results) => {
        res.json(results);
    })
})

router.get("/:id", (req, res) => {
    Book.findById(req.params.id).then((results) => {
        res.json(results);
    })
})

router.get("/search", (req, res) => {
    const filters = {}

    if(req.query.title) {
        filters.title = req.query.title;
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
    Book.findById(filters).then((results) => {
        res.json(results);
    })
})

router.put("/:id", (req,res) => {
    Book.findByIdAndUpdate(req.params.id)
    .then(()=>{
        res.json({message:"update successful"})
    })
})

router.delete("/:id", (req,res) => {
    Book.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.json({message:"Deleted"})
    })
})

router.post("/save", (req, res) => {
    const {title, author, publisher} = req.body;

    let newBook = new Book({
        title,
        author,
        publisher,
        pages: 500
    })

    newBook.save().then(() => {
        res.json({message: "Data saved"})
    })
})

export default router;