import React, { useState, useEffect, useCallback } from 'react';
import TaskTab from './TaskTab';
import TaskItem from './TaskItem';
import ContextMenu from './ContextMenu';

import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

import { useGlobalContext } from '../context';

const TaskTable = () => {
    const { 
        tasks, 
        users,
        projects, 
        tableSorting,
        handleTableSort, 
        toggleDetailWindow,
        completeFilter
    } = useGlobalContext()

    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false);
    const [contextId, setContextId] = useState('')

    const [colResize, setColResize] = useState({
        location: '',
        start: '',
        end: '',
        width: ''
    })

    const handleContextMenu = useCallback(
        (e, id) => {
            e.preventDefault();
            setAnchorPoint({ x: e.pageX, y: e.pageY });
            setShow(true);
            setContextId(id)
        }, [setAnchorPoint]
    )

    const handleCloseContextMenu = useCallback(() => (show ? setShow(false) : null), [show])

    useEffect(() => {
        document.addEventListener('click', handleCloseContextMenu) 
        return () => {
            document.removeEventListener('click', handleCloseContextMenu)
        }
    })

    useEffect(() => {
        const getStyleVal = (elm, css) => {
            return (window.getComputedStyle(elm, null).getPropertyValue(css))
        }

        const paddingDiff = (col) => {
            if (getStyleVal(col, 'box-sizing') == 'border-box') {
                return 0;
            }
            var padLeft = getStyleVal(col, 'padding-left')
            var padRight = getStyleVal(col, 'padding-right')
            return (parseInt(padLeft) + parseInt(padRight))
        }

        const createDiv = (height) => {
            const div = document.createElement('div')
            div.style.top = 0;
            div.style.right = 0;
            div.style.width = '5px';
            div.style.position = 'absolute';
            div.style.cursor = 'col-resize';
            div.style.userSelect = 'none';
            div.style.height = height + 'px';
            return div
        }

        const setListeners = (div) => {
            let pageX, curCol, nxtCol, curColWidth, nxtColWidth;

            let handleMouseDown = (e) => {
                curCol = e.target.parentElement
                nxtCol = curCol.nextElementSibling
                pageX = e.pageX
    
                let padding = paddingDiff(curCol)
                console.log(padding)
    
                curColWidth = curCol.offsetWidth - padding
                console.log(curColWidth)
                if (nxtCol) {
                    nxtColWidth = nxtCol.offsetWidth - padding
                }
            }

            div.addEventListener('mousedown', handleMouseDown)

            div.addEventListener('mouseover', (e) => {
                e.target.style.borderRight = '2px solid #0000ff'
            })

            div.addEventListener('mouseout', (e) => {
                e.target.style.borderRight = ''
            })

            document.addEventListener('mousemove', (e) => {
                if (curCol) {
                    var diffX = e.pageX - pageX;
                    if (nxtCol) {
                        nxtCol.style.width = (nxtColWidth - (diffX)) + 'px';
                    }
                    curCol.style.width = (curColWidth + diffX) + 'px';
                }
            })

            document.addEventListener('mouseup', (e) => {
                curCol = undefined;
                nxtCol = undefined;
                pageX = undefined;
                nxtColWidth = undefined;
                curColWidth = undefined;
            })
        }

        const table = document.querySelector('#taskTable')
        const row = table.getElementsByTagName('tr')[0]
        const cols = row ? row.children : undefined
        if (!cols) return;

        table.style.overflow = 'hidden'

        let tableHeight = table.offsetHeight

        for (let i=0; i<cols.length; i++) {
            let div = createDiv(tableHeight)
            cols[i].appendChild(div);
            cols[i].style.position = 'relative';
            setListeners(div)
        }
    })

    return (
        <>  
            <table className='table-tasks' id='taskTable'>
                <thead>
                    <tr>
                        <th className='table-header' style={{ width: colResize}}>
                            <div className='table-header-flex'>
                                <div 
                                    className='table-header-left' 
                                    onClick={() => handleTableSort('name')}
                                    >
                                    Task Name { tableSorting.sortBy == 'name' ? ( tableSorting.ascend ? <BiChevronDown /> : <BiChevronUp /> ) : ''}
                                </div>
                            </div>
                        </th>
                        <th className='table-header'>
                            <div className='table-header-flex'>
                                <div className='table-header-left'  onClick={() => handleTableSort('assignedTo')}>
                                    Assignee { tableSorting.sortBy == 'assignedTo' ? ( tableSorting.ascend ? <BiChevronDown /> : <BiChevronUp /> ) : ''}
                                </div>
                            </div>
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
                        if (completeFilter === 'complete' && task.completed) {
                            return (                             
                                <tr key={id} className='table-row' onContextMenu={(e) => handleContextMenu(e, id)}>
                                    <td className='table-cell width-200 name-cell'><TaskItem key={id} task={task} /></td>
                                    <td className='table-cell width-100'>{`${tempAssigned.firstName} ${tempAssigned.lastName}`}</td>
                                    <td className='table-cell width-100'>{`${dueDate[1]} ${dueDate[2]}`}</td>
                                    <td className='table-cell last-column'>{tempProject.name}</td> 
                                </tr>
                            )
                        }
                        if (completeFilter === 'incomplete' && !task.completed) {
                            return (                             
                                <tr key={id} className='table-row' onContextMenu={(e) => handleContextMenu(e, id)}>
                                    <td className='table-cell width-200 name-cell'><TaskItem key={id} task={task} /></td>
                                    <td className='table-cell width-100'>{`${tempAssigned.firstName} ${tempAssigned.lastName}`}</td>
                                    <td className='table-cell width-100'>{`${dueDate[1]} ${dueDate[2]}`}</td>
                                    <td className='table-cell last-column'>{tempProject.name}</td> 
                                </tr>
                            )
                        }
                        if (completeFilter === 'all') {
                            return (                             
                                <tr key={id} className='table-row' onContextMenu={(e) => handleContextMenu(e, id)}>
                                    <td className='table-cell width-200 name-cell'><TaskItem key={id} task={task} /></td>
                                    <td className='table-cell width-100'>{`${tempAssigned.firstName} ${tempAssigned.lastName}`}</td>
                                    <td className='table-cell width-100'>{`${dueDate[1]} ${dueDate[2]}`}</td>
                                    <td className='table-cell last-column'>{tempProject.name}</td> 
                                </tr>
                            )
                        }
                    })}
                    
                </tbody>
            </table>
            <ContextMenu show={show} anchorPoint={anchorPoint} id={contextId} tasks={tasks} />
        </>
    )
}

export default TaskTable;