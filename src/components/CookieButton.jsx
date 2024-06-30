import PropTypes from "prop-types";


const CookieButton = ({ onClick }) => {
  return (
    <div className="cookie" onClick={onClick}>
    <img src="./assets/cookieImg.png" alt="a smiling cookie" />
    </div>
  );
};

CookieButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CookieButton;
