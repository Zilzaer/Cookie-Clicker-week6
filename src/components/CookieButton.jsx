import PropTypes from "prop-types";

const CookieButton = ({ onClick }) => {
  return (
    <div className="cookie" onClick={onClick}>
      🍪
    </div>
  );
};

CookieButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CookieButton;
