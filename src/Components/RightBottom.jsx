import React from "react";
import { useNavigate } from "react-router-dom";

function RightBottom() {
  const navigate=useNavigate();
  const handlestockin =()=>{navigate('/stockin');}
  return (
    <div className="Right-Bottom">
      <h3>Actions</h3>
      <div className="RB-Box">
        <button onClick={handlestockin}>Stock in</button>
        <button>Stock out</button>
      </div>
    </div>
  );
}

export default RightBottom;
