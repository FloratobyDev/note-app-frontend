import React, { useState } from 'react'

import { useAddAchievementInfoMutation, useAuthenticateAdminQuery } from '../store'
import { Link } from 'react-router-dom'

const AchievementInfo = () => {

    const { error, isError, isLoading } = useAuthenticateAdminQuery()
    const [addAchievementInfo, addAchievementInfoResults] = useAddAchievementInfoMutation()
    const [acInfoData, setAcInfoData] = useState({
        streakRequired: 0,
        achievementTitle: '',
        quote: '',
        streakDescription: ''
    })

    if (isLoading) return <p>Authenticating...</p>

    if (isError) return <div>
        <p>{error.data}</p>
        <Link to='/login'>Return to login</Link>
    </div>

    const handleSubmit = event => {
        event.preventDefault()
        if (acInfoData.achievementTitle.length > 0) {
            addAchievementInfo(acInfoData)
            setAcInfoData({
                streakRequired: 0,
                achievementTitle: '',
                quote: '',
                streakDescription: ''
            })
        }
    }

    const handleAchievementInfoData = event => {
        setAcInfoData({
            ...acInfoData,
            [event.target.id]: event.target.value
        })
    }

    return (
        <div className='flex'>
            <form className='flex flex-col w-1/2 mx-auto p-11 gap-y-8 border border-black m-10' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-x-2 gap-y-2'>
                    <label className='' htmlFor="streakRequired">Streak Required</label>
                    <input id='streakRequired' onChange={handleAchievementInfoData} value={acInfoData.streakRequired} className='border border-black' type="number" />
                </div>
                <div className='flex flex-col gap-x-2 gap-y-2'>
                    <label className=' ' htmlFor="achievementTitle">Achievement Title</label>
                    <input id='achievementTitle' onChange={handleAchievementInfoData} value={acInfoData.achievementTitle} className='border border-black' type="text" />
                </div>
                <div className='flex flex-col gap-x-2 gap-y-2'>
                    <label className=' ' htmlFor="quote">Quote</label>
                    <input id='quote' onChange={handleAchievementInfoData} value={acInfoData.quote} className='border border-black' type="text" />
                </div>
                <div className='flex flex-col gap-x-2 gap-y-2'>
                    <label className=' ' htmlFor="streakDescription">Streak Description</label>
                    <input id='streakDescription' onChange={handleAchievementInfoData} value={acInfoData.streakDescription} className='border border-black' type="text" />
                </div>
                <button type="submit">Add achievement</button>
            </form>
        </div>
    )
}

export default AchievementInfo