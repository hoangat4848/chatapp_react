import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>

        <Route
          path="/conversations"
          element={
            <div>
              Conversation Page
              <Outlet />
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
