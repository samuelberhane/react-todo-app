import React, { useEffect } from "react";

const Alert = ({ text, condition, items, handleAlert }) => {
  useEffect(() => {
    let timeOut = setTimeout(() => {
      handleAlert();
    }, 2500);
    return () => clearTimeout(timeOut);
  }, [items]);
  return (
    <div className="alert">
      <p className={`${condition} msg`}>{text}</p>
    </div>
  );
};

export default Alert;
