import { useEffect, useState } from "react";
import { API_GITHUB_TOKEN } from "../../config";
import moment from 'moment';
import { location } from "../utils/helper";



const Resume = ({
  history,
  match: {
    params: { username },
  },
}) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `token ${API_GITHUB_TOKEN}`,
      },
    })
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setUserData(result);
        },
        error => {
          setIsLoaded(true);
          setError(error);
          //location(history, "404");
        }
      );
  }, [username]);

  console.table(userData);
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="jumbotron w-100 resume-container">
        <div className="d-flex flex-wrap justify-content-between align-items-start">
          <h1 className="display-3">{userData.name}</h1>
          <small>Member since {moment(userData.created_at).format('MMM DD YYYY')}</small>
        </div>
        <p>
          Public repositories <span class="badge badge-info">{userData.public_repos}</span>
        </p>

        <div className="row">
          <div className="col-12 col-md-4">

          </div>
          <div className="col-12 col-md-8">
            
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-4">
          
          </div>
          <div className="col-12 col-md-8">
            
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-4">
          
          </div>
          <div className="col-12 col-md-8">
            
          </div>
        </div>


      </div>
    );
  }
};

export default Resume;
