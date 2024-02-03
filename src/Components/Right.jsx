// import React from "react";
// import "./css/Right.css";
import RightBottom from "./RightBottom";
import RightTop from "./RightTop";
function Right() {
  return (
    <div className="Right">
      <div className="Right-Top">
        <h3>Stats</h3>
        <div className="RT-Box">
          <ul>
            <li>
              <h4>Space: </h4> 50
            </li>
            <li>
              <h4>Today in: </h4> 100
            </li>
            <li>
              <h4>Today out: </h4> 42
            </li>
            <li>
              <h4>Revenue: </h4> 423
            </li>
            <li>
              <h4>Pending: </h4> 32
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Right;
