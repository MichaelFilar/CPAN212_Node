import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ListCat.css";
import Sidebar from "./SideBar";
import Navbar from "../App.jsx";

function CatList() {
  const params = useParams();
  const [cats, setCats] = useState([]);
  const [colour, setColour] = useState("");
  const [price, setPrice] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(5);
  const [isLogged, setIsLoggedIn] = useState(false);
  const [sortCat, setSortCat] = useState("");

  const handleFilters = event => {
    switch(event.target.name) {
      case "colour":
        setColour(event.target.value);
        break;
      case "price":
        setPrice(event.target.value);
        break;
      case "minRating":
        setMinRating(event.target.value);
        break;
      case "maxRating":
        setMaxRating(event.target.value);
        break;
    }
  }



  useEffect(() => {
    if (Object.keys(params).length > 0) {
      console.log(params);
    }
    fetch("http://localhost:8001/cat")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCats(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const fetchFilteredData = () => {
    let url = "http://localhost:8001/search?";

    if (colour.length > 0) {
      url+= "colour="+colour;
    }

    if (price > 0) {
      url+= "&price="+price;
    }

    if (minRating > 1) {
      url+= "&minRating="+minRating;
    }
    if (maxRating < 5) {
      url+= "&maxRating="+maxRating;
    }

    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCats(data);
      })
      .catch((error) => console.error(error));
  }


  return (
    
    <div style={{flex: 1, flexDirection: "row", display: "inline-block"}}>
      <Sidebar handleFilters={handleFilters} fetchFilteredData={fetchFilteredData} />
      <section style={{flex: 1, width: "auto"}}>
        <div className="cat-list">
      <h1>All Adoptable Cats - {cats.length} results</h1></div>
      <button onClick={() => {console.log(cats.sort((a,b)=> parseInt(b.purchases) - parseInt(a.purchases))); setSortCat("popular")}}>Popular</button>
      <button onClick={() => {console.log(cats.sort((a,b)=> parseFloat(a.price) - parseFloat(b.price))); setSortCat("cheap")}}>Least Expensive</button>
      <button onClick={() => {console.log(cats.sort((a,b)=> parseFloat(b.price) - parseFloat(a.price))); setSortCat("expensive")}}>Most Expensive</button>
      <div className="cat-list">
        {cats.map((cat) => (
          <div key={cat._id} className="cat-card">
            
            <div className="cat-actions">
              <Link to={`/cats/${cat._id}`}>
              <img width="220px" height="250px" src={cat.image} />
              <h2>{cat.name}</h2>
              <p>{"⭐".repeat(cat.rating)}</p>
              {sortCat == "popular" ? (<p>{cat.purchases} fans</p>) : null}
              <h3>${cat.price}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
      </section>
    </div>
  );
}

export default CatList;
