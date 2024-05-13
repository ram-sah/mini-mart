import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
    //context
    const [auth, setAuth] = useAuth()

    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put("/api/v1/auth/profile", {
                name,
                email,
                password,
                phone,
                address,
            });
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Updated Successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };
    //get user data
    useEffect(() => {
        const { name, email, address, phone } = auth?.user;
        setName(name);
        setEmail(email);
        setAddress(address);
        setPhone(phone);
    }, [auth?.user])

    return (
        <Layout title={" Profile "}>
            <div className='container-fluid h-100'>
                <div className='row '>
                    <div className='col-md-3 pt-5'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9 '>
                        <div className="register bg-gradient-orange">
                            <div className='bg-light min-h-screen p-5 rounded-5'>
                                <form onSubmit={handleSubmit}>
                                    <h4 className="text-center mb-4">User Profile </h4>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Enter your name"
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
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Enter password"
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
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100">
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile;
