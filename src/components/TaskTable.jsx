import React, { useState, useEffect, useCallback } from 'react';
import TaskTab from './TaskTab';
import TaskItem from './TaskItem';
import ContextMenu from './ContextMenu';

import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

import { useGlobalContext } from '../context';

const TaskTable = () => {
    const { tasks, users, projects, tableSorting, handleTableSort, toggleDetailWindow } = useGlobalContext()

    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false);
    const [contextId, setContextId] = useState('')

    const handleContextMenu = useCallback(
        (e, id) => {
            e.preventDefault();
            setAnchorPoint({ x: e.pageX, y: e.pageY });
            setShow(true);
            setContextId(id)
        }, [setAnchorPoint]
    )

    const handleClick = useCallback(() => (show ? setShow(false) : null), [show])

    useEffect(() => {
        document.addEventListener('click', handleClick) 
        return () => {
            document.removeEventListener('click', handleClick)
        }
    })
    return (
        <>  
            <>
                {/* <div className='div-table'>
                    <div className='div-table-header'>
                        <div className='div-table-header-cell'>Task Name</div>
                        <div className='div-table-header-cell'>Assignee</div>
                        <div className='div-table-header-cell'>Due Date</div>
                        <div className='div-table-header-cell last-column'>Project</div>
                    </div>
                    <div className='div-table-body'>
                        <div className='div-table-row'>
                            <div className='div-table-cell'>
                                Hello
                            </div>
                            <div className='div-table-cell'>
                                Hello
                            </div>
                            <div className='div-table-cell'>
                                Hello
                            </div>
                            <div className='div-table-cell'>
                                Hello
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <br/>
                <br/> */}
            </>
            <table className='table-tasks'>
                <thead>
                    <tr>
                        <th className='table-header' onClick={() => handleTableSort('name')}>
                            Task Name { tableSorting.sortBy == 'name' ? ( tableSorting.ascend ? <BiChevronDown /> : <BiChevronUp /> ) : ''}
                        </th>
                        <th className='table-header' onClick={() => handleTableSort('assignedTo')}>
                            Assignee { tableSorting.sortBy == 'assignedTo' ? ( tableSorting.ascend ? <BiChevronDown /> : <BiChevronUp /> ) : ''}
                        </th>
                        <th className='table-header' onClick={() => handleTableSort('dueDate')}>
                            Due Date { tableSorting.sortBy == 'dueDate' ? ( tableSorting.ascend ? <BiChevronDown /> : <BiChevronUp /> ) : ''}
                        </th>
                        <th className='table-header last-column' onClick={() => handleTableSort('project')}>
                            Project { tableSorting.sortBy == 'project' ? ( tableSorting.ascend ? <BiChevronDown /> : <BiChevronUp /> ) : ''}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => {
                        const { id, name, assignedTo, project, completed } = task
                        let dueDate = task.dueDate.toString().split(' ')
                        const tempProject = projects.find((each) => each.id === project)
                        const tempAssigned = users.find((each) => each.id === assignedTo)
                        
                        return (                             
                            <tr key={id} className='table-row' onContextMenu={(e) => handleContextMenu(e, id)}>
                                <td className='table-cell width-200 name-cell'><TaskItem key={id} task={task} /></td>
                                <td className='table-cell width-100'>{`${tempAssigned.firstName} ${tempAssigned.lastName}`}</td>
                                <td className='table-cell width-100'>{`${dueDate[1]} ${dueDate[2]}`}</td>
                                <td className='table-cell last-column'>{tempProject.name}</td> 
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
            <button className='btn' onClick={toggleDetailWindow}>
                Show Detail Window
            </button>
            <ContextMenu show={show} anchorPoint={anchorPoint} id={contextId} tasks={tasks} />
        </>
    )
}

export default TaskTable;