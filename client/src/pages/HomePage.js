import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"Main page | Homepage | best offers"}>
      <h3>home</h3>
      <pre> {JSON.stringify(auth, null, 4)} </pre>
    </Layout>
  )
}

export default HomePage

// above title props destruct for SEO
