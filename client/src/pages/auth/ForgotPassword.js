import React, { useState } from 'react'
import axios from "axios";
import Layout from "./../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState()

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name,email,phone, address,forgot-password)

        try {
            const res = await axios.post("/api/v1/auth/forgot-password", {
                email,
                newPassword,
                answer,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login")
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        };

    };
    return (
        <Layout title="Login your account ">
            <div className="register">
                <h2 className="mb-5">Reset Password From</h2>
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
                            type="test"
                            className="form-control"
                            id="answer"
                            placeholder="Enter your favorite color"
                            required
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            placeholder="Enter New password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 " onClick={() => { navigate('/forgot-password') }}>
                        Update Password
                    </button>
                </form>
            </div>
        </Layout>
    );
};
export default ForgotPassword;
