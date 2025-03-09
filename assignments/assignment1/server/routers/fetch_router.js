import express from "express";
import fs from "fs";
import path from "path";
import _ from "lodash";
import { fileURLToPath } from "url"; // for file path

const router = express.Router();

// grab the current directory to this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // this will link us to the router folder
const data_directory = path.join(__dirname, "../data");

router.get("/getEdu", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const eduData = [
    {
      "id": 1,
      "name": "Math",
      "finalgrade": 100
    },
    {
      "id": 2,
      "name": "Web Development",
      "finalgrade": 100
    },
    {
      "id": 3,
      "name": "Python",
      "finalgrade": 100
    }
  ];
  res.send(eduData);
});


// TO DO, send array of filenames [TODO]
router.get("/getExp", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const expData = [
    {
      "id": 1,
      "name": "Google",
      "position": "CEO",
      "startdate": "07/01/1990",
      "enddate": "31/01/1990"
    },
    {
      "id": 2,
      "name": "Amazon",
      "position": "Head of Marketing",
      "startdate": "06/05/1992",
      "enddate": "01/12/1995"

    },
    {
      "id": 3,
      "name": "Microsoft",
      "position": "Senior Developer",
      "startdate": "07/01/1999",
      "enddate": ""
    }
  ];
  res.send(expData);
});

router.get("/getOverview", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const expData = [
    {
      "fname": "Michael",
      "lname": "Filar",
      "age": 24,
      "school": "Humber College",
      "fieldofstudy": "Computer Programming",
      "description": "I am Michael Filar, a second year student in Humber's Computer Programming program. \nIn the future, I hope to be either a Web Developer or maybe a game developer. \nI enjoy playing games and listening to music in my free time."
    }
  ];
  res.send(expData);
});

router.get("/pfp", (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  let files_array = fs.readdirSync(data_directory);

  let filename = _.sample(files_array);
  res.sendFile(path.join(data_directory, filename));
});

export default router;
