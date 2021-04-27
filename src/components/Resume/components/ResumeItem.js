import { PropTypes } from "prop-types";

const ResumeItem = ({ title, children }) => {
  return (
    <>
      <dt className="col-12 col-md-4 col-lg-3 mb-2 mb-md-0">
        {title}
      </dt>
      <dd className="col-12 col-md-8 col-lg-9 mb-4">
        {children}
      </dd>
    </>
  );
}

ResumeItem.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object
}

export default ResumeItem;