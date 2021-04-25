import React from "react";
import { Link } from "react-router-dom";
import './style.css';

const Page404 = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className="d-flex justify-content-center align-items-center flex-column mt-5">
        <h1 className="h1-error">404</h1>
        <h3>User not found</h3>
        <p className="mt-2"><Link className="btn btn-info btn-sm" to="/">Go home</Link> and give it another try.</p>
      </div>
    </div>
  );
};

export default Page404;
