import React, { useState } from 'react'
import { useRemoveAccountMutation } from '../../../store'
import { useNavigate } from 'react-router-dom'

const DeleteAccount = () => {

    const [removeAccount, { isSuccess, error, isError }] = useRemoveAccountMutation()
    const navigate = useNavigate()
    const [remove, setRemove] = useState("")

    const handleDeleteAccount = event => {
        removeAccount(remove)
    }

    if (isSuccess) {
        navigate('/login')
    }

    return (
        <div className=' flex flex-col gap-y-4 w-full bg-background px-5 py-8'>
            <p className=' font-almarai text-xl font-bold'>DELETE YOUR ACCOUNT</p>
            <div className=' px-6 flex flex-col gap-y-6'>
                <p className='w-1/2 font-almarai text-md tracking-wide'>Warning: This cannot be undone. But I’m proud of you for even finding the motivation to write down the task you’ll need to do and actually finishing it. I wish we were able to help you in some way. Thank you and gtfo, bitch. </p>
                <div className='flex flex-col gap-y-2'>
                    <div className='flex gap-x-4 w-full font-almarai text-sm'>
                        <input onChange={e => { setRemove(e.target.value) }} className='w-1/5 px-2 placeholder:text-background text-background' placeholder='Type DELETE to continue.' type="text" />
                        <button onClick={handleDeleteAccount} className='border border-white p-2 px-4 text-background font-bold bg-red-400'>Delete Account</button>
                    </div>
                    {/* <button className='border border-white px-4'>Change your mind? As it should be.</button> */}
                    {isError && <p className=' text-red-300 tracking-wider font-almarai text-sm'>{error.data}</p>}
                </div>
            </div>
        </div>
    )
}

export default DeleteAccount