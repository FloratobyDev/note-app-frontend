import React from 'react'
import CategoryCard from './CategoryCard'
import StreakCard from './StreakCard'

const AchievementInfo = ({ byCategory, byStreak }) => {




    return (
        <div className='flex flex-col gap-y-6'>
            <div>
                <p className=' font-caesar text-4xl mb-2'>Categorical Achievements</p>
                {/* <p className=' indent-4 font-almarai text-sm'>A list of categories that contains a value the amount of tasks finished</p> */}
                <div className='grid grid-cols-3 gap-3 mt-6'>
                    {byCategory?.categoricalAchievements ? byCategory.categoricalAchievements && Object.keys(byCategory.categoricalAchievements).map((category) => {
                        return <CategoryCard categoryType={category} categoryValue={byCategory.categoricalAchievements[category]} />
                    }) : <p className=' font-almarai text-xl m-4'>No achievements yet</p>}
                </div>
            </div>

            <div>
                <div>
                    <p className=' font-caesar text-4xl mb-2'>Streak Achievements</p>
                    {/* <p className=' indent-4 font-almarai text-sm'>A list of categories that contains a value the amount of tasks finished</p> */}
                    <div className='grid grid-cols-3 gap-3 mt-6'>
                        {Object.keys(byStreak).length > 0 ?
                            byStreak.map(streakInfo => {
                                return <StreakCard data={streakInfo} />
                            }) : <p className=' font-almarai text-xl m-4'>No streak yet</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AchievementInfo