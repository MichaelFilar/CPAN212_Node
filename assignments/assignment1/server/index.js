import express from "express";
import cors from "cors";
import save_router from "./routers/save_router.js";
import fetch_router from "./routers/fetch_router.js";

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin:'*'}));

// routes
app.use("/save", save_router);
app.use("/fetch", fetch_router);

app.get("/", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send("Welcome to the server, Check /api-list for available routes");
});

app.get("/api-list", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const apiList = {
    fetch_routes: ["/fetch/getEdu", "/fetch/getExp", "/fetch/getOverview"],
  };

  res.send(apiList);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.send(`No request for ${req.url} exists`);
});
