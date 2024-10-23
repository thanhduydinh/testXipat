import { useState, useEffect, memo } from "react";
import { useCustomContext } from "../store/UploadFile.context";
import DeleteIcon from "../../../assets/icons/Delete";
import FileIcon from "../../../assets/icons/FileIcon";
import { checkIsImage, formatSizeFile } from "../utils";
import { FileDefault } from "../UploadFile.interfaces";
import * as types from "../store/UploadFile.constants";
import "./FileItem.scss";

type Props = {
  file: File | FileDefault;
  index: number;
};

const FileItem = ({ file, index }: Props) => {
  const [preview, setPreview] = useState<string>("");
  const { dispatch } = useCustomContext();

  useEffect(() => {
    if (checkIsImage(file)) {
      const temp = Object.keys(file).find(name => name === "fileUrl");
      if (file && !temp) {
        const render = new FileReader();
        render.onloadend = () => {
          setPreview(render.result as string);
        };
        render.readAsDataURL(file as File);
        return;
      }
      setPreview((file as FileDefault).fileUrl);
      return;
    }
    setPreview("");
  }, [file]);

  const onDeleteFile = () => {
    dispatch({
      type: types.DELETE_MULTI_FILE,
      payload: index
    });
  };

  return (
    <div className='sdk-file-item'>
      <div className='sdk-file-item__left'>
        {preview ? <img src={preview} alt='img title' /> : <FileIcon />}
      </div>
      <div className='sdk-file-item__information'>
        <div>
          <div className='sdk-file-item__title'>
            <p className='sdk-file-item__name'>{file.name}</p>
          </div>
          <p className='sdk-file-item__size'>{formatSizeFile(file.size, 2)}</p>
        </div>
        <DeleteIcon color='#A3A3A3' className='sdk-file-item__btn' handleDelete={onDeleteFile} />
      </div>
    </div>
  );
};

export default memo(FileItem);
