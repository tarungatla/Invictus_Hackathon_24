import React, { useEffect, useState } from "react";
import "./css/Nav.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ham from "../assets/ham_icon.png";
import settings from "../data";
import logo from "../assets/logo.svg";
import home from "../assets/home.svg";
import analysis from "../assets/analysis.svg";
import stockIn from "../assets/stockIn.svg";
import stockOut from "../assets/stockOut.svg";
import transaction from "../assets/transaction.svg";
import employee from "../assets/employee.svg";
import logout from "../assets/logout.svg";

function Nav({ triggerrender }) {
  const navigate = useNavigate();

  const query = window.matchMedia("(max-width: 767px)");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  // var activeSection = "home";
const [activeSection,setac]=useState("home");
  if (name === "/history") {
    trigger();
    // settings.trans=!settings.trans;
    return;
  }

  function handleclick(name) {
    closeDrawer();
    setac(name);
    navigate(`${name}`);
  }
  const location = useLocation();
  useEffect(() => {
    const currentPage = location.pathname;
    if(currentPage==="/" || currentPage==="/Login"){
    navigate("/");}
  }, [triggerrender]);
  function DefaultNav(x) {
    return (
      <div className="Nav">
        {x && (
          <div className="nav-top">
            <img src={logo} />
          </div>
        )}
        <ul className="list" color="white">
          <li
            className={activeSection === "/" ? "activesec" : ""}
            onClick={() => {
              handleclick("/");
            }}
          >
            <img src={home} alt="Logo" className="logo" />
            Home
          </li>
         
          <li
            className={activeSection === "/stockin" ? "activesec" : ""}
            id="sub"
            onClick={() => {
              handleclick("/stockin");
            }}
          >
            <img src={stockIn} alt="Logo" className="logo" />
            Stock in
          </li>
          <li
            className={activeSection === "/Stockout" ? "activesec" : ""}
            id="sub"
            onClick={() => {
              handleclick("/Stockout");
            }}
          >
            <img src={stockOut} alt="Logo" className="logo" />
            Stock out
          </li>
          <li
            className={activeSection === "/history" ? "activesec" : ""}
            onClick={() => {
              handleclick("/history");
            }}
          >
            <img src={transaction} alt="Logo" className="logo" />
            Transaction
          </li>

          {/* <li
            className={activeSection === "contact" ? "activesec" : ""}
            onClick={() => {
              handleclick("/");
            }}
          >
            <img src={employee} alt="Logo" className="logo" />
            Employees
          </li> */}
           <li
            className={activeSection === "/analysis" ? "activesec" : ""}
            onClick={() => {
              handleclick("/analysis");
            }}
          >
            <img src={analysis} alt="Logo" className="logo" />
            Analysis
          </li>
          <li
            className={activeSection === "/Logout" ? "activesec" : ""}
            onClick={() => {
              handleclick("/Logout");
            }}
          >
            <img src={logout} alt="Logo" className="logo" />
            Logout
          </li>
        </ul>
      </div>
    );
  }
  if (query.matches) {
    return (
      <div className="Mob-Nav">
        {isDrawerOpen && DefaultNav(false)}
        <div className="MN-Top">
          <div className="nav-left">
            <img
              src={ham}
              alt="logo"
              className="ham"
              onClick={toggleDrawer}
            ></img>
          </div>
          <div className="logo_holder">Admin</div>
          <div>Log in</div>
        </div>
      </div>
    );
  } else {
    return DefaultNav(1);
  }
}

export default Nav;
