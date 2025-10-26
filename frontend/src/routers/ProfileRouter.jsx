import { Route, Routes } from 'react-router-dom'
import BaseProfile from '../components/profile/BaseProfile'
import EditProfile from '../components/profile/edit/EditProfile'

const ProfileRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<BaseProfile />}/>
            <Route path='/update' element={<EditProfile />}/>
        </Routes>
    )
}

export default ProfileRouter