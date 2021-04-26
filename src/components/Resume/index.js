import { useCallback, useEffect, useState } from "react";

import moment from 'moment';
import { getData } from "../utils/helper";
import Spinner from "./../common/Spinner";
import Error404 from "./../Page404/index";



const Resume = ({
  history,
  match: {
    params: { username },
  },
}) => {
  const [error, setError] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [userData, setUserData] = useState([]);

  // get user data
  useEffect(() => {
    (async () => {
      const userResponse = await getData(`https://api.github.com/users/${username}`);
        
      console.log('userResponse', userResponse);

      setIsUserLoaded(true);

      if (userResponse.ok) {
        if(userResponse.data)
        setUserData(userResponse.data);
      }
      else{
        setError({ status: userResponse.status, message: userResponse.data?.message});
      }
    })();
  }, [username]);

  if (error) {
    return <Error404 status={error.status} message={error.message} />;
  } else if (!isUserLoaded) {
    return (
      <Spinner />
    );
  } else {
    return (
      <div className="jumbotron w-100 resume-container">
        <div className="d-flex flex-wrap justify-content-between align-items-start">
          <h1 className="display-3">{userData.name}</h1>
          <small>Member since {moment(userData.created_at).format('MMM DD YYYY')}</small>
        </div>
        <p>
          Public repositories <span className="badge badge-info">{userData.public_repos}</span>
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
