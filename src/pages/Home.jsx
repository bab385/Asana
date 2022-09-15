import React from 'react';
import TabsLayout from '../components/TabsLayout';
import { useGlobalContext } from '../context'

import { tasks } from '../data/tasks' 

import { TbMinusVertical } from 'react-icons/tb'

// get today's date in the Asana format
const date = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let weekday = new Date().getDay().toString()
    weekday = daysOfWeek[weekday]
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let month = new Date().getMonth().toString()
    month = monthsOfYear[month]
    let dayOfMonth = new Date().getDate().toString()
    return `${weekday}, ${month} ${dayOfMonth}`
}

const Home = () => {
    const { currentUser } = useGlobalContext()
    return (
        <div className='container'>
            <div className='container-main-top'>
                <div>
                    <h4>{date()}</h4>
                </div>
                <div>
                    <h1>Good Afternoon, {currentUser.firstName}</h1>
                </div>
                <div className='summary-bar'>
                    <div>
                        Week
                    </div>
                    <div>
                        <TbMinusVertical size={28}/>
                    </div>
                    <div>
                        Tasks Completed
                    </div>
                    <div>
                        Collaborators
                    </div>
                </div>
            </div>
            <div className='container-widgets'>
                <div className='container-widget'>
                    <div className='widget-header'>
                        <h3>Tasks</h3>
                    </div>
                    <hr />
                    <div className='widget-body'>
                        <div className='widget-task'>
                            {tasks.map((task) => {
                                if ( task.assignedTo === currentUser.id) {    
                                    return (
                                        <p key={task.id}>{task.name}</p>
                                    )
                                }
                                return null
                            })}
                        </div>
                    </div>                
                </div>
                <div className='container-widget'>
                    <div className='widget-header'>
                        <h3>My Priorities</h3>
                    </div>
                    <TabsLayout />
                </div>
            </div>
        </div>
    )
}

export default Home;