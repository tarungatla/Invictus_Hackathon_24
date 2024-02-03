import React, { useEffect, useState } from "react";
import Nav from "./Nav.jsx";
import Center from "./Center.jsx";
// import Nav from "./Nav.jsx";
import Right from "./Right.jsx";
import "./css/Admin.css";

function Admin({ trigger }) {
  const [trig, settrig] = useState(true);
  useEffect(() => {
    settrig(!trig);
  }, [trigger]);
  const username = sessionStorage.getItem("username");
  return (
    <div className="Homepage">
      <h3 class="Homepage-msg" style={{margin:"2vh",padding:"0",fontSize:"1.4rem"}}>
        <strong>Welcome Back, </strong> {username}
      </h3>
      <div className="Center">
        <Center />
      </div>
    </div>
  );
}

export default Admin;
