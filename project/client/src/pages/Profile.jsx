import { useEffect, useState } from 'react';
import { useParams, Link, useNavigation, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import '../App.css';
import './ListCat.css';
import useAuth from '../hooks/useAuth';

function Profile() {
  const { isAuthenticated, userId, userName } = useAuth();
  const navigate = useNavigate();
  

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [reg, setReg] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [history, setHistory] = useState([]);

  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })

  const register = async (e) => {

    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8001/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          password: ""
        });
        setReg(false);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred. Please try again.");
    }
  }

  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8001/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        // Save the token to localStorage
        localStorage.setItem('authToken', result.token);

        alert('Login successful!');
        setLoggedIn(true);
        window.location.reload();
      } else {
        setErrorMessage(result.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Error logging in. Please try again.');
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const fetchOrders = (userId) => {
    fetch(`http://localhost:8001/order/order/user/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setHistory(data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (isAuthenticated || isLoggedIn) {
      fetchOrders(userId)
    }
  }, [])

  if (reg) return (
    <div className='regContainer'>
      <br />
      <h1>Registration</h1>
      <div>
        <form onSubmit={register}>
          <label>Email</label>
          <input type="text" name="email" className='formInput' value={user.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="text" name="password" value={user.password} onChange={handleChange} required />
          <label>First Name</label>
          <input type="text" name="firstName" value={user.firstName} onChange={handleChange} required />
          <label>Last Name</label>
          <input type="text" name="lastName" value={user.lastName} onChange={handleChange} required />
          <br />
          <button style={{ backgroundColor: "#5cf" }}>Register</button>
          <br /><br />
        </form>
      </div>
    </div>
  )

  if (!isLoggedIn && !isAuthenticated) return (
    <div className='regContainer'>
      <br />
      <h1>Log In</h1>
      <div>
        <form onSubmit={login}>
          <label>Email</label>
          <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password</label>
          <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <br />
          <button style={{ backgroundColor: "#5cf" }}>Log in</button>
        </form>
        <br />
        {errorMessage && <p className="error">{errorMessage}</p>}
        <br /><br />
        <label>No account yet? Register here!</label><br />
        <button style={{ backgroundColor: "#19f" }} onClick={() => setReg(true)}>Register</button>
      </div>
    </div>
  );

  return (
    <div className='profContainer'>
      <h1>Welcome, {userName}</h1>
      <div>
        <h2>Latest Adoption(s)!</h2>
        {console.log("history:")}
        {console.log(history)}
        {history.length > 0 ? (
          <div className='cat-list'>
            {history.map((order, index) => (
              <div key={order._id}>
                <h3>Order {index+1}</h3>
                <p>Date: {order.createdAt.substring(0,10)}</p>
                <div className='cat-list'>
                {order.orderContents.map((item) => (
                  <div key={item._id} className="cat-card">
            
                  <div className="cat-actions">
                    <div>
                    <img src={item.image} />
                    <h2>{item.name}</h2>
                    </div>
                  </div>
                </div>
                ))}
                </div>
              </div>
            ))}</div>) : (<><p>No recent adoption.</p></>)}
      </div>
    </div>
  );
}

export default Profile;
