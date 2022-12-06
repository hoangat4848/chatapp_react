import { useContext } from "react";
import { SocketContext } from "../utils/context/SocketContext";

export function useSocket() {
  const socket = useContext(SocketContext);
  if (!socket) throw new Error("Calling socket context outside provider");
  return socket;
}
