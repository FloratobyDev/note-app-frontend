import React, { useState, useRef } from 'react'
import { useFetchProfileImageQuery, useUpdateProfileImageMutation } from '../../../store/apis/settingsApi';

const ImageSettings = ({ imageUrl, userData }) => {

    const [imageSrc, setImageSrc] = useState(null);
    const [fileInfo, setFileInfo] = useState(null)
    const [show, setShow] = useState(false)

    const url = `https://api.dicebear.com/5.x/adventurer-neutral/svg?seed=${userData.username}`

    const [updateProfileImage, updateProfileImageResults] = useUpdateProfileImageMutation()


    function handleFileSelect(event) {

        setShow(prev => !show)
        setFileInfo(event.target.files[0])
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            setImageSrc(e.target.result);
        }

        reader.readAsDataURL(file);
    }

    const saveImage = event => {

        updateProfileImage(fileInfo)
    }

    if (updateProfileImageResults.isSuccess && !updateProfileImageResults.isLoading) {
        setShow(false)
    }


    return (
        <div className=' flex flex-col text-center gap-y-4'>
            <img onError={() => { setImageSrc(url || '/leaf_bg.jpeg') }} className='w-44 h-44' src={imageSrc || imageUrl} alt="Selected" />
            <div className='w-full flex gap-x-4 gap-y-8 items-center'>
                <input id="file" type="file" name="image" onChange={handleFileSelect} style={{ display: 'none' }} />
                {!show ? <label className=' cursor-pointer py-2 border border-white hover:bg-white hover:text-background w-full' htmlFor="file">Select Image</label>
                    : <button onClick={saveImage} className='cursor-pointer py-2 border border-white hover:bg-white hover:text-background w-full'>{updateProfileImageResults.isLoading ? 'Loading' : 'Save'}</button>}
            </div>

        </div>
    )
}

export default ImageSettings