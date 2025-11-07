import { useSelector } from 'react-redux';

const DashboardHeader = () => {
  const user = useSelector(state => state.auth.user);

    return (
        <div className='mb-10 flex justify-between items-center' id="dashboard-header">
            <div className="heading-txt text-[#1a1a1a]">
                <span className='font-medium leading-none'>Hello,</span>
                <h1 className='text-2xl font-semibold leading-none tracking-tight'>{user.name}!</h1>
            </div>
            <div className={`display-picture ${!user.profileImage && "user-dp-container"} rounded-full w-[4rem] aspect-square overflow-hidden relative`}>
                <img className={`${!user.profileImage && "user-dp-bg"} w-full h-full object-cover`} src={user.profileImage || user.profileBackground} alt="" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-[#fefefe] text-2xl mix-blend-difference">
                    {user.name[0]}
                </span>
            </div>
        </div>
    )
}

export default DashboardHeader
