import { createContext, useContext } from "react";
import { IContextProps } from "../UploadFile.interfaces";

const UploadFileContext = createContext({} as IContextProps);

export function useCustomContext() {
  return useContext(UploadFileContext);
}

export default UploadFileContext;
