import { createContext, useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetailedCat.css';
import {UserContext} from '../App.jsx';

function CatDetail() {
  const {id} = useParams();
  const [cat, setCat] = useState(null);

  const {cart, addToCart, removeFromCart} = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:8001/cat/${id}`)
      .then(response => response.json())
      .then(data => setCat(data))
      .catch(error => console.error(error));
  }, [id]); 


  const handleAddToCart = (cat) => {
    console.log("adding: ");console.log(cat);
    addToCart(cat)
    return
  }


  if (!cat) return <p>Loading...</p>;

  return (
    <div className='catContainer'>
      <div style={{ flex: 1 }}>
        <img width="500" src={cat.image} />
      </div>

      <div className='textCatContainer'>
        <h1>{cat.name}</h1>
        <p>{"⭐".repeat(cat.rating)}</p>
        <p>{cat.description}</p>
        <p>Fur colour: {cat.colour}</p>
        <p>Size: {cat.size}</p>
        <br />
        <p>Price:</p>
        <p>${cat.price}</p>
        <button onClick={() => {handleAddToCart(cat)}}>Add to Cart</button>
      </div>
    </div>
  );
}

export default CatDetail;
