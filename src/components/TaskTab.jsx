import React from 'react';

import { useGlobalContext } from '../context';

import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs';

const TaskTab = (props) => {
    const { taskType, lowBound, highBound, completedTask } = props

    const { tasks, currentUser, projects, markCompleted } = useGlobalContext()

    const userTasks = tasks.filter((task) => task.assignedTo === currentUser.id)

    return (
        <div className="tab-content">
            { userTasks.map((task) => {
                const { name, dueDate, project, id, completed } = task
                const today = new Date()
                const dateDiff = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24))
                let tempDate = dueDate.toDateString().split(' ')
                tempDate = `${tempDate[1]} ${tempDate[2]}`
                if (dateDiff < highBound && dateDiff >= lowBound && completed === completedTask) {
                    return (
                        <div key={id} className="tab-task">
                            <div className="tab-task-sub-left">
                                { completed ? <BsCheckCircleFill color='#58a182' onClick={() => markCompleted(id)} /> : <BsCheckCircle onClick={() => markCompleted(id)} />}
                                <div className="pl8">{name}</div>
                            </div>
                            <div className="tab-task-sub-right">
                                <div className="pl8">
                                    <button className="btn btn-project">
                                        { projects.map((each) => {
                                            if ( each.id === project) {
                                                return <div key={each.id}>{each.name}</div>
                                            }
                                        })}
                                    </button>
                                </div>
                                <div className="pl8">
                                    <button className="btn btn-date">{tempDate}</button>
                                </div>
                                <div className="pl8">
                                    <button className='btn btn-avatar'>
                                        BB
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
                return null
            })}
        </div>
    )
}

export default TaskTab;