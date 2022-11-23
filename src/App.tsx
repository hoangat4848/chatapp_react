import React, { PropsWithChildren, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Socket } from "socket.io-client";
import ConversationPanel from "./components/conversations/ConversationPanel";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import ConversationChannelPage from "./pages/ConversationChannelPage";
import ConversationPage from "./pages/ConversationPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthContext } from "./utils/context/AuthContext";
import { socket, SocketContext } from "./utils/context/SocketContext";
import { Provider as ReduxProvider } from "react-redux";
import { User } from "./utils/types";
import { store } from "./store";

type Props = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  socket: Socket;
};

function AppWithProvider({
  user,
  setUser,
  socket,
  children,
}: PropsWithChildren<Props>) {
  const updateAuthUser = (data: User) => setUser(data);
  const authValue = { user, updateAuthUser };
  const socketValue = socket;

  return (
    <ReduxProvider store={store}>
      <AuthContext.Provider value={authValue}>
        <SocketContext.Provider value={socketValue}>
          {children}
        </SocketContext.Provider>
      </AuthContext.Provider>
    </ReduxProvider>
  );
}

function App() {
  const [user, setUser] = useState<User>();

  return (
    <AppWithProvider user={user} setUser={setUser} socket={socket}>
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
    </AppWithProvider>
  );
}

export default App;
