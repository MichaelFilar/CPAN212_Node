import { Routes, Route } from 'react-router-dom';
import CatList from './pages/ListCat';
import CatDetail from './pages/DetailedCat';
import { Link } from "react-router-dom";
import { useEffect, useState, createContext, useContext } from "react";

import './App.css';
import "./pages/NavBar.css";
import Nav from './pages/Nav';

export const UserContext = createContext();

function App() {

  const [search, setSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  const handleChange = event => {
    console.log(event.target.value);
    setSearch(event.target.value);
  }

  const searchQuery = event => {
    if(event.key === 'Enter') {
      console.log("searched for: "+search);        
  }
  }

  const addToCart = (inCat) => {
    let match = false;
    cart.forEach(cat => {
      if (cat._id.toString() === inCat._id.toString()) {console.log("match found"); match = true}
    })
    if (!match) {
      setCart([...cart, inCat])}
  }

  const removeFromCart = (inCat) => {
    setCart(cart.filter(cat => cat !== inCat))
  }

  const clearCart = () => {
    setCart([]);
  }

  const context = {cart, addToCart, removeFromCart, clearCart, handleChange, searchQuery}


  return (
    <UserContext.Provider value={context}>
    <div>
      <Nav handleChange={handleChange} searchQuery={searchQuery} search={search} />
    </div>
    </UserContext.Provider>
  );
}

export default App;
