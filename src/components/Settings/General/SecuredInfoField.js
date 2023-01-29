import React, { useState } from 'react'
import { useUpdateSecureUserInfoMutation } from '../../../store'

const SecuredInfoField = ({ dataType }) => {

    const [show, setShow] = useState(false)

    const [updateSecureUserInfo, { isLoading }] = useUpdateSecureUserInfoMutation()


    const [data, setData] = useState({
        currentPassword: "",
        newPassword: ""
    })

    const submitEditedData = event => {
        setShow(false)

        if (data.currentPassword.length > 0 && data.newPassword.length > 0) {
            updateSecureUserInfo(data)
        }
    }

    const handleChange = event => {
        setData({
            ...data,
            [event.target.id]: event.target.value
        })
    }

    return (
        <div className='flex flex-col w-80 gap-y-4'>
            <p className='text-sm'>{dataType}</p>
            <div className=' text-xl flex justify-between items-start gap-x-8'>
                {!show ?
                    <p className=' tracking-widest'>********</p>
                    :
                    <div className='flex flex-col'>
                        <label className='my-2 text-sm' htmlFor="cpass">Current Password</label>
                        <input onChange={handleChange} id='currentPassword' type="password" />
                        <label className='my-2 text-sm' htmlFor="npass">New Password</label>
                        <input onChange={handleChange} id='newPassword' type="password" />
                    </div>
                }
                {(show && !isLoading) ?
                    <button onClick={submitEditedData} >Save</button>
                    :
                    <button onClick={() => { setShow(true) }}>Edit</button>
                }
            </div>
        </div>
    )
}

export default SecuredInfoField