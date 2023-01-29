import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useValidateUserMutation } from '../store'

const Login = () => {

    const INITIAL_STATE = {
        username: "",
        password: ""
    }
    const [validateUser, validateUserResults] = useValidateUserMutation()

    const [userData, setUserData] = useState(INITIAL_STATE)
    const navigate = useNavigate()


    const handleUserData = event => {
        if (validateUserResults.isError) {
            validateUserResults.reset()
        }
        setUserData({
            ...userData,
            [event.target.id]: event.target.value
        })
    }

    const handleUserSubmit = event => {
        event.preventDefault()
        validateUser(userData)
        setUserData(INITIAL_STATE)
    }

    useEffect(() => {
        if (validateUserResults.isSuccess) {
            navigate('/task')
        }
    }, [validateUserResults, navigate])

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

                        <div className='flex flex-col mb-2'>
                            <label className=' text-white text-lg font-almarai font-bold tracking-widest pb-2' htmlFor="password">Password</label>
                            <input onChange={handleUserData} value={userData.password} className=' px-2 outline-none py-2 border border-black' id='password' type="password" />
                        </div>

                        <p className='text-red-400 py-2 font-bold font-almarai'>{validateUserResults.isError && validateUserResults.error.data}</p>
                        <div className='flex gap-x-2 text-white tracking-wide'>
                            <input className=' outline-none rounded-none' type="checkbox" name="" id="remember-pass" />
                            <label htmlFor="remember-pass" className='tracking-wider text-sm'>Remember password</label>
                        </div>

                        <div className='flex flex-col py-4 gap-y-3'>
                            <div className='flex border-2 border-white text-white w-1/2'>
                                <button className=' p-2 px-4 rounded-xl font-almarai text-lg font-extrabold tracking-widest' type="submit">{validateUserResults.isLoading ? "Loading" : "Login"}</button>
                            </div>
                            <div className='flex items-center text-white gap-x-2'>
                                <p className='text-sm'>No account yet ?</p>
                                <Link to='/register'><span className='font-bold hover:underline'>Register</span></Link>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Login