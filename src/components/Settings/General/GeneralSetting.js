import React from 'react'
import DeleteAccount from './DeleteAccount'
import ImageSettings from './ImageSettings'
import InfoSettings from './InfoSettings'
import { useFetchProfileImageQuery } from '../../../store/apis/settingsApi'

const GeneralSetting = () => {

    const { data, isLoading } = useFetchProfileImageQuery()

    if (isLoading) return;

    return (
        <div className='flex flex-col w-full gap-y-4'>
            <div className='flex gap-x-8 w-full bg-background p-6'>
                <ImageSettings userData={data?.userData} imageUrl={data?.imageUrl} />
                <InfoSettings infoData={data?.userData} />
            </div>
            <DeleteAccount />
        </div>
    )
}

export default GeneralSetting