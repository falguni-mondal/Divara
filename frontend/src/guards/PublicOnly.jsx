import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingScreen from '../utils/loading/LoadingScreen';

const PublicOnly = () => {

    const { user, status } = useSelector(state => state.auth);

    if (status === "loading" || status === "idle") {
        return <LoadingScreen />
    }

    if (user) {
        if (user.isVerified) return <Navigate to="/profile" replace />
        else return <Navigate to="/account/verify" replace />
    }

    return <Outlet />
}

export default PublicOnly