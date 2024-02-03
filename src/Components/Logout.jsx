import React from "react";

function Logout() {
  sessionStorage.removeItem("username");
  return <div>Logout</div>;
}

export default Logout;
