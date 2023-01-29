import React, { useState, useRef, useEffect } from 'react'
import { useLazyFetchCalendarQuery } from '../../store'

const DayComponent = ({ day, currentDate }) => {

    const [trigger, result] = useLazyFetchCalendarQuery()
    const taskInfoRef = useRef()
    const [show, setShow] = useState(false)

    useEffect(() => {

        let click = document.addEventListener('click', event => {
            if (!taskInfoRef.current) return;
            if (!taskInfoRef.current.contains(event.target)) {
                setShow(false)
            }
        })

        return () => {
            document.removeEventListener('click', click, true)
        }
    }, [])

    const handleDate = idx => {

        const day = parseInt(idx)
        const month = currentDate.get('month')
        const total = day + month + currentDate.get('year')
        trigger(total)
    }

    const handleShowFunction = showValue => e => {

        setShow(showValue)
    }

    return (
        <div ref={taskInfoRef} className='select-none mx-auto' onClick={handleShowFunction(!show)}>

            <div key={day} onClick={() => {
                handleDate(day)
            }} className='relative break-words flex hover:text-background hover:bg-white p-4 cursor-pointer'>
                <p className='p-2 text-2xl tracking-widest'>{day}</p>

                {(show) && <div className='absolute border border-black left-20 bg-white z-20 w-96 p-4'>
                    <p className='font-bold text-sm text-background'>Task Completed</p>
                    {!result.data && <p>No task completed this day</p>}
                    <div className='grid grid-cols-3'>
                        {!result.isFetching ? result.data?.map((task, idx) => {
                            return <p className='text-sm text-background font-medium' key={idx}><span className='font-bold text-sm'>{task.difficulty}</span> {task.description}</p>
                        }) : <p>...</p>}
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default DayComponent