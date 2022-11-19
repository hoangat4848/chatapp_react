import { PropsWithChildren } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoutes = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return <div key="loading">loading...</div>;
  }

  if (user) return <>{children}</>;

  return <Navigate to="/login" replace state={{ from: location }} />;
};
