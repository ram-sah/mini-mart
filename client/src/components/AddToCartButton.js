import React from "react";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const AddToCartButton = ({ product }) => {
  const [cart, setCart] = useCart();

  const handleAddToCart = () => {
    const existingProductIndex = cart.findIndex((item) => item._id === product._id);
    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...product, quantity: 1 }])
      );
    }
    toast.success("Item Added to cart successfully");
  };

  return (
    <button className="btn btn-secondary" onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
