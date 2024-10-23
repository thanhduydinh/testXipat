import { memo } from "react";
import useDebounce from "hooks/useDebounce";
import { ToastType } from "./Toast.interfaces";
import "./Toast.scss";

type Props = {
  toast: ToastType;
  deleteToast: () => void;
};

const Toast = ({ toast, deleteToast }: Props) => {
  useDebounce(() => {
    deleteToast();
  }, 3000);

  return (
    <div className={`toast__item toast__${toast.type as string}`}>
      <div className='toast__header'>
        <p>{toast.title}</p>
        <div className='toast__close' onClick={deleteToast}>
          &#10005;
        </div>
      </div>
      <p className='toast__message'>{toast.message}</p>
    </div>
  );
};

export default memo(Toast);
