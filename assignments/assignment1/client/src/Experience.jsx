import { useEffect, useState } from "react";
import "./App.css";

const Experience = () => {
  // what do we need to track
  const [experienceData, setExperienceData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/fetch/getExp")
    .then((response) => response.json())
    .then((data) => {console.log(data);setExperienceData(data)})
    .catch((error) => console.error("Error fetching experience data:", error));
  }, [])

  return (
    <div style={{alignSelf: "center", backgroundColor: "white", height: "100%"}}>
      <div className="container">
          <div className="textContainer">
            <h1>Experience</h1>
            <ul>
              {
                experienceData.map((element) => {
                  console.log(element);
                  return (<div>
                            <h3>{element.name}</h3>
                            {element.enddate == "" && (
                              <p className="subText">{element.startdate} - Present</p>
                            ) }
                            {element.enddate != "" && 
                              <p className="subText">{element.startdate} - {element.enddate}</p>
                            }
                            <li>Position: {element.position}</li>
                            <hr></hr>
                          </div>)
                })
              }
            </ul>
          </div>
      </div>
    </div>
  );
};

export default Experience;
