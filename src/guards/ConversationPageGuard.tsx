import { PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useConversationGuard from "../hooks/useConversationGuard";

const ConversationPageGuard = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const { loading, error } = useConversationGuard();
  if (loading) return <div>loading conversation</div>;
  console.log(error);

  return error ? (
    <Navigate to="/conversations" state={{ from: location }} replace />
  ) : (
    <>{children}</>
  );
};

export default ConversationPageGuard;
