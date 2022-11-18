import React from "react";
import logo from "./logo.svg";
import { Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<div>Helo world</div>}></Route>

        <Route
          path="/conversations"
          element={
            <div>
              Conversation Page <Outlet />
            </div>
          }
        >
          <Route path=":id" element={<div>Conversation Id Page</div>}></Route>
          <Route
            path=":id/edit"
            element={<div>Conversation Edit Page</div>}
          ></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
