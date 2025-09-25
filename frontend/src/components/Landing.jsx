import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import Header from "./Header";

function Landing() {
  return (
    <div>
      <Header />
      <div className="landing-container">
        <div className="welcome-message">
          <h2>ยินดีต้อนรับสู่</h2>
          <h2>แม่เล่า Forum</h2>
        </div>
        <div className="button-container">
          <Link to="/login">
            <button className="btn-login">Login</button>
          </Link>
          <Link to="/register">
            <button className="btn-register">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
