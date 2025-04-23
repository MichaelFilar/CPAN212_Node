import express from "express";
import Order from "../models/order.js";
import cors from "cors";

const router = express.Router();
router.use(cors());

router.get("/order", (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    Order.find().then((results) => {
        res.json(results);
    })
})

router.get("/order/:id", (req, res) => {
    const orderID = req.params.id;
    console.log(orderID);

    Order.find(orderID).then((results) => {
        if (!results) {
            return res.status(404).send({ message: "Order not found"})
        }
        res.json(results);
    })
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get("/order/user/:userId", (req, res) => {
    const filters = {}
    if(req.params.userId) {
        filters.userId = req.params.userId;
    }

    console.log("FILTERS:");
    console.log(filters);

    Order.find(filters).then((results) => {
        res.json(results);
    })
})

router.put("/order", (req,res) => {
    const orderID = req.params.id;
    console.log(orderID + "edit");

    Order.findByIdAndUpdate(orderID)
    .then(()=>{
        res.json({message:"update successful"})
    })
})

router.delete("/order/:id", (req,res) => {
    Order.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.json({message:"Deleted"})
    })
})

router.post("/order", (req, res) => {
    console.log(req?.body);
    const {userId, orderContents, date} = req.body;
    console.log("SAVING? MAYBE?")
    let newOrder = new Order({
        userId,
        orderContents,
        date
    })

    newOrder.save().then(() => {
        res.json({message: "Data saved"})
    })
})

export default router;