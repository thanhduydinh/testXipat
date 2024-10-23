import { memo } from "react";
import FileItem from "../FileItem/FileItem";
import { useCustomContext } from "../store/UploadFile.context";
import { formatNameFile } from "../utils";
import "./ListFile.scss";

const ListFile = () => {
  const { state } = useCustomContext();

  if (state.files.length > 0) {
    return (
      <div className='sdk-list-file'>
        {(state.files as File[]).map((file, index) => (
          <FileItem file={file} key={formatNameFile(file)} index={index} />
        ))}
      </div>
    );
  }
  return null;
};

export default memo(ListFile);
