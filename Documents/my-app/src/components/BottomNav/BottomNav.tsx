import React, { useState } from "react";
import "./BottomNav.scss";
import { FaInbox, FaCalendarAlt, FaLayerGroup, FaSyncAlt } from "react-icons/fa";

interface BottomNavProps {
  selected: string[];
  setSelected: (views: string[]) => void;
  setActiveView: (view: string) => void;
  openSwitchBoards: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ selected, 
  setSelected,setActiveView, openSwitchBoards }) => {
  // Store selected views as an array (Inbox / Planner / Board)
  
  console.log("Current selected:", selected);
  const updateActiveView = (views: string[]) => {
    // Always keep at least one view
    if (views.length === 0) return;
    setSelected(views);
    // Sort to keep consistent string key
    const key = views.sort().join("");

    switch (key) {
      case "Board":
        setActiveView("Board");
        break;
      case "Inbox":
        setActiveView("Inbox");
        break;
      case "Planner":
        setActiveView("Planner");
        break;
      case "BoardInbox":
        setActiveView("InboxBoard");
        break;
      case "BoardPlanner":
        setActiveView("PlannerBoard");
        break;
      case "InboxPlanner":
        setActiveView("InboxPlanner");
        break;
      case "BoardInboxPlanner":
        setActiveView("InboxPlannerBoard");
        break;
    }
  };

  const handleClick = (view: string) => {
    if (view === "Switch") {
      openSwitchBoards();
      return;
    }

    let newSelected: string[];

    if (selected.includes(view)) {
      // Trying to toggle OFF
      if (selected.length === 1) {
        // Don't allow toggling off last one
        return;
      }
      newSelected = selected.filter((v) => v !== view);
    } else {
      // Add to selection
      newSelected = [...selected, view];
    }
    console.log("nnee",newSelected);
    setSelected(newSelected);
    updateActiveView(newSelected);
  };

  return (
    <nav className="bottom-nav">
    <button
      className={selected.includes("Inbox") ? "active" : ""}
      onClick={() => handleClick("Inbox")}
    >
      <FaInbox /> Inbox
    </button>
  
    <button
      className={selected.includes("Planner") ? "active" : ""}
      onClick={() => handleClick("Planner")}
    >
      <FaCalendarAlt /> Planner
    </button>
  
    <button
      className={selected.includes("Board") ? "active" : ""}
      onClick={() => handleClick("Board")}
    >
      <FaLayerGroup /> Board
    </button>
    
    <button onClick={() => handleClick("Switch")}>
      <FaSyncAlt /> Switch
    </button>
  </nav>
  
  );
};

export default BottomNav;
