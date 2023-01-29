import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, Link } from 'react-router-dom'

/**
 * Settings 
 *  User Information 
 *  Appearance
 * 
 *
 */

const Settings = () => {

  const navigate = useNavigate()
  const [clickedLink, setClickedLink] = useState(0)

  const links = ['general', 'appearance']

  const renderedLinks = links.map((link, idx) => {
    if (idx === clickedLink) return <Link to={`/settings/${link}`} onClick={() => { setClickedLink(idx) }} style={{ backgroundColor: 'white' }} id={idx} className=' text-background text-lg p-5 px-8 capitalize' >{link}</Link>
    return <Link to={`/settings/${link}`} onClick={() => { setClickedLink(idx) }} id={idx} className='hover:text-background hover:bg-white bg-background text-lg p-5 px-8 capitalize' >{link}</Link>
  })

  return (
    <div className='flex gap-x-8'>
      <div className=' flex flex-col gap-2 text-center'>
        {renderedLinks}
      </div>
      <div className='flex px-12 w-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default Settings