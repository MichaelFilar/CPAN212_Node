import { createContext, useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
import "./ListCat.css";
import { UserContext } from '../App.jsx';
import useAuth from '../hooks/useAuth.jsx';


function Cart() {
    const { isAuthenticated, userId, userName } = useAuth();

    let { cart, addToCart, removeFromCart, clearCart } = useContext(UserContext);
    const [total, setTotal] = useState(0);
    const [history, setHistory] = useState([]);


    const updateUserHistory = async () => {

        const token = localStorage.getItem("authToken");
        console.log(userId);
        if (!token) return
        try {
            const response = await fetch(`http://localhost:8001/user/update/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ history: cart }),
            });
            if (response.ok) {
                console.log("Purchase saved");
            } else {
                console.log("Save fail")
                const result = await response.json();
                console.log(result.message);
            }
        } catch (error) {
            console.error("Error updating user:", error);
            alert("An error occurred. Please try again.");
        }
    }

    useEffect(() => {
        calcTotal();
    }, [])

    function calcTotal() {
        let temp = 0
        cart.forEach(element => {
            console.log(parseFloat(element.price));
            temp += element.price;

        });
        setTotal(temp);
    }

    function handleButton(cat) {
        removeFromCart(cat);
        calcTotal();
    }

    function handlePurchase() {
        setHistory(cart);
        alert("Purchase complete!")
        updateUserHistory()
        clearCart();
    }

    return (
        <div style={{ flex: 1, flexDirection: "row", display: "inline-block" }}>
            <h1>Cart</h1>
            {cart.length == 0 ? (<p>Cart empty!</p>) : (<><p>Total: ${total}</p><button onClick={() => handlePurchase()}>Purchase</button>
                <div className='profContainer'>
                    <div className="cat-list">
                        {console.log(cart)}
                        {cart.map((cat) => (
                            <div key={cat._id} className="cat-card">
                                <div className="cat-actions">
                                    <div>
                                        <img width="100%" src={cat.image} />
                                        <h2>{cat.name}</h2>
                                        <h3>${cat.price}</h3>
                                        <button onClick={() => handleButton(cat)}>Remove from Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div></>)}
        </div>
    )

}

export default Cart;