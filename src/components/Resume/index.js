import { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { getData } from "../utils/helper";
import Spinner from "./../common/Spinner";
import Error404 from "./../Page404/index";
import LanguagesList from "./components/LanguagesList";
import RepositoryList from "./components/RepositoryList";
import ResumeItem from "./components/ResumeItem";
import "./style.css";

const Resume = ({
  match: {
    params: { username },
  },
}) => {
  const [error, setError] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [userData, setUserData] = useState([]);

  const [isUserReposLoaded, setIsUserReposLoaded] = useState(false);
  const [userRepos, setUserRepos] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  // Get user data
  useEffect(() => {
    (async () => {
      const userResponse = await getData(
        `https://api.github.com/users/${username}`
      );

      setIsUserLoaded(true);

      if (userResponse.ok) {
        if (userResponse.data) setUserData(userResponse.data);
      } else {
        setError({
          status: userResponse.status,
          message: userResponse.data?.message,
        });
      }
    })();
  }, [username]);

  // Get user repos
  useEffect(() => {
    async function getRepos() {
      const reposResponse = await getData(
        `${userData.repos_url}?visibility=public&affiliation=owner&sort=updated&direction=desc&per_page=100&page=${pageNumber}`
      );

      setIsUserReposLoaded(true);

      if (reposResponse.ok) {
        if (reposResponse.data) {
          setUserRepos(prevState => [...prevState, ...reposResponse.data]);

          if (reposResponse.data.length === 100) {
            setPageNumber(page => page + 1);
          }
        }
      }
    }

    if (userData.repos_url) {
      getRepos();
    }
  }, [userData, pageNumber]);

  // Get used languages
  const repoLanguages = useMemo(() => {
    return userRepos.reduce((languages, repo) => {
      if (repo.language) {
        if (repo.language in languages) languages[repo.language]++;
        else languages[repo.language] = 1;
      }
      return languages;
    }, {});
  }, [userRepos]);

  if (error) {
    return <Error404 status={error.status} message={error.message} />;
  } else if (!isUserLoaded) {
    return <Spinner />;
  } else {
    return (
      <div className="w-100 resume-container p-3 p-md-5 my-3 my-md-4">
        <div className="d-flex flex-wrap justify-content-between align-items-start mb-3 mb-md-0">
          <h1 className="display-3 mb-2 mb-md-5">{userData.name}</h1>
          <span className="h6 font-weight-normal">
            Member since {moment(userData.created_at).format("MMM DD YYYY")}
          </span>
        </div>

        <dl className="row">
          <ResumeItem title={"Public repositories"}>
            <div className="h4">
              <span className="badge badge-info">{userData.public_repos}</span>
            </div>
          </ResumeItem>

          <ResumeItem title={"Languages"}>
            {isUserReposLoaded && Object.keys(repoLanguages).length ? (
              <LanguagesList languages={repoLanguages} username={username} />
            ) : (
              <span>No languages</span>
            )}
          </ResumeItem>

          <ResumeItem title={"Recently edited public repositories"}>
            {isUserReposLoaded ? (
              userRepos.length ? (
                <RepositoryList
                  repositories={userRepos.slice(
                    0,
                    Math.min(10, userRepos.length)
                  )}
                />
              ) : (
                <span>No repositories</span>
              )
            ) : (
              <Spinner />
            )}
          </ResumeItem>
        </dl>

        <div className="w-100 text-right">
          <Link to="/" className="btn btn-secondary btn-sm">
            New search
          </Link>
        </div>
      </div>
    );
  }
};

Resume.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired
    })
  })
}

export default Resume;
