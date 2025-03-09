import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from './App.jsx';
import Education from './Education.jsx';
import Experience from './Experience.jsx';
import './App.css';
import "./NavBar.css";

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className="navbar-left">
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
          <Link to="/">Overview</Link>
        </li>
          <li>
            <Link to="/Education">Education</Link>
          </li>
          <li>
            <Link to="/Experience">Experience</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right" ></div>
    </nav>
);
};

function Nav() {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route index element={<App />} />
          <Route path="/" element={<App />} />
          <Route path="/Education" element={<Education />} />
          <Route path="/Experience" element={<Experience />} />
        </Routes>
    </div>
  );
}

export default Nav;