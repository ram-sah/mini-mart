import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Effect on page load
  useEffect(() => {
    getToken();
    window.scrollTo(0, 0);
  }, [auth?.token]);

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  //Remove item from cart
  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  const increment = (pid) => {
    const updatedCart = cart.map(item => {
      if (item._id === pid) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decrement = (pid) => {
    const updatedCart = cart.map(item => {
      if (item._id === pid && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handlePayment = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/order");
      toast.success("Payment completed successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const totalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  //total before tax
  const totalBeforeTax = () => {
    const total = parseFloat(totalPrice().replace(/[^\d.]/g, ""));
    const totalBeforeTax = (total + parseFloat(shipping)).toFixed(2);
    return totalBeforeTax;
  };

  // Calculate 6% tax
  const calculateTax = () => {
    const total = totalBeforeTax().replace(/[^\d.]/g, "");
    const tax = (parseFloat(total) * 0.06).toFixed(2);
    return tax;
  };

  //Calculate grand total
  const grandTotal = () => {
    const total = parseFloat(totalBeforeTax().replace(/[^\d.]/g, ""));
    const tax = parseFloat(calculateTax().replace(/[^\d.]/g, ""));
    const grandTotal = (total + tax).toFixed(2);
    return grandTotal;
  };

  //Calculate total number of items in cart
  const totalQty = () => {
    let total = 0;
    if (cart && Array.isArray(cart)) {
      cart.forEach(item => {
        total += item.quantity;
      });
    }
    return total;
  };

  // get shipping calculation
  var shipping =
    totalQty() > 0
      ? totalQty() < 2
        ? "5.99"
        : totalQty() < 4
          ? "9.99"
          : totalQty() < 6
            ? "14.99"
            : totalQty() < 8
              ? "19.99"
              : totalQty() < 12
                ? "25.99"
                : totalQty() <= 20
                  ? "40.99"
                  : "299.99"
      : "0";

  return (
    <Layout>
      <div className="cart-page bg-gradient-cart">
        <div className="row ">
          <div className="col-md-12">
            <h2 className="text-center mt-4 p-2 text-capitalize">
              {`Hello, ${auth?.token ? auth?.user?.name : "Guest"}`}
            </h2>
            <h4 className="text-center mx-2">
              {totalQty() >= 1
                ? `You have ${totalQty()} ${totalQty() > 1 ? " items" : " item"
                } in your cart. ${auth?.token ? "" : "Please login to checkout"}`
                : "Your cart is empty."}
            </h4>
          </div>
        </div>
        <div className="container">
          <div className="row mt-4 mx-1">
            <div className="col-md-6 ">
              <h5 className="mb-4 fw-semibold">
                {`${cart.length > 1 ? "Lists" : "List"} of your cart`}
              </h5>
              {cart?.map((p) => (
                <div className="row card flex-row mb-2 mt-2 py-1" key={p._id}>
                  <div className="col-lg-2 col-3 ">
                    <a
                      href={`/product/${p.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/product/${p.slug}`);
                      }}
                    >
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        height={"80px"}
                      />
                    </a>
                  </div>
                  <div className="col-lg-8 col-7 align-content-center">
                    <h6
                      className="mb-0"
                      style={{ textTransform: "capitalize" }}
                    >
                      {p.name}
                    </h6>
                    <p className="mb-0">{p.description.substring(0, 30)}...</p>
                    <p className="mb-0">Price: $ {p.price} </p>
                    <p className="mb-0 d-flex align-items-center">
                      Quantity:
                      <div className="ms-2 mb-0  align-items-center bg-info gap-3 rounded-3 btn">
                        <button
                          onClick={() => increment(p._id)}
                          className=" px-2 bg-info border-0 text-white "
                        >
                          +
                        </button>
                        <button className=" bg-info border-0 text-white" style={{ cursor: "default" }}>{p.quantity}</button>
                        <button
                          onClick={() => decrement(p._id)}
                          className=" px-2 bg-info border-0 text-white"
                        >
                          -
                        </button>
                      </div>
                    </p>
                  </div>
                  <div
                    className="col-2 align-content-md-center align-content-end "
                    style={{ marginLeft: "-40px" }}
                  >
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-6 text-center mb-4 mt-5 mt-md-0">
              <h5>Order Summary</h5>
              <p>Total | Checkout | Payment</p>
              <div className="ps-lg-5 ps-md-2">
                <div className="row">
                  <hr />
                  <div className="col-8 text-start">
                    <span className="text-start">{totalQty() > 1 ? " items" : " item"
                        } :({totalQty()})</span>
                  </div>
                  <div className="col-4 text-end "> {totalPrice()} </div>
                </div>
                <div className="row">
                  <div className="col-8 text-start">
                    <span className="text-break ">Shipping & handling:</span>
                  </div>
                  <div className="col-4 text-end"> ${shipping}</div>
                </div>
                <div className="row">
                  <div className="col-9 col-md-10">
                    <span> </span>
                  </div>
                  <div className="col-3 col-md-2">
                    <hr />
                  </div>
                </div>
                <div className="row">
                  <div className="col-8 text-start">
                    <span>Total before tax: </span>
                  </div>
                  <div className="col-4 text-end"> ${totalBeforeTax()} </div>
                </div>
                <div className="row">
                  <div className="col-8 text-start">
                    <span>Estimated tax: </span>
                  </div>
                  <div className="col-4 text-end">${calculateTax()}</div>
                </div>
                <div className="row">
                  <div className="col-9 col-md-10">
                    <span> </span>
                  </div>
                  <div className="col-3 col-md-2">
                    <hr />
                  </div>
                </div>
                <div className=" row text-danger">
                  <div className="col-6 text-start ">
                    <span>Order total: </span>
                  </div>
                  <div className="col-6 text-end">
                    {cart.length ? grandTotal() : "0.00"}
                  </div>
                </div>
              </div>

              {auth?.user?.address ? (
                <div className="mb-3 ps-lg-5 ps-md-2">
                  <div className="row">
                    <hr />
                    <div className="col-8  text-start">
                      <h6>Shipping Address:</h6>
                    </div>
                    <div className="col-4 text-end">
                      <button
                        className=" btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <p className="col-6 text-start">{auth?.user?.address} </p>
                  </div>
                  <div className="row ">
                    <hr className="col-12" />
                  </div>
                </div>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <>
                      <div className="row ps-5">
                        <hr className="col-12" />
                      </div>
                      <button
                        className="btn btn-outline-info"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Please login to checkout
                      </button>
                    </>
                  )}
                </div>
              )}
              <div className="mt-2 ms-5">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
