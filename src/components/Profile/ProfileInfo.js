import React, { useState } from 'react'
import { useUpdateUserAboutMutation } from '../../store'


//TODO : Refetching is required when level changes
const ProfileInfo = ({ refetch, imageUrl, userData, levelData }) => {

    const url = `https://api.dicebear.com/5.x/adventurer-neutral/svg?seed=${userData.username}`

    const [updateUserAbout, updateUserAboutResults] = useUpdateUserAboutMutation()

    const [imageSrc, setImageSrc] = useState(null)
    const [newAbout, setNewAbout] = useState("")
    const [showEdit, setShowEdit] = useState(false)


    const handleSubmit = event => {
        event.preventDefault()
        setShowEdit(false)

        if (newAbout.length > 0) {
            updateUserAbout(newAbout).unwrap().then(() => {
                refetch()
            })
            setNewAbout("")
        }
    }

    return (
        <div className='flex gap-x-6 w-full my-8'>
            <img onError={() => { setImageSrc(url) }} className=' h-60 w-60' src={imageSrc || imageUrl} alt="" />
            <div className='w-full'>
                <p className='text-6xl font-caesar'>{userData.username}</p>
                <p className=' font-almarai text-xl tracking-wider flex gap-x-3'>Lv. {levelData.currentLevel}
                    <span> | </span>
                    <span>{levelData.currentExperience} / {levelData.requiredExperience}</span>
                </p>

                <div className='flex flex-col w-1/2 mt-8 gap-y-2'>
                    <div className='flex gap-x-3 items-center'>
                        <p className='font-extrabold tracking-wider font-almarai text-sm'>ABOUT ME</p>
                        {(!showEdit || updateUserAboutResults.isLoading) && <button onClick={() => { setShowEdit(true) }} className='underline'>Edit</button>}
                    </div>

                    <p className='font-almarai font-normal text-md w-5/6 leading-6 tracking-wide'>{userData.about || "Write something about yourself."}</p>

                    {(showEdit || updateUserAboutResults.isLoading) &&
                        <form className='flex text-left gap-x-4' onSubmit={handleSubmit}>
                            <textarea onChange={event => { setNewAbout(event.target.value) }} className='flex-1 text-background p-2 outline-none resize-none bg-white' name="" id="" cols="30" rows="3"></textarea>
                            <button type='submit' className='border border-white px-4 hover:bg-white hover:text-background'>Submit</button>
                        </form>
                    }

                </div>
            </div>
        </div>
    )
}

export default ProfileInfo