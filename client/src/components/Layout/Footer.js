import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-dark text-white p-3 footer'>
            <p className='text-center fs-6 fw-light'>
                <span >All Right Reserved © Ram (2023 - {new Date().getFullYear()})</span>
            </p>
            <p className='text-center mt-4'>
                <Link to='/about' >About</Link>|
                <Link to='/contact' >Contact</Link>|
                <Link to='/policy' >Privacy policy</Link>
            </p>
        </div>
    )
}

export default Footer
