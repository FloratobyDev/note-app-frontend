import React, { useState } from 'react'
import InfoField from './InfoField'
import SecuredInfoField from './SecuredInfoField'


const InfoSettings = ({ infoData }) => {

    

    return (
        <div className='w-full flex flex-col gap-y-6'>
            <InfoField dataType={'username'} dataValue={infoData.username} />
            <InfoField dataType={'email'} dataValue={infoData.email} />
            <SecuredInfoField dataType={'Password'} />
            {/* <InfoField dataType={'Password'} dataValue/> */}
        </div>
    )
}

export default InfoSettings