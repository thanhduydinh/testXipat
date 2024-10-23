import { BYTE } from "./constant";
import { FileDefault } from "./UploadFile.interfaces";

export function formatToSlug(link: string) {
  let str = link.toLowerCase();
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
  str = str.replace(/(đ)/g, "d");

  str = str.replace(/([^0-9a-z-\s])/g, "");

  str = str.replace(/(\s+)/g, "-");

  str = str.replace(/^-+/g, "");

  str = str.replace(/-+$/g, "");

  return str;
}

/**
 * return name + size of file
 */
export const formatNameFile = (file: File | FileDefault) => {
  return `${formatToSlug(file.name)} + ${file.size}`;
};

/**
 * return true if file is image
 */
export const checkIsImage = (file: File | FileDefault) => {
  if (file.type.includes("png") || file.type.includes("jpeg") || file.type.includes("jpg")) {
    return true;
  }
  return false;
};

/**
 * return size of file
 */
export const formatSizeFile = (bytes: number, toFixed: number): string => {
  if (bytes >= BYTE.MB) {
    return `${(bytes / BYTE.MB).toFixed(toFixed)}MB`;
  }
  return `${(bytes / BYTE.KB).toFixed(toFixed)}KB`;
};
