import React, { useEffect } from 'react'
import { useFetchAchievementsQuery } from '../store'

const Achievements = () => {
  const { data, error, isError, isLoading, isSuccess, refetch } = useFetchAchievementsQuery()

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isLoading) return <p>Loading</p>

  return (
    <div>
      {isSuccess ? <div>
        <p>
          You have {data?.streak} day/s streak!
        </p>
        <div>
          {data?.categoricalAchievements.length > 0 ? Object.keys(data?.categoricalAchievements).map((key) => {
            return <div key={key}>

              <p className='capitalize'>{key} : {data?.categoricalAchievements[key]} <span>
                tasks finished overtime
              </span>
              </p>
            </div>
          }) : <p>No achievements yet</p>}
        </div>
      </div>
        :
        <p>No data</p>
      }
    </div>
  )
}

export default Achievements