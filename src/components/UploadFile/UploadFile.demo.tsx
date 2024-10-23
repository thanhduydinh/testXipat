import UploadFile from "./UploadFile";

function UploadFileDemo() {
  return (
    <UploadFile
      isMulti={false}
      handleUpload={() => {}}
      byteMax={5000000}
      isCorrectType={1}
      //   fileList= [
      // {
      //   code: null,
      // name: '1200px-Image_created_with_a_mobile_phone.png',
      // size: 1594447,
      // type: 'image/png',
      // fileUrl:
      // 'https://i.pinimg.com/originals/45/c2/cf/45c2cf13c0ebacc6e7c98d470c0bb4f9.jpg',
      //   }
      // ]
    />
  );
}

export default UploadFileDemo;
