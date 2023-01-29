import React, { useState } from 'react'
import Modal from '../Generic/Modal'

const LevelUpComponent = ({ setDisplayArray, data }) => {

    const [show, setShow] = useState(true)

    const handleDisplay = () => {
        setShow(false)
        setDisplayArray(arr => arr.filter((item, idx) => idx !== 0))
    }

    return (
        data && <Modal>
            <div className=' bg-faded-black flex items-center justify-center absolute inset-0'>
                <div className='animate-enlarge-once p-8 h-1/3 flex flex-col items-center flex-1'>
                    <div className='flex flex-col w-1/4 gap-y-10 text-center'>
                        <p className=' text-white text-[3em] font-alphaslabone tracking-wider'>LEVEL UP!</p>
                        <p className=' text-white font-adventpro font-bold w-full text-7xl p-4 bg-background'>01{data.newLevel}</p>
                        <button onClick={handleDisplay} className=' text-background p-2 tracking-wider text-4xl bg-white w-1/2 mx-auto font-alphaslabone'>OK</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default LevelUpComponent