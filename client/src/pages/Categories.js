import React from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();
    return (
        <Layout title={"All Categories"}>
            <div className="container">
                <div className="row mt-5">
                    {categories.map((c) => (
                        <div className='col-md-6 mt-3 gx-2 gy-2' key={c.id}>
                            <Link to= {`/category/${c.slug}`} className='btn btn-primary' >
                                {c.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Categories
