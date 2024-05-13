import React from 'react';
import Layout from '../components/Layout/Layout';
import { useSearch } from "../context/search";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import AddToCartButton from '../components/AddToCartButton';

const Search = () => {
  const [values, setValues] = useSearch()
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  return (
    <Layout title={'Search Results'}>
      <div className='container'>
        <div className='text-center'>
          <h1>Search Results</h1>
          <h6>{values?.results.length < 1 ? "No Products Found" : `${values?.results.length} similar ${values?.results.length > 1 ? "items" : "item"} found`} </h6>
          <div className="d-flex flex-wrap mt-5">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  height={"180px"}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">$ {p.price}</p>
                  <div className=" text-center mt-auto">
                    <button className="btn btn-primary me-4 " onClick={() => navigate(`/product/${p.slug}`)}>
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

export default Search
