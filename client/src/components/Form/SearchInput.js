import React, { useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory.js";
const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const categories = useCategory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
                `/api/v1/product/search/${values.keyword}`
            );
            setValues({ ...values, results: data, keyword: '' });
            navigate("/search");

        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <form
                className="d-flex search-form "
                role="search"
                onSubmit={handleSubmit}
            >
                {/* dropdown All categories */}
                <li className="nav-item dropdown bg-white border border-2 rounded-start-3">
                    <Link
                        className="nav-link dropdown-toggle px-2"
                        data-bs-toggle="dropdown"
                    >
                        All
                    </Link>
                    <ul className="dropdown-menu">
                        <li>
                            <Link className="dropdown-item fw-bold text-bg-warning"
                                to={"/categories"}>
                                All Categories
                            </Link>
                        </li>
                        {categories?.map((c, index) => (
                            <li key={index}>
                                <Link className="dropdown-item" to={`/category/${c.slug}`}>
                                    {c.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>

                <input
                    className="form-control bg-white border border-2 border-end-0 border-start-0 nav-link px-3"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                />
                <button className="btn rounded-end-3 rounded-start-0 nav-link px-2" style={{ border: '2px solid lightgrey' }} type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchInput;
