import { useToast } from "components/Toast";

const ToastDemo = () => {
  const { addToast } = useToast();

  const setListLToast = () => {
    addToast({
      title: "Upload image fail.",
      message: "no upload this file. Please try again.",
      type: "error"
    });
  };

  const setListLToast2 = () => {
    addToast({
      title: "Upload image success.",
      message: "no upload this file. Please try again.",
      type: "success"
    });
  };

  return (
    <>
      <button onClick={setListLToast}>Show Toast</button>
      <button onClick={setListLToast2}>Show Toast2</button>
    </>
  );
};

export default ToastDemo;
