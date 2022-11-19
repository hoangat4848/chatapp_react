import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ConversationPanel from "./components/conversations/ConversationPanel";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import ConversationChannelPage from "./pages/ConversationChannelPage";
import ConversationPage from "./pages/ConversationPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthContext } from "./utils/context/AuthContext";
import { User } from "./utils/types";

function App() {
  const [user, setUser] = useState<User>();
  const updateAuthUser = (data: User) => setUser(data);
  const value = { user, updateAuthUser };

  return (
    <AuthContext.Provider value={value}>
      <Routes>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>

        <Route
          path="/conversations"
          element={
            <ProtectedRoutes>
              <ConversationPage />
            </ProtectedRoutes>
          }
        >
          <Route index element={<ConversationPanel />}></Route>
          <Route path=":id" element={<ConversationChannelPage />}></Route>
          <Route
            path=":id/edit"
            element={<div>Conversation Edit Page</div>}
          ></Route>
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
