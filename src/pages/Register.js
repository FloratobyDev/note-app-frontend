
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAddUserMutation } from '../store'

const Register = () => {

    const initialUserData = {
        username: "",
        email: "",
        password: ""
    }

    const [addUser, addUserResults] = useAddUserMutation()

    const [userData, setUserData] = useState(initialUserData)
    const navigate = useNavigate()

    const handleUserData = event => {
        if (addUserResults.isError) addUserResults.reset()

        setUserData({
            ...userData,
            [event.target.id]: event.target.value
        })
    }

    const handleUserSubmit = event => {
        event.preventDefault()
        addUser(userData)
        setUserData(initialUserData)
    }

    useEffect(() => {
        if (addUserResults.isSuccess) {
            navigate('/task')
        }
    }, [addUserResults, navigate])

    return (
        <div className='flex flex-col h-screen overflow-x-hidden'>

            <img className='absolute w-full h-full object-fill' src="/leaf_bg.jpeg" alt="" />

            <div className='flex z-10'>
                <h1 className='text-white p-8 font-caesar text-2xl'>Leaf Planner</h1>
            </div>

            <div className='flex flex-col md:flex-row lg:flex-row justify-center pt-20 lg:pt-40 md:pt-40 relative w-screen h-screen overflow-hidden shadow-sm'>

                <div className='flex-1 px-8'>
                    <div className=' bg-background text-white py-8 px-12 w-11/12 md:w-8/12 lg:w-8/12 mx-auto'>
                        <h2 className='text-5xl tracking-wider font-caesar pb-4'>Am I a leaf?</h2>
                        <p className='tracking-wider'>Get blown away by my beauty and simplicity. Oh yeah. Amazing. Super Amazing.</p>
                    </div>
                    {/* <div className='flex-1 h-full'></div> */}
                </div>

                <div className='flex-1'>

                    <form className='w-6/12 mx-auto' onSubmit={handleUserSubmit}>

                        <div className='flex flex-col mb-8'>
                            <label className=' text-white text-lg font-almarai font-bold tracking-widest pb-2' htmlFor="username">Username</label>
                            <input onChange={handleUserData} value={userData.username} className=' px-2 outline-none py-2 border border-black ' id='username' type="text" />
                        </div>
                        <div className='flex flex-col mb-8'>
                            <label className=' text-white text-lg font-almarai font-bold tracking-widest pb-2' htmlFor="email">Email</label>
                            <input onChange={handleUserData} value={userData.email} className=' px-2 outline-none py-2 border border-black ' id='email' type="email" />
                        </div>

                        <div className='flex flex-col mb-2'>
                            <label className=' text-white text-lg font-almarai font-bold tracking-widest pb-2' htmlFor="password">Password</label>
                            <input onChange={handleUserData} value={userData.password} className=' px-2 outline-none py-2 border border-black' id='password' type="password" />
                        </div>

                        <p className='text-red-400 py-2 font-bold font-almarai'>{addUserResults.isError && addUserResults.error.data}</p>
                        <div className='flex gap-x-2 text-white tracking-wide'>
                            <input className=' outline-none rounded-none' type="checkbox" name="" id="remember-pass" />
                            <label htmlFor="remember-pass" className='tracking-wider text-sm'>Remember password</label>
                        </div>

                        <div className='flex flex-col py-4 gap-y-3'>
                            <div className='flex border-2 border-white text-white w-1/2'>
                                <button className=' p-2 px-4 rounded-xl font-almarai text-lg font-extrabold tracking-widest' type="submit">{addUserResults.isLoading ? "Loading" : "Register"}</button>
                            </div>
                            <div className='flex items-center text-white gap-x-2'>
                                <p className='text-sm'>Got an account ?</p>
                                <Link to='/login'><span className='font-bold hover:underline'>Login</span></Link>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Register