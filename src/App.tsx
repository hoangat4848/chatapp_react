import React, { PropsWithChildren, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Socket } from "socket.io-client";
import ConversationPanel from "./components/conversations/ConversationPanel";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import ConversationChannelPage from "./pages/conversation/ConversationChannelPage";
import ConversationPage from "./pages/conversation/ConversationPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthContext } from "./utils/context/AuthContext";
import { socket, SocketContext } from "./utils/context/SocketContext";
import { Provider as ReduxProvider } from "react-redux";
import { User } from "./utils/types";
import { store } from "./store";
import GroupPage from "./pages/group/GroupPage";
import GroupChannelPage from "./pages/group/GroupChannelPage";
import { AppPage } from "./pages/AppPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          element={
            <ProtectedRoutes>
              <AppPage />
            </ProtectedRoutes>
          }
        >
          <Route path="conversations" element={<ConversationPage />}>
            <Route index element={<ConversationPanel />}></Route>
            <Route path=":id" element={<ConversationChannelPage />}></Route>
          </Route>

          <Route path="groups" element={<GroupPage />}>
            <Route index element={<ConversationPanel />}></Route>
            <Route path=":id" element={<GroupChannelPage />}></Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer theme="dark" limit={3} />
    </AppWithProvider>
  );
}

export default App;
