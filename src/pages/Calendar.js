import React from 'react'
import DayComponent from '../components/Calendar/DayComponent';
import dayjs from 'dayjs';
const Calendar = () => {

  const currentDate = new Date()
  const day = dayjs(currentDate)
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className='h-full'>
      <div className='flex justify-center px-[10%] gap-y-2 mb-6'>
        <p className='text-center font-bold text-4xl tracking-widest '>{day.format('MMMM YYYY')}</p>
      </div>
      <div className='grid grid-cols-7 w-8/12 gap-[1vh] mx-auto'>

        {daysOfWeek.map(day => {
          return <p className='text-center text-xl mt-2' key={day}>{day}</p>
        })}

        {Array(day.daysInMonth()).fill(0).map((_, idx) => {
          return <DayComponent day={idx + 1} currentDate={day} />
        })}
      </div>
    </div>
  )
}

export default Calendar