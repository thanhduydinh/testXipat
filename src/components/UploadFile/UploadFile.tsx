import { useReducer, useEffect, useMemo, memo, Reducer } from "react";
import ListFile from "./ListFile/ListFile";
import Upload from "./Upload/Upload";
import UploadFileContext from "./store/UploadFile.context";
import { uploadFileReducer } from "./store/UploadFile.reducer";
import { StateType, Action, FileDefault } from "./UploadFile.interfaces";
import "./UploadFile.scss";

type Props = {
  isMulti?: boolean;
  handleUpload(data: StateType): void;
  accept?: string;
  byteMax?: number;
  fileList?: FileDefault[];
  isCorrectType?: 0 | 1 | 2;
  // 0: not check type,  1: success,  2:invalid
};

const UploadFile = ({ isMulti, handleUpload, byteMax, accept, fileList, isCorrectType }: Props) => {
  const initialState = {
    files: fileList || [],
    error: {
      verifySize: "",
      verifyDuplicateFile: "",
      verifyType: ""
    }
  };

  const [state, dispatch] = useReducer<Reducer<StateType, Action>>(uploadFileReducer, initialState);

  const providerState = useMemo(() => {
    return {
      state,
      dispatch
    };
  }, [state, dispatch]);

  useEffect(() => {
    handleUpload(state);
  }, [handleUpload, state]);

  return (
    <UploadFileContext.Provider value={providerState}>
      <div className='sdk-upload-multi'>
        <Upload
          byteMax={byteMax as number}
          accept={accept as string}
          isMulti={isMulti as boolean}
          fileList={fileList as FileDefault[]}
          isCorrectType={isCorrectType as number}
        />
        {isMulti && <ListFile />}
      </div>
    </UploadFileContext.Provider>
  );
};

UploadFile.defaultProps = {
  isMulti: false,
  accept: ".png, .jpg",
  byteMax: 5242880,
  fileList: [] as FileDefault[],
  isCorrectType: 0
};

export default memo(UploadFile);
