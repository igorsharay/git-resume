import { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { location } from "../utils/helper";

const Home = () => {
  const [username, setUsername] = useState("");

  const handleChange = useCallback(
    e => {
      setUsername(e.target.value);
    },
    [setUsername]
  );

  const history = useHistory();

  const handleClick = useCallback(
    e => {
      location(history, username);
    },
    [history, username]
  );

  return (
    <div className="jumbotron w-100">
      <h1 className="text-center mb-3">MY GITHUB RESUME</h1>
      <p className="lead text-center">
        Try it out! Enter a github username to see what you know about him!
      </p>

      <div className="form-inline justify-content-center">
        <div className="form-group mr-md-3 mb-2 px-0 col-12 col-md-6">
          <input
            type="text"
            className="form-control form-control-lg w-100"
            placeholder="Enter your GitHub username and click on generate"
            value={username}
            onChange={handleChange}
          />
        </div>

        <button
          type="button"
          className="btn btn-dark btn-lg mb-2"
          onClick={handleClick}>
          Generate
        </button>
      </div>

      <h4 className="mt-5 text-center">See some popular users</h4>

      <ul className="d-flex justify-content-center align-items-center flex-wrap p-0">
        <li className="px-3">
          <Link to="/defunkt">Chris Wanstrath</Link>
        </li>
        <li className="px-3">
          <Link to="/mxcl">Max Howell</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
