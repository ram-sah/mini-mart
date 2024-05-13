
import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    //get item from local storage
    useEffect(() => {
        const existingCartItems = localStorage.getItem("cart");
        if (existingCartItems) setCart(JSON.parse(existingCartItems));
    }, []);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

//custom hook
const useCart = () => useContext(CartContext)
export { useCart, CartProvider };
