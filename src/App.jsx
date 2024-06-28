import { useState, useEffect } from "react";
import "./assets/CookieClicker.css";

const CookieClicker = () => {
  const [count, setCount] = useState(0);
  const [autoClickers, setAutoClickers] = useState(0);
  const [cookieOvens, setCookieOvens] = useState(0);
  const [cookiePrinters, setCookiePrinters] = useState(0);
  const [cookieCauldrons, setCookieCauldrons] = useState(0);

  const [autoClickerUnlocked, setAutoClickerUnlocked] = useState(false);
  const [cookieOvenUnlocked, setCookieOvenUnlocked] = useState(false);
  const [cookiePrinterUnlocked, setCookiePrinterUnlocked] = useState(false);
  const [cookieCauldronUnlocked, setCookieCauldronUnlocked] = useState(false);

  const baseCosts = {
    autoClicker: 10,
    cookieOven: 100,
    cookiePrinter: 250,
    cookieCauldron: 500,
  };

  const calculateCost = (baseCost, amountOwned) => {
    return Math.floor(baseCost * Math.pow(1.15, amountOwned));
  };

  const autoClickerCost = calculateCost(baseCosts.autoClicker, autoClickers);
  const cookieOvenCost = calculateCost(baseCosts.cookieOven, cookieOvens);
  const cookiePrinterCost = calculateCost(
    baseCosts.cookiePrinter,
    cookiePrinters
  );
  const cookieCauldronCost = calculateCost(
    baseCosts.cookieCauldron,
    cookieCauldrons
  );

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleBuyAutoClicker = () => {
    if (count >= autoClickerCost) {
      setCount(count - autoClickerCost);
      setAutoClickers(autoClickers + 1);
    }
  };

  const handleBuyCookieOven = () => {
    if (count >= cookieOvenCost) {
      setCount(count - cookieOvenCost);
      setCookieOvens(cookieOvens + 1);
    }
  };

  const handleBuyCookiePrinter = () => {
    if (count >= cookiePrinterCost) {
      setCount(count - cookiePrinterCost);
      setCookiePrinters(cookiePrinters + 1);
    }
  };

  const handleBuyCookieCauldron = () => {
    if (count >= cookieCauldronCost) {
      setCount(count - cookieCauldronCost);
      setCookieCauldrons(cookieCauldrons + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + autoClickers);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoClickers]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + cookieOvens * 10);
    }, 1000);

    return () => clearInterval(interval);
  }, [cookieOvens]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + cookiePrinters * 25);
    }, 1000);

    return () => clearInterval(interval);
  }, [cookiePrinters]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + cookieCauldrons * 50);
    }, 1000);

    return () => clearInterval(interval);
  }, [cookieCauldrons]);

  useEffect(() => {
    if (count >= baseCosts.autoClicker) {
      setAutoClickerUnlocked(true);
    }
    if (count >= baseCosts.cookieOven) {
      setCookieOvenUnlocked(true);
    }
    if (count >= baseCosts.cookiePrinter) {
      setCookiePrinterUnlocked(true);
    }
    if (count >= baseCosts.cookieCauldron) {
      setCookieCauldronUnlocked(true);
    }
  }, [count]);

  return (
    <div className="cookie-clicker">
      <h1>Cookie Clicker</h1>
      <div className="cookie" onClick={handleClick}>
        🍪
      </div>
      <p>Cookies: {count}</p>

      {autoClickerUnlocked && (
        <>
          <button onClick={handleBuyAutoClicker}>
            Buy Auto Clicker ({autoClickerCost} Cookies)
          </button>
          <p>Auto Clickers: {autoClickers}</p>
        </>
      )}

      {cookieOvenUnlocked && (
        <>
          <button onClick={handleBuyCookieOven}>
            Buy Cookie Oven ({cookieOvenCost} Cookies)
          </button>
          <p>Cookie Ovens: {cookieOvens}</p>
        </>
      )}

      {cookiePrinterUnlocked && (
        <>
          <button onClick={handleBuyCookiePrinter}>
            Buy Cookie Printer ({cookiePrinterCost} Cookies)
          </button>
          <p>Cookie Printers: {cookiePrinters}</p>
        </>
      )}

      {cookieCauldronUnlocked && (
        <>
          <button onClick={handleBuyCookieCauldron}>
            Buy Cookie Cauldron ({cookieCauldronCost} Cookies)
          </button>
          <p>Cookie Cauldrons: {cookieCauldrons}</p>
        </>
      )}
    </div>
  );
};

export default CookieClicker;
