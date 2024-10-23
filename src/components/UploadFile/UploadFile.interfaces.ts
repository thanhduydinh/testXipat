import { Dispatch } from "react";

export interface Action {
  type: string;
  payload: any;
}

export interface IContextProps {
  state: StateType;
  dispatch: Dispatch<Action>;
}

export interface FileDefault {
  code?: any;
  name: string;
  size: number;
  type: string;
  lastModificationTime?: Date;
  fileUrl: string;
}

export interface StateType {
  files: File[] | FileList | FileDefault[];
  error: ErrorTypes;
}

export interface ErrorTypes {
  verifySize: string;
  verifyDuplicateFile: string;
  verifyType: string;
}

export interface ErrorToast {
  title: string;
  message: string;
  type: string;
}
