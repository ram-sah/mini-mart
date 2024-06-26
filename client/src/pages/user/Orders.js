import React, { useEffect, useState } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const getOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/order");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (auth?.token) getOrders(); // Fetch orders if auth token exists
        window.scrollTo(0, 0); // Scroll to the top when component mounts
    }, [auth?.token]); // Dependency array containing auth?.token

    return (
        <Layout title={"Order Data"}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 p-3 ">
                        <UserMenu />
                    </div>

                    {/* All orders */}
                    <div className="col-md-9 ">
                        <div className="row order bg-gradient-orange p-m-4 ">
                            <div className="col-lg-9 col-12">
                                <h3 className="text-center my-5">
                                    {orders.length ? "All Orders" : "You don't have any order yet"}
                                </h3>
                                {orders.length > 0 &&
                                    (<h5 className="text-center"> Hi, {orders[0]?.buyer?.name}</h5>)}

                                {/* <p>{JSON.stringify(orders, null, 4)}</p> */}

                                <div className="border shadow">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">SN.</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Order Date </th>

                                            </tr>
                                        </thead>
                                        {orders.map((o, i) => (
                                            <tbody key={i}>
                                                <tr>
                                                    <th scope="row">{i + 1} </th>
                                                    <td>{o?.status} </td>
                                                    <td>{o?.payment?.success ? "Success" : "Failed"} </td>
                                                    <td>{o?.products?.length} </td>
                                                    <td>{moment(o?.createdAt).fromNow()} </td>

                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                                <div className="container ">
                                    <div className="mt-5">
                                        {orders.map((o, i) =>
                                            o.products.map((p, j) => (
                                                <div className="row card flex-row mb-2 mt-2 " key={p._id}>
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
                                                                height={"100px"}
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="col-lg-8 col-7 align-content-center">
                                                        <div className="row">
                                                            <div className="col-8">
                                                                <h6
                                                                    className="mb-0"
                                                                    style={{ textTransform: "capitalize" }}
                                                                >
                                                                    {p.name}
                                                                </h6>
                                                                <p className="mb-0">
                                                                    {p.description.substring(0, 30)}...
                                                                </p>
                                                                <p className="mb-0">Price: $ {p.price} </p>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <span className="fw-semibold ">Purchased on: </span> {moment(o?.createdAt).format("MM/DD/YYYY-HH:mm")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
