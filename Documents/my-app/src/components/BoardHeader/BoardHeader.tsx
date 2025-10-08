import React, { useState, useEffect, useRef } from "react";
import "./BoardHeader.scss";
import { User } from "lucide-react";
import { FaBell, FaBullhorn, FaFilter, FaQuestionCircle, FaRegStar } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import BackgroundPopup from "../BackgroundPopup/BackgroundPopup";
import SearchBar from "../SearchBar/SearchBar";
import { LocalStorage } from "../../Utils/LocalStorage";
interface BoardHeaderProps {
  onChangeBackground: (bg: string) => void;
  onSearch?: (query: string) => void;
}

const BoardHeader: React.FC<BoardHeaderProps> = ({ onChangeBackground ,onSearch})=> {
  const [boardName, setBoardName] = useState<string>(
    LocalStorage.getItem("boardName") || "My Trello board"
  );
  const [editing, setEditing] = useState<boolean>(false);
  const [tempName, setTempName] = useState(boardName);
  const [menuOpen, setMenuOpen] = useState(false);
  const [backgroundPopupOpen, setBackgroundPopupOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    LocalStorage.setItem("boardName", boardName);
  }, [boardName]);

  const handleSave = () => {
    setBoardName(tempName.trim() || "My Trello board");
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") setEditing(false);
  };

  // Toggle menu
  const openMenu = () => {
    if (backgroundPopupOpen) setBackgroundPopupOpen(false); // close background if open
    setMenuOpen((prev) => !prev); // toggle menu
  };

  // Open background popup
  const openBackgroundPopup = () => {
    setMenuOpen(false); // always close menu
    setBackgroundPopupOpen(true); // open background popup
  };

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (backgroundRef.current && !backgroundRef.current.contains(e.target as Node)) {
        setBackgroundPopupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="trello-header">
      <div className="trello-header-left">
        {editing ? (
          <input
            className="board-title-input"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <h1
            className="board-title"
            onClick={() => setEditing(true)}
            title="Click to edit"
          >
            {boardName}
          </h1>
        )}

        <button className="icon-btn menu-btn" onClick={openMenu}>
          ☰
        </button>

        <div className="board-header-search">
  {onSearch && <SearchBar placeholder="Search lists/cards..." onSearch={onSearch} />}
</div>

        {/* Menu Popup */}
        {menuOpen && !backgroundPopupOpen && (
          <div className="board-menu-popup" ref={menuRef}>
            <ul>
              <li className="menu-header">
                <span className="menu-title">Menu</span>
                <button className="close-btn" onClick={openMenu}>
                  <FiX />
                </button>
              </li>

              <li className="menu-item">
                <User className="menu-icon" />
                Share
                <div className="avatar avatar-1" title="User 1">S</div>
              </li>
              <li>
                <FaBullhorn className="menu-icon" /> About this board
              </li>
              <li>
                <FaRegStar className="menu-icon" /> Visibility: Workspace
              </li>
              <li>
                <FaBell className="menu-icon" /> Print, export, and share
              </li>
              <li>
                <FaFilter className="menu-icon" /> Star
              </li>
              <li>
                <FaQuestionCircle className="menu-icon" /> Settings
              </li>
              <li className="menu-item">
  <div 
    className="bg-preview" 
    style={{ background: LocalStorage.getItem("boardBackground") || "linear-gradient(160deg, #7a4ee6, #e25dbd)" }}
    onClick={openBackgroundPopup}
    title="Change background"
  />
  <button onClick={openBackgroundPopup} className="change-bg-btn">
    Change background
  </button>
</li>

              <li>
                <FaRegStar className="menu-icon" /> Custom Fields
              </li>
              <li>
                <FaFilter className="menu-icon" /> Automation
              </li>
              <li>
                <FaBell className="menu-icon" /> Power-Ups
              </li>
              <li>
                <FaQuestionCircle className="menu-icon" /> Labels
              </li>
              <li>
                <FaBullhorn className="menu-icon" /> Stickers
              </li>
              <li>
                <FaRegStar className="menu-icon" /> Make template
              </li>
              <li>
                <FaFilter className="menu-icon" /> Activity
              </li>
            </ul>
          </div>
        )}

        {/* Background Popup */}
        {backgroundPopupOpen && (
    <div ref={backgroundRef}>
      <BackgroundPopup 
        onClose={() => setBackgroundPopupOpen(false)} 
        onSelectBackground={(bg: string) => {
          onChangeBackground(bg);  // ✅ Pass the background value up
         // setBackgroundPopupOpen(false);  // ✅ Close popup in header
        }}
      />
    </div>
  )}

      </div>

      {/* Right Section */}
      <div className="trello-header-right">
        <div className="trello-tools">
          <div className="member-avatars">
            <div className="avatar avatar-1" title="User 1">S</div>
          </div>
        </div>
        <FaFilter className="icon" title="Filter"/>
        <FaRegStar className="icon" />
        <FaBell className="icon" />

        <button className="share-btn">
          <span className="icon-share"><User className="w-2 h-2 text-gray-400" /></span> Share
        </button>

        <button
          className="icon-btn more-options-btn"
          aria-label="More Options"
          onClick={openMenu}
        >
          ···
        </button>
      </div>
    </header>
  );
};

export default BoardHeader;
