import React from 'react'

const StreakCard = ({ data }) => {
    return (
        <div className='flex gap-x-4 bg-white text-background p-4'>
            <img className='w-20 h-20' src="logo192.png" alt="" />
            <div>
                <p className=' text-lg font-almarai font-bold'>{data.achievementTitle}</p>
                <p className='text-sm font-almarai'>{data.streakDescription}</p>
            </div>
        </div>
    )
}

export default StreakCard