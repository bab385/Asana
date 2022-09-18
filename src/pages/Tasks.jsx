import React, { useState, useCallback, useEffect } from 'react';

import TaskTableTan from '../components/TaskTableTan';
import TableTanPractice from '../components/TableTanPractice.tsx';
import TaskTable from '../components/TaskTable';
import FilterDropdown from '../components/FilterDropdown';

import { useGlobalContext } from '../context';

const Tasks = () => {
    const {         
        changeFilters,
        dropdownButtons,
        filterDropdown,
        closeFilterDropdown,
        completeFilter,
    } = useGlobalContext()

    const [ showDropdown, setShowDropdown ] = useState({
        name: '',
        show: false,
        locX: 0,
        locY: 0
    })

    const changeDropdown = (e) => {
        const btnId = e.target.id
        const btn = document.querySelector(`#${btnId}`)
        const btnLoc = btn.getBoundingClientRect()
        setShowDropdown({name: btnId, show: true, locX: btnLoc.left, locY: btnLoc.bottom })
    }

    const closeDropdown = useCallback((e) => {
        const id = e.target.id
        const btnArray = [ 'completeFilterBtn', 'filterBtn', 'sortBtn', 'publicBtn', 'ellipseBtn', 'customizeBtn']
            if (id !== btnArray[0] && id !== btnArray[1] && id !== btnArray[2] && id !== btnArray[3] && id !== btnArray[4] && id !== btnArray[5]) {
                if (showDropdown.show) {
                    setShowDropdown({name: '', show: false, locX: 0, locY: 0})
                }
            }
    }, [showDropdown.show])

    useEffect(() => {
        document.addEventListener('click', closeDropdown)
        return () => {
            document.removeEventListener('click', closeDropdown)
        }
    })


    
    return (
        <div className='task-container'>
            <div className='filter-bar-container pl8'>
                <div className='filter-bar-flex'>
                    <div>
                        <button className='btn'>Add task</button>
                    </div>
                    <div className='filter-bar-right'>
                        <div>
                            <button className='filter-bar-btn' onClick={(e) => changeDropdown(e)} id="completeFilterBtn">
                                { completeFilter === 'all' ? 'All tasks' : '' }
                                { completeFilter === 'complete' ? 'Completed tasks' : '' }
                                { completeFilter === 'incomplete' ? 'Incomplete tasks' : '' }
                            </button>
                        </div>
                        <div>
                            <button className='filter-bar-btn' onClick={(e) => changeDropdown(e)} id="filterBtn">
                                Filter{dropdownButtons.allFilter ? `: ${dropdownButtons.allFilter}`: ''}
                            </button>
                        </div>
                        <div>
                            <button className='filter-bar-btn' onClick={(e) => changeDropdown(e)} id="sortBtn">
                                Sort{dropdownButtons.sortItems ? `: ${dropdownButtons.sortItems}`: ''}
                            </button>
                        </div>
                        <div>
                            <button className='filter-bar-btn' onClick={(e) => changeDropdown(e)} id='publicBtn'>
                                Public link: {dropdownButtons.link ? 'On': 'Off'}
                            </button>
                        </div>
                        <div>
                            <button className='filter-bar-btn' onClick={(e) => changeDropdown(e)} id='ellipseBtn'>
                                Ellipse
                            </button>
                        </div>
                        <div>
                            <button className='filter-bar-btn' onClick={(e) => changeDropdown(e)} id='customizeBtn'>
                                Customize
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                {/* <TaskTableTan /> */}
                {/* <TableTanPractice /> */}
                <TaskTable />
            </div>
            <FilterDropdown showDropdown={showDropdown} />
        </div>
    )
}

export default Tasks;