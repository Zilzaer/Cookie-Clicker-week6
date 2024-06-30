import { useState, useEffect } from "react";
import "./assets/CookieClicker.css";
import CookieDisplay from "./components/CookieDisplay.jsx";
import CookieButton from "./components/CookieButton.jsx";
import UpgradeList from "./components/UpgradeList.jsx";
import Achievement from "./components/Achievement.jsx";

const CookieClicker = () => {
  const [upgrades, setUpgrades] = useState({});
  const [shopData, setShopData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookiesPerClick, setCookiesPerClick] = useState(1);

  useEffect(() => {
    fetch("./public/assets/Shop.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setShopData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching shop data:", error);
        setLoading(false);
      });
  }, []);

  // Initialize count state based on cookiesPerSecond from owned upgrades
  const [count, setCount] = useState(() => {
    let initialCookies = 0;
    Object.keys(upgrades).forEach((type) => {
      const upgrade = shopData.find((item) => item.type === type);
      if (upgrade) {
        initialCookies += upgrades[type] * upgrade.cookiesPerSecond;
      }
    });
    return initialCookies;
  });

  const calculateCost = (baseCost, costMultiplier, amountOwned) => {
    return Math.floor(baseCost * Math.pow(costMultiplier, amountOwned));
  };

  const handleClick = () => {
    setCount(count + cookiesPerClick); // Updated to use cookiesPerClick
  };

  const handleBuy = (type) => {
    const upgrade = shopData.find((item) => item.type === type);
    if (!upgrade) return;

    const amountOwned = upgrades[type] || 0;
    const cost = calculateCost(
      upgrade.baseCost,
      upgrade.costMultiplier,
      amountOwned
    );

    if (count >= cost) {
      setCount(count - cost);
      setUpgrades((prev) => ({ ...prev, [type]: (prev[type] || 0) + 1 }));

      // Check if the upgrade affects cookiesPerClick
      if (upgrade.cookiesPerClick) {
        setCookiesPerClick(cookiesPerClick + upgrade.cookiesPerClick);
      }
    }
  };

  // useEffect to calculate and update CPS whenever upgrades or shopData change
  useEffect(() => {
    let cookiesPerSecond = 0;
    shopData.forEach((item) => {
      const amountOwned = upgrades[item.type] || 0;
      cookiesPerSecond += amountOwned * item.cookiesPerSecond;
    });

    // Update count every second based on CPS
    const cpsInterval = setInterval(() => {
      setCount((prevCount) => prevCount + cookiesPerSecond);
    }, 1000);

    return () => clearInterval(cpsInterval); // Cleanup interval on unmount or change
  }, [upgrades, shopData]);

  return (
    <div className="cookie-clicker">
      <h1>The Cookiest of Clickers</h1>
      <CookieButton onClick={handleClick} />
      <CookieDisplay count={count} />
      {!loading && (
        <UpgradeList
          count={count}
          upgrades={upgrades}
          shopData={shopData}
          calculateCost={calculateCost}
          handleBuy={handleBuy}
        />
      )}
      <Achievement
        count={count}
        cookiesPerClick={cookiesPerClick}
        setCookiesPerClick={setCookiesPerClick}
      />
    </div>
  );
};

export default CookieClicker;
