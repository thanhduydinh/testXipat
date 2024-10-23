import SPIN from "../../assets/images/Spin.gif";
import "./Loading.scss";

export default function Loading() {
  return (
    <div className='loading-wrapper'>
      <div className='loading-wrapper__content'>
        <img src={SPIN} alt='loading icon' width={100} />
      </div>
    </div>
  );
}
