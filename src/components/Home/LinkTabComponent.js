import React from 'react'
import { Link } from 'react-router-dom'

const LinkTabComponent = ({ name, to, icon }) => {

    const path = `/${to}`
    return (
        <Link className=" bg-background p-2 hover:bg-white hover:text-background w-44" to={path}>
            <button className='h-10 w-full flex items-center justify-center gap-x-2 font-adventpro tracking-widest'><span className='text-xl'>{icon}</span> {name}</button>
        </Link>
    )
}

export default LinkTabComponent