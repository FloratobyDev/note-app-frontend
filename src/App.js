import { Outlet, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { MdLogout } from 'react-icons/md'
import { BiTask, BiCalendar, BiStar, BiCog } from 'react-icons/bi'
import { BsPersonFill } from 'react-icons/bs'
import LinkTabComponent from './components/Home/LinkTabComponent'
import { useAuthenticateRemoveCookiesMutation } from "./store";

const Panel = ({ xs, children }) => {
  let classes = classNames('mx-2 border-2 border-black rounded-md p-2', xs)
  return <div className={classes}>
    {children}
  </div>
}


function App() {

  const navigate = useNavigate()

  const [authenticateRemoveCookies, authenticateRemoveCookiesResults] = useAuthenticateRemoveCookiesMutation()

  useEffect(() => {

    axios.get('/authenticate', {
      withCredentials: true
    }).catch(err => {
      navigate('/login')
    })

  }, [navigate])

  // const isLogin = false;
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (!isLogin) {
  //     navigate('/login')
  //   }
  // }, [isLogin, navigate])

  const logout = event => {
    authenticateRemoveCookies()
  }


  if (authenticateRemoveCookiesResults.isSuccess) {
    navigate('/logout')
  }


  return (

    <main className='flex flex-col h-screen text-white scrollbar-thin'>
      <img className='absolute h-screen w-screen -z-10' src="/leaf_bg.jpeg" alt="" />
      <div className="flex items-center justify-between py-6 px-12">
        <h1 className="font-caesar text-2xl">Leaf Planner</h1>
        <button onClick={logout} className=" hover:bg-white hover:text-background hover:scale-105 transition-all flex text-lg p-1 bg-background px-4 border border-white items-center gap-x-4 font-adventpro">Logout <MdLogout /></button>
      </div>

      <div className=" flex flex-col h-full p-6">

        <div className='flex mb-4'>
          <LinkTabComponent name='Tasks' to='task' icon={<BiTask />} />
          <LinkTabComponent name='Calendar' to='calendar' icon={<BiCalendar />} />
          <LinkTabComponent name='Profile' to='profile' icon={<BsPersonFill />} />
          <LinkTabComponent name='Settings' to='settings/general' icon={<BiCog />} />
        </div>

        <div className="w-full h-full font-adventpro">
          <Outlet />
        </div>

      </div>
    </main>


  );
}

export default App;
