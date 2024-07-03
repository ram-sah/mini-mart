import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";

const Users = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-order");
      console.log("Fetched Orders: ", data); // Debug log
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
    window.scrollTo(0, 0);
  }, [auth?.token]);

  // Extract unique buyers from orders with valid buyer objects
  const uniqueBuyers = Array.from(
    new Set(
      orders
        .filter(order => order.buyer) // Ensure buyer is not null
        .map(order => order.buyer._id)
    )
  ).map(id => orders.find(order => order.buyer && order.buyer._id === id).buyer);

  console.log("Unique Buyers: ", uniqueBuyers); // Debug log

  return (
    <Layout title={"Dashboard - Users "}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 ">
            <h1>All Users List</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {uniqueBuyers.map((buyer, i) => (
                  <tr key={i}>
                    <td> {i = i + 1} {buyer.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
