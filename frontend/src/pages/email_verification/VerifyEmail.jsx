import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import { checkAuth, emailVerifier } from "../../store/features/user/authSlice";
import LoadingScreen from "../../utils/loading/LoadingScreen";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.auth.emailVerify);
  const user = useSelector((state) => state.auth.user);
  const userStatus = useSelector((state) => state.auth.status);


  useEffect(() => {
    if (token) {
      dispatch(emailVerifier(token));
    }
  }, [dispatch, token]);


  if (userStatus === "loading" || userStatus === "idle") return <LoadingScreen />;

  if (!user) return <Navigate to="/account" replace />;

  if (user?.isVerified) return <Navigate to="/profile" replace />;

  if (status === "loading" || status === "idle") return <LoadingScreen />;


  if (status === "success") {
    dispatch(checkAuth());
  }

  if (status === "failed"){
    return <Navigate to="/account/verify" replace />;
  }

  return null;
};

export default VerifyEmail;
