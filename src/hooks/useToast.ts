import { useCallback } from "react";
import { toast, ToastOptions } from "react-toastify";

export function useToast(defaultOptions?: ToastOptions<{}>) {
  const success = useCallback(
    (data: string) => toast(data, { ...defaultOptions, type: "success" }),
    []
  );

  const error = useCallback(
    (data: string, options?: ToastOptions<{}>) =>
      toast(data, { ...defaultOptions, ...options, type: "error" }),
    []
  );

  const info = useCallback(
    (data: string, options?: ToastOptions<{}>) =>
      toast(data, { ...defaultOptions, ...options, type: "info" }),
    []
  );

  return { success, error, info };
}
