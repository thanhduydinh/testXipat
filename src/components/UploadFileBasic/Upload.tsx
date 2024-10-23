import { ChangeEvent, DragEvent, memo, useCallback, useEffect, useRef, useState } from "react";
import "./Upload.scss";
import UploadItem from "./UploadItem";
import useIgnoreFirst from "hooks/useIgnoreFirst";
import ImageIcon from "assets/icons/Image";

export type IFileModel = {
  url: string;
  path: string;
  file_name: string;
};

export type FileType = string | File;
type UploadProps = {
  isMulti?: boolean;
  accept?: string;
  byteMax?: number;
  titleUpload?: string;
  textUpload?: string;
  className?: string;
  fileDefault?: string[] | null;
  onAutoUpload?: (result: IFileModel) => void;
  onChange?(data: FileType[], error: string): void;
};

export const isStringType = (data: FileType) => {
  return typeof data === "string";
};

const acceptDefault = ".png, .jpg, .gif, .jepg";
export const aKB = 1024;

const Upload = (props: UploadProps) => {
  const {
    isMulti = false,
    accept = acceptDefault,
    byteMax = 10 * 1024 * aKB,
    titleUpload = "",
    textUpload = "Select an image to upload",
    fileDefault = [],
    onChange
  } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [isAddDrag, setIsAddDrag] = useState(false);
  const [inputFile, setInputFile] = useState("");
  const [files, setFiles] = useState<FileType[]>([]);
  const [error, setError] = useState("");

  useIgnoreFirst(() => {
    onChange?.(files, error);
  }, [files, error]);

  useEffect(() => {
    if (fileDefault?.length) {
      setFiles(fileDefault);
    }
  }, [fileDefault]);

  const validateSize = (file: File) => {
    if (file.size < byteMax) {
      return file;
    }
    setError("Over size");
    return undefined;
  };

  const validateType = (file: File) => {
    const fileType = file.name.split(".").pop()?.toLocaleLowerCase();
    if (accept.includes(fileType as string)) {
      return file;
    }
    setError("File is not correct type");
    return undefined;
  };

  const handleDelete = useCallback(
    (dataDelete: FileType) => {
      const finalData = files.filter(item => {
        if (isStringType(item)) {
          return item !== dataDelete;
        } else return (item as File).lastModified !== (dataDelete as File).lastModified;
      });
      setFiles(finalData);
    },
    [files]
  );

  const handleUpload = (data: File[]) => {
    const listFile: File[] = [];
    for (let i = 0; i < data.length; i += 1) {
      const fileSize = validateSize(data[i]);
      const fileType = validateType(data[i]);
      if (fileSize && fileType) {
        listFile.push(fileSize);
      }
    }

    const { uniqueFiles } = filterDataDuplicate(files, listFile);
    setFiles(uniqueFiles);
  };

  const filterDataDuplicate = (data: FileType[], fileAdd: File[]) => {
    const uniqueFiles: FileType[] = [...data];
    const newFiles: File[] = [];

    fileAdd.forEach(item => {
      if (isStringType(item)) {
        uniqueFiles.push(item);
      } else {
        const isDuplicate = data.some(
          dataItem => (dataItem as File).lastModified === item.lastModified
        );
        if (!isDuplicate) {
          uniqueFiles.push(item);
          newFiles.push(item);
        } else {
          setError("Duplicate file");
        }
      }
    });

    return { uniqueFiles, newFiles };
  };

  const onChooseFile = (event: ChangeEvent<HTMLInputElement>) => {
    const listFile = event.target.files;
    setInputFile("");
    if (listFile === null) {
      return;
    }
    handleUpload(listFile as unknown as File[]);
  };

  // check have type file(pdf, xml)
  const isAcceptImage = useCallback(() => {
    const acceptArr = accept.split(" ");
    const isFile = acceptArr.some(item => {
      return !acceptDefault.includes(item);
    });

    return !isFile;
  }, [accept]);

  // handle drag drop file
  const dragHandler = (event: DragEvent<HTMLDivElement>, addImage = false) => {
    event.preventDefault();
    addImage ? setIsAddDrag(true) : setIsDrag(true);
  };

  const dragLeaveHandler = (event: DragEvent<HTMLDivElement>, addImage = false) => {
    event.preventDefault();
    addImage ? setIsAddDrag(false) : setIsDrag(false);
  };

  const dropHandler = (event: DragEvent<HTMLDivElement>, addImage = false) => {
    event.preventDefault();
    addImage ? setIsAddDrag(false) : setIsDrag(false);
    const listFile: File[] = [];

    for (let i = 0; i < event.dataTransfer.items.length; i += 1) {
      const file = event.dataTransfer.items[i].getAsFile();
      if (file) {
        listFile.push(file);
      }
    }
    handleUpload(isMulti ? listFile : [listFile[0]]);
  };

  const uploadDefault = (
    <div
      className='d-flex flex-column align-items-center cursor-pointer'
      onDragOver={dragHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
      onClick={event => {
        event.preventDefault();
        fileInputRef.current?.click();
      }}
    >
      <ImageIcon />
      <h4 className='mb-4 text-primary'>{textUpload}</h4>
      <p>OR</p>
      <p>Drag and drop your image</p>
    </div>
  );

  return (
    <div className='mb-3'>
      <h6>{titleUpload}</h6>
      <div
        className={`upload overflow-x-auto overflow-y-hidden border-primary border-dashed rounded border h-200px pt-9 pb-4 border-radius-xl px-8
          ${isDrag && "bg-primary-subtle"}
        `}
      >
        {files.length ? (
          <div className='w-fit-content d-flex flex-nowrap'>
            {files.map((file, index) => (
              <UploadItem
                file={file}
                key={index}
                handleDelete={handleDelete}
                isAcceptImage={isAcceptImage()}
              />
            ))}

            {isMulti && (
              <div
                onDragOver={e => dragHandler(e, true)}
                onDragLeave={e => dragLeaveHandler(e, true)}
                onDrop={e => dropHandler(e, true)}
                onClick={event => {
                  event.preventDefault();
                  fileInputRef.current?.click();
                }}
                className={`upload__multi w-200px min-w-200px d-flex align-items-center justify-content-center text-primary fw-bold border-primary border-dashed rounded border fs-5 cursor-pointer ${
                  isAddDrag && "bg-primary-subtle"
                }`}
              >
                +<span>Add image</span>
              </div>
            )}
          </div>
        ) : (
          uploadDefault
        )}
      </div>

      <input
        type='file'
        multiple={isMulti}
        className='d-none'
        accept={accept}
        ref={fileInputRef}
        onChange={onChooseFile}
        value={inputFile}
      />
    </div>
  );
};

export default memo(Upload);
