import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import LoadingScreen from '../utils/loading/LoadingScreen';

const PublicOnly = () => {

    const { user, status } = useSelector(state => state.auth);

    if (status === "loading" || status === "idle") {
        return <LoadingScreen />
    }

    if(status === "success" && user && !user.isVerified) return <Navigate to="/user/verify" replace />

    if(status === "success" && user && user.isVerified && user.role === "user") return <Navigate to="/profile" replace />

    if(status === "success" && user && user.isVerified && (user.role === "admin" || user.role === "super-admin")) return <Navigate to="/admin" replace />

    return <Outlet />
}

export default PublicOnly