import { ReactNode } from "react";
import { createPortal } from "react-dom";

type IPortal = {
  children: ReactNode;
};
const Portal = ({ children }: IPortal) => {
  const domElement = document.getElementById("portal") as HTMLElement;
  return createPortal(<div>{children}</div>, domElement);
};

export default Portal;
