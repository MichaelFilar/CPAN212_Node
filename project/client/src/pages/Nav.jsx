import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import CatList from './ListCat';
import CatDetail from './DetailedCat';
import logo from '../CArT.png';
import useAuth from "../hooks/useAuth";
import Profile from "./Profile";
import { useContext, useState } from "react";
import Cart from "./Cart";

const SearchBar = ({handleChange, searchQuery}) => {

    return (
      <div style={{flex: 1, flexDirection: "row", display: "inline-block"}}>
        <form onSubmit={() => handleSearch()}>
          <input type='text' name="search" id='search' placeholder='Search' onChange={handleChange} />
        </form>
      </div>
    )
  }

  function Nav({handleChange, searchQuery, search}) {
    const [cart, setCart] = useState([])

    return (
      <div>
        <Navbar handleChange={handleChange} searchQuery={searchQuery} />
        <Routes>
          <Route path="/" element={<CatList search={search}/>} />
          <Route path="/cats/:id" element={<CatDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    );
  }

const Navbar = ({handleChange, searchQuery}) => {
  const { isAuthenticated, userId, userName} = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <nav className='navbar'>
      <div className="navbar-left">
        <ul className='nav-links'>
        <Link to="/">
            <img style={{borderRadius:'20%', border: '1px solid #000'}}src={logo}/>
        </Link>
        </ul>
      </div>
      <div className="navbar-center">
      </div>
      <div className="navbar-right" >
        <ul className="nav-links">
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            {isAuthenticated ? (<button onClick={handleLogout}>Logout</button>): (null)}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;