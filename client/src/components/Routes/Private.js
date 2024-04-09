import React, { useState } from 'react'
import { useAuth } from '../../context/auth';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';

const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get('/api/v1/auth/user-auth')
            if (res.data.ok) {
                setOk(true)
            }
            else {
                setOk(false)
            }
        };
        if (auth?.token) authCheck();
    }, [auth?.token]);
    return ok ? <Outlet /> : <Spinner />
}

export default PrivateRoute;
