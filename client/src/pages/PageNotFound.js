import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const PageNotFound = () => {
  return (
    <Layout title={"page not found- go back"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
      </div>
    </Layout>
  );
};

export default PageNotFound;

//title props destructed for SEO
