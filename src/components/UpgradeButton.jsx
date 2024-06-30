import PropTypes from "prop-types";
import "../assets/Button.css";

const UpgradeButton = ({ name, cost, amount, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {name} (Cost: {cost}, Owned: {amount})
    </button>
  );
};

UpgradeButton.propTypes = {
  name: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default UpgradeButton;
