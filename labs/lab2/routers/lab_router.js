import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
res.send("welcome to lab router")
})
//name
router.get("/name", (req, res) => {
    res.send("Michael Filar")
})
//greetings
router.get("/greetings", (req, res) => {
    res.send("Hello from Michael, Student Number n01499766")
})
//add
router.get("/add/:x/:y", (req, res) => {
    res.send(`${parseFloat(req.params.x)} + ${parseFloat(req.params.y)} = ${parseFloat(req.params.y)+parseFloat(req.params.x)}`)
})
//calculate
router.get("/calculate/:x/:op/:y", (req, res) => {
    let result = 0
    if (req.params.op === "+") {
        result = parseFloat(req.params.x)+parseFloat(req.params.y);
    } else if (req.params.op === "-") {
        result = parseFloat(req.params.x)-parseFloat(req.params.y);
    } else if (req.params.op === "*") {
        result = parseFloat(req.params.x)*parseFloat(req.params.y);
    } else if (decodeURI(req.params.op) === "/") {
        result = parseFloat(req.params.x)/parseFloat(req.params.y);
    } else if (req.params.op === "**") {
        result = parseFloat(req.params.x)**parseFloat(req.params.y);
    } else {let result = "Invalid operation."}
    res.send(`${result}`)
})

export default router;
