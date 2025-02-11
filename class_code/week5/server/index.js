/* Project setup: For the server
1 - new project folder
2 - open an integrated terminal
3 - run these commands:
    npm init -y
    npm i express nodemon
    (optional) -> go into package.json and add "type": "module" to enable import from 
*/
 
// [Please enable only ONE of these] 
import express from "express"; // if you are using type: module
// const express = require("express"); // if using common JS (Default)
import cors from "cors";
 
const app = express();
const PORT = process.env.PORT || 8000;
 
// middlelware
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
 
// routes
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

//send data
app.get("/data", (req, res) => {
    const data = {
        fname: "Michael",
        lname: "Filar",
    }
    res.send(data);
  });

app.post("/login", (req, res) => {
  console.log(req.body);
  res.send("data")
})
 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});