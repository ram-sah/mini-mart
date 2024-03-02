import React from 'react'

const Footer = () => {
    return (
        <div className='bg-dark text-white p-3'>
            <h4 className='text-center fs-6 fw-light'>
                <span >All Right Reserved © Ram (2023 - {new Date().getFullYear()})</span>
            </h4>
        </div>
    )
}

export default Footer
