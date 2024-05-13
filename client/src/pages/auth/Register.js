import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/api/v1/auth/register", {
                name,
                email,
                password,
                address,
                phone,
                answer
            });

            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when component mounts
    }, []);

    return (
        <Layout title={"Register your account "}>
            <div className="register bg-gradient-blue">
                <div className='bg-light p-5 rounded-5'>
                    <h3 className="text-center mb-4 ">
                        Welcome to Ecommerce
                    </h3>
                    <h4 className="text-center mb-5">Register Form</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter your name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
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

                        <div className="mb-3">
                            <input
                                type="string"
                                className="form-control"
                                id="address"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="string"
                                className="form-control"
                                id="phone"
                                placeholder="Phone"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="answer"
                                placeholder="What is your favorite color? "
                                required
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
