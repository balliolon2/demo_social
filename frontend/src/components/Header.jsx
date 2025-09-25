import React from "react";
import "./Header.css";

function Header({ username }) {
  return (
    <div className="header">
      <h1>แม่เล่า Forum</h1>
      {username && <span className="username">{username}</span>}
    </div>
  );
}

export default Header;
