import React from 'react'

const CategoryCard = ({ categoryType, categoryValue }) => {
    return (
        <div className=' bg-white text-background w-full'>
            <div className=' font-almarai flex items-center justify-between px-4 py-1'>
                <p className='capitalize'>{categoryType}</p>
                <p>{categoryValue}</p>
            </div>
        </div>
    )
}

export default CategoryCard