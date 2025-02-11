const express = require("express");
const app = express();
const PORT = 8080;

app.get("/", (req, res)=>{
    res.send("Welcome to our server")
})

app.get("/fetch", (req, res)=>{
    res.send("Welcome to fetch route")
})

app.get("/save", (req, res)=>{
    res.send("Welcome to save route")
})

app.get("/delete", (req, res)=>{
    res.send("Welcome to delete route")
})

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});