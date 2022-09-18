import React from 'react';

import { useGlobalContext } from '../context';

import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs'; 

const TaskItem = (props) => {
    const { markCompleted, toggleDetailWindow } = useGlobalContext()
    const { task } = props
    const { id, name, completed } = task

    return (
        <div className="tab-task-sub-left" onClick={toggleDetailWindow}>
            { completed ? <BsCheckCircleFill color='#58a182' onClick={() => markCompleted(id)} /> : <BsCheckCircle onClick={() => markCompleted(id)} />}
            <div className="pl8">{name}</div>
        </div>
    )
}

export default TaskItem;