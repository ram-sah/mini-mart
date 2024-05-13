import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
    const [status, setStatus] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancel",
    ]);
    const [changeStatus, setChangeStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const getOrders = async () => {
        try {
            const { data } = await axios.get("/api/v1/auth/all-order");
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (auth?.token) getOrders(); // Fetch orders if auth token exists
        window.scrollTo(0, 0); // Scroll to the top when component mounts
    }, [auth?.token]); // Dependency array containing auth?.token

    //handleChange
    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, { status: value, });
            getOrders();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout title={"All Orders Data"}>
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-md-3 p-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9 ">
                        <div className="row order bg-gradient-orange p-m-4 ">
                            <div className="col-lg-9 col-12">
                                <h3 className="text-center my-5">
                                    {orders.length ? "All Orders" : "Not any order yet"}
                                </h3>
                                {/* <p>{JSON.stringify(orders, null, 4)}</p> */}

                                <div className="border shadow">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">SN.</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Order Date </th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Buyer</th>
                                            </tr>
                                        </thead>
                                        {orders.map((o, i) => (
                                            <tbody key={i}>
                                                <tr>
                                                    <th scope="row">{i + 1} </th>
                                                    <td>
                                                        <Select
                                                            bordered={false}
                                                            onChange={(value) => handleChange(o._id, value)}
                                                            defaultValue={o?.status}
                                                        >
                                                            {status.map((s, i) => (
                                                                <Option key={i} value={s} >
                                                                    {s}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </td>
                                                    <td>{o?.payment?.success ? "Success" : "Failed"} </td>
                                                    <td>{moment(o?.createdAt).fromNow()} </td>
                                                    <td>{o?.products?.length} </td>
                                                    <td>{o?.buyer?.name}</td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                                <div className="container ">
                                    <div className="mt-5">
                                        {orders.map((o, i) =>
                                            o.products.map((p, j) => (
                                                <div
                                                    className="row card flex-row mb-2 mt-2 "
                                                    key={p._id}
                                                >
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
                                                                <span className="fw-semibold ">
                                                                    Purchased on:{" "}
                                                                </span>{" "}
                                                                {moment(o?.createdAt).format(
                                                                    "MM/DD/YYYY-HH:mm"
                                                                )}
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

export default AdminOrders;
