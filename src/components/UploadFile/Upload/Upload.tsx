import { useRef, useState, useEffect, ChangeEvent, DragEvent, memo } from "react";
import ImageUpload from "../../../assets/icons/ImageUpload";
import { useCustomContext } from "../store/UploadFile.context";
import DeleteIcon from "../../../assets/icons/Delete";
import ImageIcon from "../../../assets/icons/Image";
import SuccessIcon from "../../../assets/icons/Success";
import InvalidIcon from "../../../assets/icons/Invalid";
import { FileDefault } from "../UploadFile.interfaces";
import * as types from "../store/UploadFile.constants";
import "./Upload.scss";
import { formatSizeFile } from "../utils";

type Props = {
  isMulti: boolean;
  accept: string;
  byteMax: number;
  fileList: FileDefault[];
  isCorrectType: number;
};

const WHITE_100 = "#FFFFFF";

const Upload = ({ isMulti, accept, byteMax, fileList, isCorrectType }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string>();
  const [inputFile, setInputFile] = useState("");
  const [isDrag, setIsDrag] = useState(false);
  const { dispatch } = useCustomContext();

  const showPreview = (image: File) => {
    const render = new FileReader();
    render.onloadend = () => {
      setPreview(render.result as string);
    };
    render.readAsDataURL(image);
  };

  useEffect(() => {
    if (fileList) {
      setPreview(fileList[0]?.fileUrl);
      dispatch({
        type: types.SET_FILE_LIST,
        payload: fileList
      });
    }
  }, [dispatch, fileList]);

  const validateSize = (file: File) => {
    if (file.size < byteMax) {
      return file;
    }
    dispatch({
      type: types.SELECT_FILE_ERROR_SIZE,
      payload: "Over size"
    });
    return undefined;
  };

  const validateType = (file: File) => {
    const fileType = file.name.split(".").pop()?.toLocaleLowerCase();
    if (accept.includes(fileType as string)) {
      return file;
    }
    dispatch({
      type: types.SELECT_FILE_ERROR_TYPE,
      payload: "File is not correct type"
    });
    return undefined;
  };

  const handleSingleFile = (file: File[] | FileList) => {
    const fileSize = validateSize(file[0]);
    const fileType = validateType(file[0]);
    if (fileSize === undefined || fileType === undefined) {
      return;
    }
    showPreview(fileSize);
    dispatch({
      type: types.SELECT_SINGLE_FILE,
      payload: [fileSize]
    });
  };

  const handleMultiFile = (files: File[] | FileList) => {
    const listFile: File[] = [];
    for (let i = 0; i < files.length; i += 1) {
      const fileSize = validateSize(files[i]);
      const fileType = validateType(files[i]);
      if (fileSize && fileType) {
        listFile.push(fileSize);
      }
    }
    dispatch({ type: types.SELECT_MULTI_FILE, payload: listFile });
  };

  const onChooseFile = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: types.REFRESH_ERROR, payload: "" });
    const file = event.target.files;
    if (file === null) {
      return;
    }

    if (isMulti) {
      handleMultiFile(file);
    } else {
      handleSingleFile(file);
    }
    setInputFile("");
  };

  const onDeleteFile = () => {
    dispatch({
      type: types.DELETE_SINGLE_FILE,
      payload: []
    });
    setPreview(undefined);
  };

  // handle drag drop file
  const dragHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDrag(true);
  };

  const dragLeaveHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDrag(false);
  };

  const dropHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDrag(false);
    dispatch({ type: types.REFRESH_ERROR, payload: "" });
    if (isMulti) {
      const listFile: File[] = [];
      for (let i = 0; i < event.dataTransfer.items.length; i += 1) {
        const file = event.dataTransfer.items[i].getAsFile();
        if (file) {
          listFile.push(file);
        }
      }
      handleMultiFile(listFile);
    } else {
      const file = event.dataTransfer.items[0].getAsFile();
      if (file) {
        handleSingleFile([file]);
      }
    }
  };

  const inputUpload = (
    <input
      type='file'
      multiple={isMulti}
      accept={accept}
      ref={fileInputRef}
      onChange={onChooseFile}
      value={inputFile}
    />
  );

  return (
    <div
      className='sdk-upload'
      onDragOver={dragHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
    >
      {preview && !isMulti ? (
        <div className='sdk-preview-file'>
          <img src={preview} alt='preview upload' />
          <div className={`sdk-preview-file__main ${isCorrectType !== 0 ? "sdk-notify-type" : ""}`}>
            <div className='sdk-preview-file__header'>
              <div className='sdk-preview-file__delete'>
                <DeleteIcon color={WHITE_100} handleDelete={onDeleteFile} />
              </div>
              <div className='sdk-preview-file__upload'>
                <ImageIcon
                  handleClick={() => {
                    fileInputRef.current?.click();
                  }}
                />
                {inputUpload}
              </div>
            </div>
            <div>
              {isCorrectType === 1 && (
                <div className='sdk-preview-file__content'>
                  <SuccessIcon />
                  <p>Success</p>
                </div>
              )}
              {isCorrectType === 2 && (
                <div className='sdk-preview-file__content'>
                  <InvalidIcon />
                  <p>Invalid</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={`sdk-upload-file ${isDrag ? "sdk-isDrag" : ""}`}>
          <ImageUpload />
          <div className='sdk-upload-file__format'>
            <span>Format image: {accept.replaceAll(".", "")}</span>
            <span>Maximum size {formatSizeFile(byteMax, 0)}.</span>
          </div>
          <button
            type='button'
            onClick={event => {
              event.preventDefault();
              fileInputRef.current?.click();
            }}
            className='sdk-upload__btn'
          >
            Upload file
          </button>
          {inputUpload}
        </div>
      )}
    </div>
  );
};

export default memo(Upload);
