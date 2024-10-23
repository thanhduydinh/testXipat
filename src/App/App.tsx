import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
// import { ToastProvider } from "components/Toast";
// import { useAppDispatch } from "store";
import Loading from "../components/Loading/Loading";
import Routes from "../router";

const App = () => {
  // const dispatch = useAppDispatch();
  // const { isLoginSuccess } = useSelector((state: AppState) => state.auth);

  // useEffect(() => {
  //   dispatch(doGetProfile());
  // }, [dispatch, isLoginSuccess]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        {/* <ToastProvider> */}
        <Routes />
        {/* </ToastProvider> */}
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
