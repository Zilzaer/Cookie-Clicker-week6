import PropTypes from "prop-types";

const CookieDisplay = ({ count }) => {
  return <p>Cookies: {count}</p>;
};

CookieDisplay.propTypes = {
  count: PropTypes.number.isRequired,
};

export default CookieDisplay;
