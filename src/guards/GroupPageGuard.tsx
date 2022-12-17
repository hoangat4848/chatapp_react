import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useGroupGuard from "../hooks/useGroupGuard";

const GroupPageGuard = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const { loading, error } = useGroupGuard();
  if (loading) return <div>loading group</div>;
  return error ? (
    <Navigate to="/groups" state={{ from: location }} replace />
  ) : (
    <>{children}</>
  );
};

export default GroupPageGuard;
