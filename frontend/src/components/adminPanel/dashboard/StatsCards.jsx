import { Icon } from "@iconify/react";

const StatsCards = () => {
    const data = [
        {
            title: "total users",
            count: "13,248",
            icon: "iconamoon:profile-fill",
            bg: "bg-[#ebe7ff]",
            iconBg: "bg-[#dbd4ff]",
            iconColor: "text-[#846eff]"
        },
        {
            title: "items in bag",
            count: "61,972",
            icon: "iconamoon:shopping-bag-fill",
            bg: "bg-[#faf5ec]",
            iconBg: "bg-[#f3eccd]",
            iconColor: "text-[#74630f]"
        },
        {
            title: "items in wishlist",
            count: "13,248",
            icon: "iconamoon:heart-fill",
            bg: "bg-[#fffbeb]",
            iconBg: "bg-[#fff4c2]",
            iconColor: "text-[#c7a612]"
        },
        {
            title: "total sales",
            count: "13,248",
            icon: "iconamoon:badge-fill",
            bg: "bg-[#ecf1e6]",
            iconBg: "bg-[#e1ecd0]",
            iconColor: "text-[#527228]"
        },
    ]
    return (
        <div className='dashboard-stat-card-container w-full grid grid-cols-2 gap-4'>
            {/* {
                data.map(({ title, count, icon }) => (
                    <div className='dashboard-stat-card flex items-start justify-between rounded-lg bg-[#ecf1e6] gap-3 p-4 h-[100px]'>
                        <div className="stat-card-dets h-full flex flex-col justify-between">
                            <span className='text-2xl font-semibold'>{count}</span>
                            <span className='text-sm font-medium capitalize'>{title}</span>
                        </div>
                        <div className="stat-icon-container w-[2rem] aspect-square rounded-full bg-[#e1ecd0] flex justify-center items-center text-[#527228]">
                            <Icon icon={icon} />
                        </div>
                    </div>
                ))
            } */}
            {
                data.map(({ title, count, icon, bg, iconBg, iconColor }) => (
                    <div className={`dashboard-stat-card flex items-start justify-between rounded-lg ${bg} gap-3 p-4 h-[100px]`}>
                        <div className="stat-card-dets h-full flex flex-col justify-between">
                            <span className='text-2xl font-semibold'>{count}</span>
                            <span className='text-sm font-medium capitalize'>{title}</span>
                        </div>
                        <div className={`stat-icon-container w-[2rem] aspect-square rounded-full flex justify-center items-center ${iconBg} ${iconColor}`}>
                            <Icon icon={icon} />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default StatsCards
