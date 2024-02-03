import React, { useState } from "react";
import "./css/Login.css";
import { db } from "../Firebase/config";
import { doc, getDoc, Timestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Login({ triggerrender }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function handleLogin(username, pass) {
    if (email != "" && password != "") {
      const documentRef = doc(db, "user-db", username);
      const docSnap = await getDoc(documentRef);
      const data = docSnap.data();
      const db_pass = data["password"];
      if (db_pass == pass) {
        sessionStorage.setItem("username", username);
        console.log("succes login");
        triggerrender();
        // navigate("/");
        // alert("succes login");
        // setTimeout(() => {navigate("/")}, 2000);
        // alert("Login Sucessful");
        return;
      } else {
        alert("Invalid password");
      }
    } else {
      console.log(email, password);
      alert("Please enter all the details");
    }
  }

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />
      <div className="login">
        <label htmlFor="chk" aria-hidden="true">
          Log in
        </label>
        <input
          className="input"
          type="text"
          name="email"
          placeholder="Username"
          required=""
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className="input"
          type="password"
          name="pswd"
          placeholder="Password"
          required=""
          value={password}
          onChange={handlePasswordChange}
        />
        <button onClick={() => handleLogin(email, password)}>Log in</button>
      </div>

      {/* <div className="register">
          <form className="form">
            <label htmlFor="chk" aria-hidden="true">
              Register
            </label>
            <input
              className="input"
              type="text"
              name="txt"
              placeholder="Username"
              required=""
            />
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              required=""
            />
            <input
              className="input"
              type="password"
              name="pswd"
              placeholder="Password"
              required=""
            />
            <button>Register</button> 
          </form>
        </div>*/}
    </div>
  );
}

export default Login;
