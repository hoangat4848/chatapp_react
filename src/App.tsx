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
import ConversationPageGuard from "./guards/ConversationPageGuard";
import GroupPageGuard from "./guards/GroupPageGuard";
import FriendsLayoutPage from "./pages/friends/FriendsLayoutPage";
import FriendsPage from "./pages/friends/FriendsPage";
import FriendRequestPage from "./pages/friends/FriendRequestPage";
import SettingsProfilePage from "./pages/settings/SettingsProfilePage";
import SettingsPage from "./pages/settings/SettingsPage";
import ThemeModeProvider from "./utils/context/ThemeModeProvider";
import { GlobalStyle } from "./utils/styles";
import { SettingsAppearancePage } from "./pages/settings/SettingsAppearancePage";

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
      <ThemeModeProvider>
        <AuthContext.Provider value={authValue}>
          <SocketContext.Provider value={socketValue}>
            {children}
          </SocketContext.Provider>
        </AuthContext.Provider>
      </ThemeModeProvider>
    </ReduxProvider>
  );
}

function App() {
  const [user, setUser] = useState<User>();

  return (
    <AppWithProvider user={user} setUser={setUser} socket={socket}>
      <GlobalStyle />
      <Routes>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <AppPage />
            </ProtectedRoutes>
          }
        >
          <Route path="conversations" element={<ConversationPage />}>
            <Route index element={<ConversationPanel />}></Route>
            <Route
              path=":id"
              element={
                <ConversationPageGuard>
                  <ConversationChannelPage />
                </ConversationPageGuard>
              }
            ></Route>
          </Route>

          <Route path="groups" element={<GroupPage />}>
            <Route index element={<ConversationPanel />}></Route>
            <Route
              path=":id"
              element={
                <GroupPageGuard>
                  <GroupChannelPage />
                </GroupPageGuard>
              }
            ></Route>
          </Route>

          <Route path="friends" element={<FriendsLayoutPage />}>
            <Route index element={<FriendsPage />} />
            <Route path="requests" element={<FriendRequestPage />} />
            <Route path="blocked" element={<div>Blocked Page</div>} />
          </Route>

          <Route path="settings" element={<SettingsPage />}>
            <Route path="profile" element={<SettingsProfilePage />} />
            <Route path="appearance" element={<SettingsAppearancePage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer theme="dark" limit={3} />
    </AppWithProvider>
  );
}

export default App;
