import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import ConversationPanel from "./components/conversations/ConversationPanel";
import ConversationChannelPage from "./pages/ConversationChannelPage";
import ConversationPage from "./pages/ConversationPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>

        <Route path="/conversations" element={<ConversationPage />}>
          <Route index element={<ConversationPanel />}></Route>
          <Route path=":id" element={<ConversationChannelPage />}></Route>
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
