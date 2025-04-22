import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ListCat.css";
import Sidebar from "./SideBar";
import Navbar, { UserContext } from "../App.jsx";

const SearchBar = ({cats, fetchFilteredData, search, setSearch}) => {
  const {handleChange, searchQuery} = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFilteredData()
    return false;
  }


  return (
    <>
      <form style={{flex: 1,flexDirection: "row"}}onSubmit={handleSubmit}>
        <input 
        style={{width: '50%', margin: '0 0 0 auto'}}
        type='text' 
        name="search" 
        id='search' 
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}/>
        <button style={{margin: '0 auto 0 0'}}>Search</button>
      </form>
    </>
  )
}

function CatList() {
  const params = useParams();
  const [cats, setCats] = useState([]);
  const [colour, setColour] = useState("");
  const [price, setPrice] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(5);
  const [search, setSearch] = useState("");
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

    if (search.length > 0) {
      url+="&search="+search;
    }

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
      <SearchBar cats={cats} fetchFilteredData={fetchFilteredData} search={search} setSearch={setSearch}/>
      <button onClick={() => {console.log(cats.sort((a,b)=> parseInt(b.purchases) - parseInt(a.purchases))); setSortCat("popular")}}>Popular</button>
      <button onClick={() => {console.log(cats.sort((a,b)=> parseFloat(a.price) - parseFloat(b.price))); setSortCat("cheap")}}>Least Expensive</button>
      <button onClick={() => {console.log(cats.sort((a,b)=> parseFloat(b.price) - parseFloat(a.price))); setSortCat("expensive")}}>Most Expensive</button>
      <div className="cat-list">
        {cats.length > 0 ?
        (<>{cats.map((cat) => (
          <div key={cat._id} className="cat-card">
            
            <div className="cat-actions">
              <Link to={`/cats/${cat._id}`}>
              <img src={cat.image} />
              <h2>{cat.name}</h2>
              <p>{"⭐".repeat(cat.rating)}</p>
              {sortCat == "popular" ? (<p>{cat.purchases} fans</p>) : null}
              <h3>${cat.price}</h3>
              </Link>
            </div>
          </div>
        ))}</>) : (<p>No results</p>)}
      </div>
      </section>
    </div>
  );
}

export default CatList;
