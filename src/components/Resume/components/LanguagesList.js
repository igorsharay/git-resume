import { PropTypes } from "prop-types";

const LanguagesList = ({ languages, username }) => {
  const totalItems = Object.values(languages).reduce(
    (total, item) => total + item
  );

  return (
    <ul className="list-inline pl-0">
      {Object.keys(languages).map(key => (
        <li key={key} className="list-inline-item h6">
          <a
            href={`https://github.com/search?q=user%3A${username}&l=${encodeURIComponent(key)}`}
            target="_blank"
            rel="nofollow noreferrer">
            {key}
          </a>
          <span className="font-weight-normal">
            {" "}
            {`(${Math.round((languages[key] / totalItems) * 100)}%)`}
          </span>
        </li>
      ))}
    </ul>
  );
};

LanguagesList.propTypes = {
  languages: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
};

export default LanguagesList;
