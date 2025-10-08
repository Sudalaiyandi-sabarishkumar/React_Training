import React, { useState, useRef, useEffect } from "react";
import { FiX } from "react-icons/fi";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { FaBell, FaBullhorn, FaQuestionCircle } from "react-icons/fa";
import { LocalStorage } from "../../Utils/LocalStorage";

const Header: React.FC = () => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const loggedInUser = LocalStorage.getItem("loggedInUser");
  const email = loggedInUser ? loggedInUser.email : "Guest";
  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfilePopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("ssss");
    LocalStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-box">
          <span className="logo-icon">▦</span>
        </div>
        <span className="logo-text">Trello</span>
      </div>

      <div className="header-center">
        <div className="search-box">
          <input type="text" placeholder="Search" />
        </div>
        <button className="create-btn">Create</button>
      </div>

      <div className="header-right">
      <button className="trial-btn">14 days left</button>
        <FaBullhorn className="icon" />
        <FaBell className="icon" />
        <FaQuestionCircle className="icon" />
        <div className="profile" onClick={() => setShowProfilePopup(!showProfilePopup)}>
          S
          {showProfilePopup && (
            <div className="profile-popup" ref={menuRef}>
              <ul>
                <li className="popup-header">
                  <span>Account</span>
                  <button onClick={() => setShowProfilePopup(false)} className="close-btn">
                    <FiX />
                  </button>
                </li>
                <li className="menu-item">
                
                
                <div className="avatar avatar-1" title="User 1">S</div>
                <div className="user-details">
                  <p>Sudalaiyandi Sabarish</p>
                  <p>{email}</p>

                </div>
              </li>
                <li>Visibility</li>
                <li>Activity</li>
                <li>Cards</li>
                <li>Settings</li>
                <li>Theme</li>
                <li>Workspace</li>
                <li>Help</li>
                <li>Shortcuts</li>
                
                <li>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
