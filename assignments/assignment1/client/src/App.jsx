import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  // what do we need to track
  const [overviewData, setOverviewData] = useState([]);
  const [displayImage, setDisplayImage] = useState(null);
  const [message, setMessage] = useState("");

  // Handlers
  const fetchPfp = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/pfp`);

      const blob = await response.blob(); // we made a blob - Binary Large Object
      // but thats not an image, so we need to make an image element

      // using createObjectURL
      const imageUrl = URL.createObjectURL(blob);
      setDisplayImage(imageUrl);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/fetch/getOverview")
    .then((response) => response.json())
    .then((data) => {setOverviewData(data)})
    .catch((error) => console.error("Error fetching overview data:", error));
    fetchPfp();
  }, [])

  return (
    <div style={{alignSelf: "center", backgroundColor: "white", height: "100%"}}>
      <div className="container">
        {displayImage && (
          <div className="container">
            <img
              src={displayImage}
              alt="picture of me"
              style={{ width: "400px", marginTop: "10px" }}
            />
            <div className="textContainer">
            <h1>{overviewData[0].fname} {overviewData[0].lname}</h1>
            <p className="subText">Age: {overviewData[0].age}</p>
            <br></br>
            <p className="mainText">{overviewData[0].description}</p>
            <p className="mainText">Please use the navigation bar to look around!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
