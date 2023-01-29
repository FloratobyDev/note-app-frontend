import React, { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'
import useGetQuoteHook from '../../hooks/useGetQuoteHook'
import { useAddTaskMutation, useFetchTaskQuery, useRemoveTaskMutation, useUpdateTaskMutation } from '../../store/apis/tasksApi'
import { Dropdown } from '../Generic/Dropdown'
import { useFetchCategoryQuery } from '../../store'
import { nanoid } from '@reduxjs/toolkit'

import LevelUpComponent from './LevelUpComponent'
import TitleReceivedComponent from './TitleReceivedComponent'

const TaskCreatorComponent = ({ tasks, onSave }) => {

    const [addTask] = useAddTaskMutation()
    const [removeTask] = useRemoveTaskMutation()
    const fetchCategoryResults = useFetchCategoryQuery()
    const fetchTaskResults = useFetchTaskQuery()

    const [difficulty, setDifficulty] = useState(1)
    const [showLevel, setShowLevel] = useState(true)
    const [showAchievements, setShowAchievements] = useState(true)

    const [category, setCategory] = useState("")

    const TASK_INITIAL_VALUE = {
        description: "",
        category: category,
        completed: false
    }

    const [currentTask, setCurrentTask] = useState(TASK_INITIAL_VALUE)
    let categoryList = []
    const { quoteInfo } = useGetQuoteHook()

    const [updateTask, updateTaskResults] = useUpdateTaskMutation()

    useEffect(() => {
        setCurrentTask((previousTask) => {
            return {
                ...previousTask,
                category: category
            }
        })
    }, [category, setCurrentTask])

    const [displayArray, setDisplayArray] = useState([])

    /**
     * @description Handles the creation of task.
     * @param {*} event 
     */

    const handleAddTask = event => {
        event.preventDefault()

        if (currentTask.description.length > 0) {
            setCurrentTask(TASK_INITIAL_VALUE)
            const date = new Date()

            addTask({
                ...currentTask,
                createdAt: date.toISOString(),
                isStale: false,
                difficulty: difficulty,
                taskID: nanoid()
            })

            setDifficulty(1)
        }
    }

    /**
     * @description Handles the events when the user types something in the input linked to one of currentTasks' field.
     * @param {*} event 
     */

    const handleTaskChange = event => {
        setCurrentTask({
            ...currentTask,
            [event.target.id]: event.target.value
        })
    }

    /**
     * @description Handles the deletion of a task.
     * @param {*} index 
     */

    const handleRemoveTask = (task) => {
        removeTask(task)
    }

    const handleUpdateTask = (task, renew) => {
        setShowLevel(true)
        setShowAchievements(true)

        updateTask({
            ...task,
            renew: renew
        }).unwrap().then(data => {

            let displayData = []

            if (data.hasOwnProperty('newLevel')) {
                displayData.push({
                    type: 'level',
                    data: data['newLevel']
                })
            }

            if (data.hasOwnProperty('achievementReceived')) {
                displayData.push({
                    type: 'title',
                    data: data['achievementReceived']
                })
            }

            if (displayData.length > 0)
                setDisplayArray(displayData)
        })
    }


    if (fetchCategoryResults.isLoading) return <p>Loading categories</p>

    if (fetchCategoryResults.isSuccess) {
        categoryList = fetchCategoryResults.data
    }

    const handleDifficulty = event => {
        event.stopPropagation()
        const value = ((difficulty) % 5) + 1
        setDifficulty(value)
    }

    return (
        <>

            {
                displayArray.length > 0 ? <div key={displayArray.length}>
                    {
                        displayArray.at(0).type === 'level' ? <LevelUpComponent setDisplayArray={setDisplayArray} data={displayArray.at(0).data} /> : <TitleReceivedComponent setDisplayArray={setDisplayArray} data={displayArray.at(0).data} />
                    }
                </div> : ""
            }

            <div className='flex flex-col h-full w-full'>
                <form onSubmit={handleAddTask} className='sticky top-1 flex items-center mb-2 p-2 pl-2 text-green-2 bg-background'>
                    <input id='description' className=' placeholder:text-white placeholder:tracking-widest flex-1 m-2 outline-none bg-transparent' onChange={handleTaskChange} value={currentTask.description} type="text" placeholder='Type your task here...' />
                    <div className='flex gap-x-2 w-3/12 justify-end'>
                        <div onClick={handleDifficulty} className=' active:scale-105 flex flex-1 text-background bg-white px-3'>
                            <button className='font-bold text-lg w-full' type='button'>{difficulty}</button>
                        </div>
                        <Dropdown category={category} setCategory={setCategory} categories={categoryList} />
                        <button className='hover:bg-white hover:text-background tracking-widest p-2 px-4 border border-white text-sm' onClick={handleAddTask} type="submit">ADD TASK</button>
                    </div>
                </form>
                {(fetchTaskResults.data?.length || 0) > 0 && <div className='overflow-auto grid grid-cols-4 gap-x-2 bg-background p-4 '>
                    {fetchTaskResults.data?.map((task, idx) => {
                        return <div className=' font-bold text-background select-none mb-2 bg-white shadow-sm  flex gap-x-2 pl-3 justify-between items-center overflow-hidden' key={idx}>

                            <div className='flex items-center gap-x-4'>
                                <div className='border-2 border-background px-2'>
                                    <p className='text-sm font-bold '>{task.difficulty}</p>
                                </div>
                                <p className='tracking-widest'>{task.description}</p>
                            </div>

                            {/* TASK */}

                            <div className='flex items-center text-lg justify-between max-h-40 w-6/12'>
                                <p className='capitalize text-sm italic tracking-widest'>{task.category}</p>
                                <div className='flex'>
                                    {task.isStale && <p onClick={() => { handleUpdateTask(task, true) }} className='flex items-center hover:text-white hover:bg-blue-400 px-2 cursor-pointer'>
                                        <span className=''>Renew</span>
                                    </p>}

                                    <span onClick={() => { handleUpdateTask(task, false) }} className='hover:bg-green-400 hover:text-white h-full p-2 cursor-pointer'>
                                        <AiOutlineCheck className='text-2xl' />
                                    </span>
                                    <span onClick={() => { handleRemoveTask(task) }} className='hover:bg-red-400 hover:text-white h-full p-2 cur'>
                                        <AiOutlineClose className='text-2xl' />
                                    </span>
                                </div>
                            </div>
                        </div>
                    })
                    }
                </div>}
                {!((fetchTaskResults.data?.length || 0) > 0) && <div className='flex flex-col gap-2 justify-center items-center w-full h-full'>
                    <p className='text-white text-2xl tracking-wide w-5/12 text-center'>{quoteInfo.content}</p>
                    <p className='text-white text-md w-8/12 text-center'>- {quoteInfo.author}</p>
                </div>}


            </div>
        </>
    )
}

export default TaskCreatorComponent