import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("api/v1/product/product-count");
      if (data?.success) {
        setTotal(data?.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All products | Best offers"}>
      <div className="row bg-gradient-blue">
        <div className="col-lg-2 mt-4">
          <h4 className="text-start ms-4 "> Filter by category</h4>
          <div className="d-flex flex-column ms-4 ">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
                className="custom-checkbox "
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* price filter */}
          <h4 className="text-start ms-4 "> Filter by Price</h4>
          <div className="d-flex flex-column ms-4">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name} </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="d-flex flex-column ms-4 mt-4">
            <button
              className="btn btn-danger"
              style={{ width: "8rem" }}
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-10 mt-4">
          {/* {JSON.stringify(radio, null)} */}
          <h2 className="text-center mb-5 mt-lg-0 mt-md-0">
            Keep shopping for
          </h2>
          <div className="d-flex flex-wrap flex justify-content-center">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  height={"180px"}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">$ {p.price}</p>
                  <div className=" text-center">
                    <button
                      className="btn btn-outline-info me-2"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary me-2 mt-sm-0"
                      onClick={() => {
                        setCart([...cart, p]);
                        toast.success("Item Added to cart successfully");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 my-3 d-flex flex-wrap flex justify-content-center">
            {products && products.length < total && (
              <button
                className="btn btn-warning "
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {" "}
                {loading ? "loading..." : "Load more products"}{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

// above title props destruct for SEO
