import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UpgradeButton from "./UpgradeButton";

const UpgradeList = ({
  count,
  upgrades,
  shopData,
  calculateCost,
  handleBuy,
}) => {
  const [unlockedUpgrades, setUnlockedUpgrades] = useState({});

  useEffect(() => {
    const newUnlockedUpgrades = { ...unlockedUpgrades };

    shopData.forEach((item) => {
      if (count >= item.baseCost) {
        newUnlockedUpgrades[item.type] = true;
      }
    });

    if (
      JSON.stringify(unlockedUpgrades) !== JSON.stringify(newUnlockedUpgrades)
    ) {
      setUnlockedUpgrades(newUnlockedUpgrades);
    }
  }, [count, shopData, unlockedUpgrades]);

  return (
    <>
      {shopData.map((item) => {
        const amountOwned = upgrades[item.type] || 0;
        const cost = calculateCost(
          item.baseCost,
          item.costMultiplier,
          amountOwned
        );
        const isUnlocked = unlockedUpgrades[item.type] || false;
        const disabled = count < cost;

        return (
          isUnlocked && (
            <UpgradeButton
              key={item.type}
              name={item.type}
              cost={cost}
              amount={amountOwned}
              onClick={() => handleBuy(item.type)}
              disabled={disabled}
            />
          )
        );
      })}
    </>
  );
};

UpgradeList.propTypes = {
  count: PropTypes.number.isRequired,
  upgrades: PropTypes.object.isRequired,
  shopData: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      baseCost: PropTypes.number.isRequired,
      costMultiplier: PropTypes.number.isRequired,
      cookiesPerSecond: PropTypes.number,
      cookiesPerClick: PropTypes.number,
    })
  ).isRequired,
  calculateCost: PropTypes.func.isRequired,
  handleBuy: PropTypes.func.isRequired,
};

export default UpgradeList;
