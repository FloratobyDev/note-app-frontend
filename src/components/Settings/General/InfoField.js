import React, { useState } from 'react'
import { useUpdateUserInfoMutation } from '../../../store'
const InfoField = ({ dataType, dataValue, className }) => {

    const [show, setShow] = useState(false)
    const placeholder = `Type your ${dataType.toLowerCase()}...`

    const [updateUserInfo, { isSuccess, isLoading, isError }] = useUpdateUserInfoMutation()

    const [data, setData] = useState({
        dataType: dataType,
        dataValue: ""
    })


    const submitEditedData = event => {
        setShow(false)
        if (data.dataValue.length > 0) {
            updateUserInfo(data)
        }
    }

    // if (isSuccess && !isLoading){

    // }

    return (
        <div className='flex flex-col w-80 gap-y-1'>
            <p className='text-sm capitalize'>{dataType}</p>
            <div className=' text-xl flex justify-between gap-x-8'>
                <div className='flex w-full'>
                    {!show ? <p className=' tracking-widest capitalize font-bold text-md'>{dataValue}</p> :
                        <input onChange={event => {
                            setData({
                                ...data,
                                dataValue: event.target.value
                            })
                        }} className='w-full px-2 placeholder:text-black placeholder:text-sm font-almarai' type="text" placeholder={placeholder} />}
                </div>
                {(show && !isLoading) ?
                    <button onClick={submitEditedData} >Save</button>
                    :
                    <button onClick={() => { setShow(true) }}>Edit</button>
                }
            </div>
        </div>
    )
}

export default InfoField