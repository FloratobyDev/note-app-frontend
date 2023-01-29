import React, { useEffect } from 'react'
import AchievementInfo from '../components/Profile/AchievementInfo'
import ProfileInfo from '../components/Profile/ProfileInfo'
import { useFetchProfileQuery } from '../store'

const Profile = () => {

  const { data, isLoading, error, isError, isFetching, refetch } = useFetchProfileQuery()
  // const { data, isLoading, isError, isSuccess } = useFetchProfileImageQuery()

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isLoading) return <p>Loading data...</p>
  if (isError) return <p>Unable to fetch data</p>

  return (
    <div className='flex flex-col my-8 pl-6'>
      <ProfileInfo refetch={refetch} imageUrl={data?.imageUrl} userData={data.userData} levelData={data.level} />
      <AchievementInfo byCategory={data.achievements} byStreak={data.achievementsAcquiredData} />
    </div>
  )
}

export default Profile