import React from 'react'
import Layout from '../components/Layout/Layout'

const About = () => {
    return (
        <Layout
            title={"About us | Ecommerce app"}
            description={'mern stack project'}
            keyword={'mern, react, node, bootstrap, mongodb'}
            author={'Ram'} >
            <h1>About</h1>
        </Layout>
    )
}
// create default parameters for SEO friendly page
Layout.defaultProps = {
    title: 'Ecommerce app, Shop now, Discount, Sale',
    description: 'mern stack project ',
    keyword: 'mern, react, node, bootstrap, mongodb,',
    author: 'Ram'
};
export default About
