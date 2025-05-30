import { createContext, useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';
import "./ListCat.css";
import { UserContext } from '../App.jsx';
import useAuth from '../hooks/useAuth.jsx';


function Cart() {
    let { isAuthenticated, userId, userName } = useAuth();

    let { cart, addToCart, removeFromCart, clearCart } = useContext(UserContext);
    const [total, setTotal] = useState(0);


    /*const updateUserHistory = async () => {

        const token = localStorage.getItem("authToken");
        console.log("user id: "+userId);
        if (!token) return;
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
    }*/

    const saveOrder = async () => {
        
        const token = localStorage.getItem("authToken");
        console.log("user id: "+userId);
        console.log(cart);
        if (!token) (userId = "Guest "+Date.now());
        try {
            const response = await fetch(`http://localhost:8001/order/order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userId, orderContents: cart, date: Date.now() }),
            });
            if (response.ok) {
                console.log("Order saved");
            } else {
                console.log("Order save fail")
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
        alert("Purchase complete!")
        saveOrder();
        //updateUserHistory()
        clearCart();
    }

    return (
        <div style={{ flex: 1, flexDirection: "row", display: "inline-block" }}>
            <br />
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
                                        <p>${cat.price}</p>
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