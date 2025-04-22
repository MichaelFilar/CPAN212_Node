import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ListCat.css";

function CatList() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/search/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCats(data);
      })
      .catch((error) => console.error(error));
  }, []);


  return (
    <div>
      <h1>All Cats</h1>
      <div className="cat-list">
        {cats.map((cat) => (
          <div key={cat._id} className="cat-card">
            
            <div className="cat-actions">
              <Link to={`/cats/${cat._id}`}>
              <img width="100%" src={cat.image} />
              <h2>{cat.name}</h2>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatList;
