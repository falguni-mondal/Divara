import { Route, Routes } from 'react-router-dom'
import BaseProfile from '../components/profile/BaseProfile'
import EditProfile from '../components/profile/edit/EditProfile'
import UpdatedEmailVerify from '../components/profile/edit/UpdatedEmailVerify'

const ProfileRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<BaseProfile />}/>
            <Route path='/update' element={<EditProfile />}/>
            <Route path='/update/email/token' element={<UpdatedEmailVerify />}/>
        </Routes>
    )
}

export default ProfileRouter