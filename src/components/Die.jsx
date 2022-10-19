import React from "react";

const Die = ({ value, handleHeld, isHeld }) => {
  const style = {
    backgroundColor: isHeld ? "rgb(80, 167, 124)" : "white",
  };
  return (
    <div className="die" onClick={handleHeld} style={style}>
      {value}
    </div>
  );
};

export default Die;
