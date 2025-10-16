import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import LoadingScreen from '../utils/loading/LoadingScreen';

const AuthGuard = () => {
    const { user, status } = useSelector(state => state.auth);

    if (status === "loading" || status === "idle") {
        return <LoadingScreen />
    }

    if (status === "failed" || !user) {
        return <Navigate to="/account" replace />
    }

    if (user && !user.isVerified) {
        return <Navigate to="/account/verify" replace />
    }

    return <Outlet />
}

export default AuthGuard