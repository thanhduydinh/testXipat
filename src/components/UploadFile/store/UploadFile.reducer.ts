import * as types from "./UploadFile.constants";
import { StateType, Action, FileDefault } from "../UploadFile.interfaces";
import { formatNameFile } from "../utils";

export const uploadFileReducer = (state: StateType, action: Action) => {
  let finalFile: File[];
  switch (action.type) {
    case types.SELECT_SINGLE_FILE:
      return {
        ...state,
        files: action.payload as File[] | FileList
      };

    case types.SELECT_FILE_ERROR_SIZE:
      state.error.verifySize = action.payload as string;
      return {
        ...state
      };
    case types.SELECT_FILE_ERROR_TYPE:
      state.error.verifyType = action.payload as string;
      return {
        ...state
      };

    case types.SELECT_MULTI_FILE:
      finalFile = [...(state.files as File[])];
      Array.from(action.payload as File[]).forEach((item: File) => {
        if (
          Array.from(state.files as File[]).some((obj: File) => {
            const isCheck = obj.size === item.size && formatNameFile(obj) === formatNameFile(item);
            return isCheck;
          })
        ) {
          state.error.verifyDuplicateFile = "Duplicate file";
          return;
        }
        finalFile.push(item);
      });

      return {
        ...state,
        files: [...(finalFile as File[])]
      };

    case types.DELETE_MULTI_FILE:
      return {
        ...state,
        files: (state.files as File[]).filter((_, index) => {
          return index !== action.payload;
        })
      };

    case types.DELETE_SINGLE_FILE:
      return {
        ...state,
        files: []
      };

    case types.REFRESH_ERROR:
      return {
        ...state,
        error: {
          verifySize: "",
          verifyDuplicateFile: "",
          verifyType: ""
        }
      };

    case types.SET_FILE_LIST:
      return {
        ...state,
        files: action.payload as FileDefault[]
      };

    default:
      return state;
  }
};
