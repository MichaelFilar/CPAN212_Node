import { useEffect, useState } from "react";
import "./App.css";


const Education = () => {
  const [educationData, setEducationData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/fetch/getEdu")
    .then((response) => response.json())
    .then((data) => {setEducationData(data)})
    .catch((error) => console.error("Error fetching education data:", error));
  }, [])

  return (
    <div style={{alignSelf: "center", backgroundColor: "white", height: "100%"}}>
      <div className="container">
          <div className="textContainer">
            <h1>Education</h1>
            <ul>
              {
                educationData.map((element) => {
                  console.log(element);
                  return (<div>
                            <h3>{element.name}</h3>
                            <li>Grade: {element.finalgrade}</li>
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


export default Education;
