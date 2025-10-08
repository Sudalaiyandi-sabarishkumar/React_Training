import React, { JSX, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import { fetchCards, getLists } from "./service/Service";
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import Header from "./components/Header/Header";
import BottomNav from "./components/BottomNav/BottomNav";
import Board from "./components/Board/Board";
import InboxPage from './components/InboxPage/InboxPage';
import Planner from './components/Planner/Planner';
import SwitchBoards from './components/SwitchBoard/SwitchBoards';
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage";
import { LocalStorage } from "./Utils/LocalStorage";

interface User {
  email: string;
  password: string;
  // add other fields if needed, e.g., name, id, token
}

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>("Board");
  const [openSwitch, setOpenSwitch] = useState(false);
  const [selected, setSelected] = useState<string[]>(["Board"]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isCardInitialLoad, setIsCardInitialLoad] = useState(true); // Track initial load
  
  const [loggedInUser, setLoggedInUser] = useState<User | null>(
    LocalStorage.getItem("loggedInUser")
  );
  const isLoggedIn = !!loggedInUser;

  // Fetch lists when app loads (only if logged in)
  const { data: apiLists = [], isSuccess } = useQuery({
    queryKey: ["lists"],
    queryFn: getLists,
    enabled: isLoggedIn, // Only fetch if user is logged in
    staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: true, // Fetch on page refresh
  });
  const { data: apiCards = [], isSuccess: cardsSuccess } = useQuery({ 
    queryKey: ["cards"], 
    queryFn: fetchCards,
     enabled: isLoggedIn, 
     staleTime: 5 * 60 * 1000, 
     refetchOnWindowFocus: false, 
     refetchOnMount: true, });

  // Mark as not initial load after first successful fetch
  useEffect(() => {
    if (isSuccess && isInitialLoad) {
      // Set a small timeout to ensure data is passed to Board first
      const timer = setTimeout(() => setIsInitialLoad(false), 100);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, isInitialLoad]);

  const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  const handleLogout = () => {
    LocalStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    toast.success("Logged out");
  };

  return (
    <Router>
       <ToastContainer position="top-right" />
      <Routes>
        <Route path="/login" element={<LoginPage setLoggedInUser={setLoggedInUser} />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/board/*"
          element={
            <PrivateRoute>
              <div className="App" style={{
                height: activeView === "InboxBoard" ||
                  activeView === "PlannerBoard" ||
                  activeView === "InboxPlanner" ||
                  activeView === "InboxPlannerBoard"
                  ? "95%"
                  : "100vh",
              }}>
                <Header />
                <main style={{
                  paddingLeft: activeView === "InboxBoard" ||
                    activeView === "PlannerBoard" ||
                    activeView === "InboxPlanner" ||
                    activeView === "InboxPlannerBoard"
                    ? "0.3rem" : "0",
                  paddingTop: activeView === "InboxBoard" ||
                    activeView === "PlannerBoard" ||
                    activeView === "InboxPlanner" ||
                    activeView === "InboxPlannerBoard"
                    ? "65px" : "50px",
                  paddingRight: activeView === "InboxBoard" ||
                    activeView === "PlannerBoard" ||
                    activeView === "InboxPlanner" ||
                    activeView === "InboxPlannerBoard"
                    ? "0.3rem" : "0",
                }}>
                  {activeView === "Inbox" && (
                    <div style={{ background: "#f3f3f3" }}>
                      <InboxPage size={undefined} initialCards={apiCards} isInitialLoad={isCardInitialLoad} setIsCardInitialLoad={setIsCardInitialLoad} />
                    </div>
                  )}

                  {activeView === "Planner" && (
                    <div style={{ background: "#fdf3f3" }}>
                      <Planner />
                    </div>
                  )}

                  {activeView === "Board" && (
                    <div style={{ height: "100vh" }}>
                      <Board initialLists={apiLists} isInitialLoad={isInitialLoad} />
                    </div>
                  )}

                  {activeView === "InboxBoard" && (
                    <div style={{
                      display: "flex", width: "100%", height: "100%", padding: "0rem 0.5rem",
                      paddingBottom: "0.5rem", gap: "0.5rem", boxSizing: "border-box",
                    }}>
                      <div style={{
                        flex: "0 0 300px", background: "#f3f3f3", position: "sticky",
                        top: 0, height: "100%", overflow: "hidden", border: "1px solid #494F55",
                        borderRadius: "1rem"
                      }}>
                        <InboxPage size={1} initialCards={apiCards} isInitialLoad={isCardInitialLoad} setIsCardInitialLoad={setIsCardInitialLoad} />
                      </div>
                      <div style={{
                        flex: 1, background: "#f3fdf3", overflowX: "auto", height: "100%",
                        border: "1px solid #494F55", borderRadius: "1rem"
                      }}>
                        <Board initialLists={apiLists} isInitialLoad={isInitialLoad} />
                      </div>
                    </div>
                  )}

                  {activeView === "PlannerBoard" && (
                    <div style={{
                      display: "flex", width: "100%", height: "100%", padding: "0rem 0.5rem",
                      paddingBottom: "0.5rem", gap: "0.5rem", boxSizing: "border-box",
                    }}>
                      <div style={{
                        flex: "0 0 300px", background: "#f3f3f3", position: "sticky",
                        top: 0, height: "100%", overflow: "hidden", border: "1px solid #494F55",
                        borderRadius: "1rem"
                      }}>
                        <Planner embedded />
                      </div>
                      <div style={{
                        flex: 1, background: "#f3fdf3", overflowX: "auto", height: "100%",
                        border: "1px solid #494F55", borderRadius: "1rem"
                      }}>
                        <Board initialLists={apiLists} isInitialLoad={isInitialLoad} />
                      </div>
                    </div>
                  )}

                  {activeView === "InboxPlanner" && (
                    <div style={{
                      display: "flex", width: "100%", height: "100%", padding: "0rem 0.5rem",
                      paddingBottom: "0.5rem", gap: "0.5rem", boxSizing: "border-box",
                    }}>
                      <div style={{
                        flex: "0 0 300px", background: "#f3f3f3", position: "sticky",
                        top: 0, height: "100%", overflow: "hidden", border: "1px solid #494F55",
                        borderRadius: "1rem"
                      }}>
                        <InboxPage size={1} initialCards={apiCards} isInitialLoad={isCardInitialLoad} setIsCardInitialLoad={setIsCardInitialLoad} />
                      </div>
                      <div style={{
                        flex: 1, background: "#f3fdf3", overflowX: "auto", height: "100%",
                        border: "1px solid #494F55", borderRadius: "1rem"
                      }}>
                        <Planner embedded />
                      </div>
                    </div>
                  )}

                  {activeView === "InboxPlannerBoard" && (
                    <div style={{
                      display: "flex", width: "100%", height: "100%", padding: "0rem 0.5rem",
                      paddingBottom: "0.5rem", gap: "0.5rem", boxSizing: "border-box",
                    }}>
                      <div style={{
                        flex: "0 0 30%", background: "#f3f3f3", overflow: "auto",
                        border: "1px solid #494F55", borderRadius: "1rem"
                      }}>
                        <InboxPage size={1} initialCards={apiCards} isInitialLoad={isCardInitialLoad} setIsCardInitialLoad={setIsCardInitialLoad} />
                      </div>
                      <div style={{
                        flex: "0 0 30%", background: "#fdf3f3", overflow: "auto",
                        border: "1px solid #494F55", borderRadius: "1rem"
                      }}>
                        <Planner embedded />
                      </div>
                      <div style={{
                        flex: "1", background: "#f3fdf3", overflowX: "auto",
                        border: "1px solid #494F55", borderRadius: "1rem"
                      }}>
                        <Board initialLists={apiLists} isInitialLoad={isInitialLoad} />
                      </div>
                    </div>
                  )}
                </main>

                <BottomNav
                  setActiveView={setActiveView}
                  selected={selected}
                  setSelected={setSelected}
                  openSwitchBoards={() => setOpenSwitch(true)}
                />

                <SwitchBoards open={openSwitch} onClose={() => setOpenSwitch(false)} />
              </div>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to={isLoggedIn ? "/board" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;