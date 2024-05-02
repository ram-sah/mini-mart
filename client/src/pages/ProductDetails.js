import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/cart';

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart();
    //initial product details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);

    //get product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error)
        }
    }

    //get similar product
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            {/* {JSON.stringify(product, null, 4)} */}
            <div className="row container mt-5 mx-md-4 mx-auto mx-lg-0">
                <div className="col-lg-5 mt-2 ">
                    <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top "
                        alt={product.name}
                        height={'300'}
                    />
                </div>
                <div className="col-lg-7 px-0 px-lg-5">
                    <h2 className='text-center mt-lg-0 my-4'>Product Details</h2>
                    <h6>Name: {product.name} </h6>
                    <h6>Description: {product.description} </h6>
                    <h6>Price: $ {product.price} </h6>
                    <h6>Category: {product.category?.name} </h6>
                    <button className="btn btn-secondary "
                        onClick={() => {
                            setCart([...cart, product]);
                            toast.success("Item Added to cart successfully");
                        }}
                    >Add to Cart</button>
                </div>
            </div>
            <hr />
            <div className="row ms-md-4 mt-lg-0 ">
                <h5 className='text-md-start text-center my-4'>Check Out Some Similar Products</h5>
                {relatedProducts.length < 1 && <p className='text-center'>No Similar Products Found</p>}
                {/* {JSON.stringify(relatedProducts, null,4)} */}
                {relatedProducts?.map((p) => (
                    <div className="card m-2 mx-auto mx-md-0" style={{ width: "18rem" }} key={p._id}>
                        <div className="text-center">
                            <img
                                src={`/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top "
                                alt={p.name}
                                height={"150px"}
                            />
                        </div>
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">
                                {p.description.substring(0, 30)}...
                            </p>
                            <p className="card-text">$ {p.price}</p>
                            <div className="mt-auto text-center">
                                <button className="btn btn-primary me-1" onClick={() => navigate(`/product/${p.slug}`)}>
                                    More Details
                                </button>
                                <button className="btn btn-secondary "
                                    onClick={() => {
                                        setCart([...cart, p]);
                                        toast.success("Item Added to cart successfully");
                                    }}
                                >Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default ProductDetails;
