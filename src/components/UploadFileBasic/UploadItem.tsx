import { memo, useEffect, useState } from "react";
import { FileType, aKB, isStringType } from "./Upload";
import "./Upload.scss";

type CircularProgressBarProps = {
  customClass?: string;
  progress?: number;
};

type UploadItemProps = {
  file: FileType;
  progress?: number;
  isAcceptImage?: boolean;
  handleDelete: (data: FileType) => void;
};

const UploadItem = ({ progress = 100, file, isAcceptImage, handleDelete }: UploadItemProps) => {
  const [preview, setPreview] = useState<string>();
  const { size, name } = file as File;
  const isShowProgress = progress > 0 && progress < 100;

  useEffect(() => {
    if (isStringType(file)) {
      setPreview(file as string);
    } else {
      showPreview(file as File);
    }
  }, [file]);

  const showPreview = (image: File) => {
    const render = new FileReader();
    render.onloadend = () => {
      setPreview(render.result as string);
    };
    render.readAsDataURL(image);
  };

  const onDeleteFile = () => {
    setPreview(undefined);
    handleDelete(file);
  };

  const getFileSize = (size: number) => {
    const countKb = size / aKB;
    if (countKb < 1024) return Math.round(countKb).toFixed(2) + " KB";
    else return Math.round(countKb / 1024).toFixed(2) + " MB";
  };

  const uploadProgress = isShowProgress ? (
    <CircularProgressBar
      progress={progress}
      customClass='upload__progress position-absolute z-3 top-50 end-50'
    />
  ) : (
    <span onClick={onDeleteFile}>X</span>
  );

  return (
    <div
      className={`"me-4 position-relative
        ${isShowProgress && "upload__opacity w-fit-content"}
      `}
    >
      {isAcceptImage ? (
        <img className='rounded z-1' src={preview} alt='preview upload' width={200} height={140} />
      ) : (
        <div className='w-200px d-flex flex-column align-items-center justify-content-center bg-light h-140px rounded'>
          <h5>{getFileSize(size)}</h5>
          <p className='upload__file-name px-4 mw-100' title={name}>
            {name}
          </p>
        </div>
      )}
      {uploadProgress}
    </div>
  );
};

const CircularProgressBar = ({ progress = 80, customClass }: CircularProgressBarProps) => {
  const sqSize = 100;
  const strokeWidth = 5;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * progress) / 100;

  return (
    <svg
      width={sqSize}
      height={sqSize}
      className={`circle-background ${customClass}`}
      viewBox={viewBox}
    >
      <circle cx={sqSize / 2} cy={sqSize / 2} r={radius} strokeWidth={`${strokeWidth}px`} />
      <circle
        className='circle-progress'
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset
        }}
      />
    </svg>
  );
};

export default memo(UploadItem);
