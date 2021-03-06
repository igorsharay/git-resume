import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import './style.css';

const ErrorPage = ({ status = 404, message="Nothing found" }) => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 w-100">
      <div className="d-flex justify-content-center align-items-center flex-column mt-5">
        <h1 className="h1-error">{status}</h1>
        <h3>{message}</h3>
        <p className="mt-2"><Link className="btn btn-info btn-sm" to="/">Go home</Link> and give it another try.</p>
      </div>
    </div>
  );
};

ErrorPage.propTypes = {
  status: PropTypes.number,
  message: PropTypes.string
}

export default ErrorPage;
