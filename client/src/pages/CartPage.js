import React from 'react'
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="row">
        <div className="col-md-12">
          <h1 className='text-center mt-5 p-2'>
            {`Hello ${auth?.token && auth?.user?.name}`}
          </h1>
          <h4 className='text-center'>
        {cart?.length > 1 ? `You have ${cart.length} items in your cart. ${auth?.token ? "" : "Please login to checkout" }` : "Your cart is empty." }
          </h4>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-md-6 ">Cart Items</div>
        <div className="col-md-6">Checkout | Payment</div>
      </div>
    </Layout>
  )
}

export default CartPage;
