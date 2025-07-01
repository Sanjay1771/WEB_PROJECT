// src/components/Sidebar.js
import React from 'react';
import './Sidebar.css'; 

const Sidebar = ({ selected, onSelect }) => {
  const sections = ['My Day', 'Important', 'Planned', 'Tasks'];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="sidebar">
      <ul>
        {sections.map((section) => (
          <li
            key={section}
            className={selected === section ? 'active' : ''}
            onClick={() => onSelect(section)}
          >
            {section}
          </li>
        ))}
      </ul>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
