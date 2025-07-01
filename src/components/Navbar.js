import React from 'react';
import '../styles/navbar.css';

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <h2>TodoApp</h2>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
