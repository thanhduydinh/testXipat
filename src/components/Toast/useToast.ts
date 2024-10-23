import { createContext, useContext } from "react";
import { IContextToastProps } from "./Toast.interfaces";

const ToastContext = createContext({} as IContextToastProps);

export function useToast() {
  return useContext(ToastContext);
}

export default ToastContext;
