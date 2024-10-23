import UploadFile from "./Upload";

function UploadDemo() {
  return <UploadFile isMulti={true} onChange={data => data} />;
}

export default UploadDemo;
