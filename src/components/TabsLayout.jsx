import React, { useState } from "react";
import { useGlobalContext } from '../context';

import TaskTab from "./TaskTab";

const TabsMe = () => {
    const { tasks, currentUser, projects } = useGlobalContext()
    const [selected, setSelected] = useState('upcoming')

    return (
        <>
            <button className={`btn-tab ${selected === 'upcoming' ? 'tab-selected' : ''}`} value="upcoming" onClick={(e) => setSelected(e.target.value)}>Upcoming</button>
            <button className={`btn-tab ${selected === 'overdue' ? 'tab-selected' : ''}`} value="overdue" onClick={(e) => setSelected(e.target.value)}>Overdue</button>
            <button className={`btn-tab ${selected === 'completed' ? 'tab-selected' : ''}`} value="completed" onClick={(e) => setSelected(e.target.value)}>Completed</button>
            <div className={`tab-page ${selected === 'upcoming' ? 'tab-page-selected' : ''}`}>
                <TaskTab taskType='upcoming' lowBound={0} highBound={30} completedTask={false} />
            </div>
            <div className={`tab-page ${selected === 'overdue' ? 'tab-page-selected' : ''}`}>
                <TaskTab taskType='overdue' lowBound={-10000} highBound={0} completedTask={false} />
            </div>
            <div className={`tab-page ${selected === 'completed' ? 'tab-page-selected' : ''}`}>
                <TaskTab taskType='overdue' lowBound={-10000} highBound={10000} completedTask={true} />
            </div>
        </>
    )
}

export default TabsMe;