import { useTranslation } from "react-i18next";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import ToastDemo from "components/Toast/Toast.demo";
import UploadFileDemo from "components/UploadFile/UploadFile.demo";
import UploadDemo from "components/UploadFileBasic/Upload..demo";

const Login = () => {
  // const { error, loading } = useSelector((state: AppState) => state.auth);
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const { t } = useTranslation();

  // const onSubmit = ({ email, password }) => {
  //   dispatch(doLogin({ email, password }))
  //     .unwrap()
  //     .then(() => {
  //       navigate(PATH.HOME);
  //     });
  // };

  return (
    <AuthLayout>
      <div className='login'>
        <ToastDemo />
        <UploadFileDemo />
        <UploadDemo />
        <p className='text-red-400'>{t("login-layout")}</p>
      </div>
    </AuthLayout>
  );
};
export default Login;
