import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { useAuth } from "../hooks/useAuth";
import { StyledOverlay } from "../utils/styles";

export const ProtectedRoutes = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <StyledOverlay>
        <MoonLoader size={40} color="#fff" />
      </StyledOverlay>
    );
  }

  if (user) return <>{children}</>;

  return <Navigate to="/login" replace state={{ from: location }} />;
};
