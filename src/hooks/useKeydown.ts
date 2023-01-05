import { useEffect } from "react";

export default function useKeydown(
  handler: (e: KeyboardEvent) => void,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [handler]);
}
