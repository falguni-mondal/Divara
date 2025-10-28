import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';
import { emailUpdater } from '../../../store/features/user/profileSlice';
import LoadingScreen from '../../../utils/loading/LoadingScreen';

const UpdatedEmailVerify = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const dispatch = useDispatch();

    const { status } = useSelector((state) => state.profile.emailUpdate);


    useEffect(() => {
        if (token) {
            dispatch(emailUpdater(token));
        }
    }, [dispatch, token]);


    if (status === "loading" || status === "idle") return <LoadingScreen />;

    else
        return <Navigate to="/profile/update" replace />;
}

export default UpdatedEmailVerify
