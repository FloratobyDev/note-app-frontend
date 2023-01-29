import { useEffect, useState, useRef } from "react"
import { IoIosArrowUp, IoIosArrowDown, IoIosAdd } from 'react-icons/io'
import { useAddCategoryMutation, useFetchCategoryQuery, useRemoveCategoryMutation } from "../../store"

export const Dropdown = ({ category, setCategory, categories }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [categoryList, setCategoryList] = useState(categories)
    const [newCategory, setNewCategory] = useState("")
    const dropdownRef = useRef()

    const [addCategory, addCategoryResults] = useAddCategoryMutation()
    const [removeCategory, removeCategoryResults] = useRemoveCategoryMutation()

    useEffect(() => {

        let click = document.addEventListener('click', (event) => {
            if (!dropdownRef.current) return;
            if (!dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        })

        return () => {
            document.removeEventListener('click', click, true)
        }

    }, [])

    const showOptions = () => {
        setIsOpen(!isOpen)
    }

    const handleOptionClick = event => {
        setCategory(event.currentTarget.textContent)
        setIsOpen(false)
    }

    const handleAddCategory = event => {
        event.preventDefault()
        if (newCategory.length > 0) {
            setCategoryList(prevCategory => [...prevCategory, newCategory])
            addCategory({ category: newCategory })
            setNewCategory('')
        }
    }



    return (
        <div data-value="value" className='flex z-10 relative select-none' ref={dropdownRef}>
            <div className=' flex items-center bg-white cursor-pointer text-background'>
                <p className='h-full items-center capitalize cursor-pointer px-4 flex flex-row gap-x-16 justify-between font-semibold text-md' onClick={showOptions}>{category || "Select category"} <span>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span></p>
            </div>
            {isOpen &&
                <div className=' border border-background absolute w-full p-2 bg-white mt-14 cursor-pointer'>
                    <form className="text-black flex gap-x-2 mb-2">
                        <input onChange={event => {
                            setNewCategory(event.target.value.toLowerCase())
                        }} value={newCategory} className=" w-11/12 px-2 border border-background placeholder:text-background" type="text" placeholder="Add category" />
                        <button onClick={handleAddCategory} className="p-1 bg-background px-2 text-white"><IoIosAdd /></button>
                    </form>

                    {categoryList.length <= 0 && <p className="text-background p-2 py-8 text-center font-bold text-md">No categories</p>}
                    {categoryList.map(options => {
                        return <p onClick={handleOptionClick} key={options} className='capitalize text-background hover:bg-background hover:text-white cursor-pointer font-semibold text-lg text-center p-2 '>{options}</p>
                    })}
                </div>}
        </div>
    )
}