import { useEffect, useMemo } from "react";
import moment from "moment";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from './reducers/userSlice';
import { fetchReposData } from './reducers/reposSlice';
import Spinner from "./../common/Spinner";
import ErrorPage from "../ErrorPage/index";
import LanguagesList from "./components/LanguagesList";
import RepositoryList from "./components/RepositoryList";
import ResumeItem from "./components/ResumeItem";
import "./style.css";

const Resume = ({
  match: {
    params: { username },
  }
}) => {

  const dispatch = useDispatch();
  const { user, userLoadingError, isUserLoading } = useSelector(state => state.userData);
  const { repos, isReposLoading, reposPageNumber } = useSelector(state => state.reposData);
  
  // Get user data
  useEffect(() => {
    dispatch(fetchUserData(username));
  }, [dispatch, username]);

  // Get user repos
  useEffect(() => {
    if (user.repos_url)
      dispatch(fetchReposData(user.repos_url, reposPageNumber));

  }, [dispatch, user, reposPageNumber]);

  // Get used languages
  const repoLanguages = useMemo(() => {
    if (!repos.length)
      return {};

    return repos.reduce((languages, repo) => {
      if (repo.language) {
        if (repo.language in languages) languages[repo.language]++;
        else languages[repo.language] = 1;
      }
      return languages;
    }, {});
  }, [repos]);

  if (userLoadingError && Object.keys(userLoadingError).length) {
    return <ErrorPage status={userLoadingError.status} message={userLoadingError.message} />;

  } else if (isUserLoading) {
    return <Spinner />;
    
  } else {
    return (
      <div className="w-100 resume-container p-3 p-md-5 my-3 my-md-4">
        <div className="d-flex flex-wrap justify-content-between align-items-start mb-3 mb-md-0">
          <h1 className="display-3 mb-2 mb-md-5">{user.name}</h1>
          <span className="h6 font-weight-normal">
            Member since {moment(user.created_at).format("MMM DD YYYY")}
          </span>
        </div>

        <dl className="row">
          <ResumeItem title={"Public repositories"}>
            <div className="h4">
              <span className="badge badge-info">{user.public_repos}</span>
            </div>
          </ResumeItem>

          <ResumeItem title={"Languages"}>
            {!isReposLoading ? (
              Object.keys(repoLanguages).length ?
                <LanguagesList languages={repoLanguages} username={username} />
                : <span>No languages</span>
              ) : <Spinner />
            }
          </ResumeItem>

          <ResumeItem title={"Recently edited public repositories"}>
            {!isReposLoading ? (
              repos.length ? 
                <RepositoryList
                  repositories={repos.slice(
                    0,
                    Math.min(10, repos.length)
                  )}
                />
                : <span>No repositories</span>
              ) : <Spinner />
            }
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
