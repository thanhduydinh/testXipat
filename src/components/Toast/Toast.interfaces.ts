export type ToastType = {
  title: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  id?: number;
};

export interface IContextToastProps {
  addToast: (newToast: ToastType) => void;
  deleteToast: (id: number) => void;
}
