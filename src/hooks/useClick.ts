import { useEffect } from "react";

export default function useClick(
  handler: (e: MouseEvent) => any,
  deps: React.DependencyList = []
) {
  useEffect(() => {
    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  }, [handler]);
}
