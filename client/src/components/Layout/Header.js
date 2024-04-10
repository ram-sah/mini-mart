import React from 'react'
import { PiShoppingCartDuotone } from 'react-icons/pi'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handlelogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className='container-fluid'>
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
              <span className="border border-secondary rounded border-2 p-1">
                <span className=' bg-white text-black head '>E</span>
                <span className='text-secondary rounded-end-1 p-1'>com</span>
                <span className='text-dark'>merce</span>
                <span className='text-bg-info text-white rounded-end-1 p-1 app' >App</span>
              </span>
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 mx-2">
              <li className="nav-item">
                <NavLink to="/" className="nav-link "> Home </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/category" className="nav-link "> Category </NavLink>
              </li>
              {
                !auth.user ? (<>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link "> Register </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link "> Login </NavLink>
                  </li>
                </>) : (
                  <>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown link
                      </a>

                        <NavLink className="dropdown-item" href="#">Action</NavLink>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>

                    </li>

                    <li className="nav-item">
                      <NavLink onClick={handlelogout}
                        to="/login" className="nav-link "> Logout </NavLink>
                    </li>
                  </>
                )
              }
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link Bold fs-5"><PiShoppingCartDuotone /></NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header
