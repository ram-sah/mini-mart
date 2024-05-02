import React, { useEffect } from "react";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput.js";
import { useCart } from "../../context/cart.js";
import { Avatar, Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const handlelogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  // To move the pages bottom that is under the nav.
  useEffect(() => {
    // Calculate the height of the navbar
    const navbarHeight = document.querySelector(".navbar").offsetHeight;
    // Add padding to the top of the body
    document.body.style.paddingTop = navbarHeight + "px";
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon " />
          </button>
          <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand mx-4">
              <span
                className="border rounded border-2 p-1"
                style={{ border: "2px solid lightgrey" }}
              >
                <span className=" bg-white text-black head">E</span>
                <span className="text-secondary rounded-end-1 p-1">com</span>
                <span className="text-dark">merce</span>
                <span className="text-bg-info text-white rounded-end-1 p-1 app">
                  Mart
                </span>
              </span>
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mx-2 ">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link mx-2 mt-1 text-dark">
                  Home
                </NavLink>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link ">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link ">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown d-flex flex-column text-center">
                    <span
                      className="small text-muted text-capitalize"
                      style={{ marginBottom: "-15px" }}
                    >
                      {" "}
                      Hello, {auth?.user?.name}
                    </span>
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      <span className="text-capitalize"> Account & Lists</span>
                      {/* <span> Hello, {auth?.user?.name}</span> */}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                          className="dropdown-item "
                          style={{ border: "none" }}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/"
                          className="dropdown-item"
                          style={{ border: "none" }}
                        >
                          Order
                        </NavLink>
                        <NavLink
                          onClick={handlelogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item ">
                <NavLink to="/cart" className="nav-link Bold fs-5">
                  <Badge
                    count={cart?.length}
                    showZero
                    className="mt-2"
                    style={{ marginRight: "42px" }}
                  >
                    <PiShoppingCartDuotone
                      style={{ fontSize: "40px", marginTop: "-6px" }}
                    />
                    <span className="text-capitalize text-dark ">
                      Cart
                    </span>
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
