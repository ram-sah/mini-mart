import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AddToCartButton from '../components/AddToCartButton'
const CategoryProduct = () => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (params?.slug) getProductByCategory()
    }, [params?.slug])

    const getProductByCategory = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/product-category/${params.slug}`
            );
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <div className="container mt-5">
                <h3 className="text-center">Category- {category?.name}</h3>
                <h5 className="text-center">{products?.length} {products?.length <= 1 ? 'item' : 'items'} found </h5>
                <div className="row">
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
                                        <button className="btn btn-outline-info me-2" onClick={() => navigate(`/product/${p.slug}`)}>
                                            More Details
                                        </button>
                                        <AddToCartButton product={p} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct
