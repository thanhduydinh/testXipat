import { useMemo, useState } from "react";
import Portal from "../Portal";
import Toast from "./Toast";
import { ToastType } from "./Toast.interfaces";
import ToastContext from "./useToast";
import "./Toast.scss";

const generateUID = () => {
  return Math.random() * 46656;
};

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = (newToast: ToastType) => {
    if (!newToast) return null;
    setToasts(currentToasts => [...currentToasts, { ...newToast, id: generateUID() }]);

    return newToast.id;
  };

  const deleteToast = (id: number) => {
    setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
  };

  const providerState = useMemo(() => {
    return {
      addToast,
      deleteToast
    };
  }, []);

  return (
    <Portal>
      <ToastContext.Provider value={providerState}>
        {children}
        <div className='toast-container'>
          {toasts?.map(item => (
            <Toast key={item.id} toast={item} deleteToast={() => deleteToast(item.id as number)} />
          ))}
        </div>
      </ToastContext.Provider>
    </Portal>
  );
};

export default ToastProvider;
