import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { checkAuth, emailVerifier } from "../../store/features/user/authSlice";
import LoadingScreen from "../../utils/loading/LoadingScreen";
import error from "../../assets/videos/error.webm";
import success from "../../assets/videos/success.webm";

import { FiArrowUpRight } from "react-icons/fi";


const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.auth.emailVerify);


  useEffect(() => {
    if (token) {
      dispatch(emailVerifier(token));
    }
  }, [dispatch, token]);

  if (status === "loading" || status === "idle") return <LoadingScreen />;


  if (status === "failed"){
    return(
      <div className="w-[100vw] h-[100dvh] flex flex-col justify-center items-center">
        <video className="w-[9rem] aspect-square" src={error} muted autoPlay />
        <Link to="/" className="flex items-center gap-0.5 px-7 h-[3rem] noir-black rounded-[3px] text-[0.8rem] font-semibold">
          <span>Home</span>
          <FiArrowUpRight  className="font-[1.1rem]"/>
        </Link>
      </div>
    )
  }

  if (status === "success"){
    dispatch(checkAuth());
    return(
      <div className="w-[100vw] h-[100dvh] flex flex-col justify-center items-center">
        <video className="w-[9rem] aspect-square" src={success} muted autoPlay />
        <Link to="/account" className="flex items-center gap-0.5 px-7 h-[3rem] noir-black rounded-[3px] text-[0.8rem] font-semibold">
          <span>Continue</span>
          <FiArrowUpRight  className="font-[1.1rem]"/>
        </Link>
      </div>
    )
  }

  return null;
};

export default VerifyEmail;
