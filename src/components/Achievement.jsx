import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Ensure PropTypes is imported

const Achievement = ({ count, cookiesPerClick, setCookiesPerClick }) => {
  const [achievementUnlocked, setAchievementUnlocked] = useState(false);
  const [bonusApplied, setBonusApplied] = useState(false);

  useEffect(() => {
    console.log("Count:", count);
    if (count >= 1000 && !achievementUnlocked) {
      console.log("Achievement unlocked!");
      setAchievementUnlocked(true);
    }
  }, [count, achievementUnlocked]);

  useEffect(() => {
    console.log("Achievement unlocked:", achievementUnlocked);
    console.log("Bonus applied:", bonusApplied);
    if (achievementUnlocked && !bonusApplied) {
      console.log("Applying bonus...");
      setCookiesPerClick(cookiesPerClick + 5);
      setBonusApplied(true);
    }
  }, [achievementUnlocked, bonusApplied, cookiesPerClick, setCookiesPerClick]);

  return (
    <div>
      {achievementUnlocked && (
        <div className="achievement">
          <h3>Achievement Unlocked!</h3>
          <p>Reached 1000 total cookies. Cookies per click increased by 5!</p>
        </div>
      )}
    </div>
  );
};

// Define propTypes to validate the props
Achievement.propTypes = {
  count: PropTypes.number.isRequired,
  cookiesPerClick: PropTypes.number.isRequired,
  setCookiesPerClick: PropTypes.func.isRequired,
};

export default Achievement;
