import { PropTypes } from "prop-types";

const RepositoryList = ({ repositories }) => {
  return (
    <ul className="pl-0">
      {repositories.map(repo => (
        <li key={repo.id}>
          <a
            href={repo.html_url}
            target="_blank"
            rel="nofollow noreferrer"
            className="h5">
            {repo.name}
          </a>
          <p>{repo.description}</p>
        </li>
      ))}
    </ul>
  );
};

RepositoryList.propTypes = {
  repositories: PropTypes.array.isRequired,
};

export default RepositoryList;
