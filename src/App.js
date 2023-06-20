import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Switch, Route, Router } from "react-router-dom";
import { setAuthToken } from './helpers/setAuthToken';
import { history } from './helpers/history';
import Header from "./components/Header";
import Home from "./components/Home";
import EmptyBoard from './components/EmptyBoard';
import boardsSlice from "./redux/boardsSlice";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const activeBoard = boards.find((board) => board.isActive);
  if (!activeBoard && boards.length > 0)
    dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      // Perform additional actions if needed
      // e.g., fetch user data, update state, etc.
    }
  }, []);

  // Define a state variable to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // Function to handle successful login
  const handleLogin = (token) => {
    setAuthToken(token);
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login">
          {isAuthenticated ? (
            <Redirect to="/" />
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </Route>
        <Route path="/signup" component={Signup}/>
        <Route path="/">
          {isAuthenticated ? (
            <div className="overflow-hidden overflow-x-scroll">
              {boards.length > 0 ? (
                <>
                  <Header
                    setIsBoardModalOpen={setIsBoardModalOpen}
                    isBoardModalOpen={isBoardModalOpen}
                  />
                  
                  <Home
                    setIsBoardModalOpen={setIsBoardModalOpen}
                    isBoardModalOpen={isBoardModalOpen}
                  />
                </>
              ) : (
                <EmptyBoard type="add" />
              )}
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
