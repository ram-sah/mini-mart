import React, { useEffect, useState } from 'react'
import axios from "axios";
import Layout from "./../../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth()
    const location = useLocation()

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name,email,phone, address,password)

        try {
            const res = await axios.post("/api/v1/auth/login", {
                email,
                password,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                // store in localStorage
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    // console.log(process.env.REACT_APP_API)

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when component mounts
    }, []);

    return (
        <Layout title="Login your account ">
            <div className="register bg-gradient-blue">
                <div className='bg-light p-5 rounded-5'>
                    <h3 className="text-center mb-4 ">
                        Welcome to Ecommerce
                    </h3>
                    <h4 className="mb-5 text-center">Login Form</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-3">
                            Login
                        </button>
                        <div className="font-bold text-center pt-2">OR</div>

                        <button type="button" className="btn btn-danger w-100 pt-2 " onClick={() => { navigate('/forgot-password') }}>
                            Forgot Password
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Login;
