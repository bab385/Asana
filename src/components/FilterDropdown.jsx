import React from 'react';

import { useGlobalContext } from '../context';

const FilterDropdown = (props) => {
    const { filterComplete } = useGlobalContext()

    const { showDropdown } = props
    const btnArray = [ 'completeFilterBtn', 'filterBtn', 'sortBtn', 'publicBtn', 'ellipseBtn', 'customizeBtn']
    if ( showDropdown.name === 'completeFilterBtn') {
        return (
            
            <div 
                className={`dropdown-container ${showDropdown.show ? 'show-dropdown-container' : ''}`}
                style={{ top: showDropdown.locY, left: showDropdown.locX }}
            >
                <div>
                    <button className='context-menu-link-btn' onClick={() => filterComplete('incomplete')}>
                            <div className='context-menu-link-container'>
                                <div>
                                    Incomplete tasks
                                </div>
                            </div> 
                    </button>
                </div>
                <div>
                    <button className='context-menu-link-btn' onClick={() => filterComplete('complete')}>
                            <div className='context-menu-link-container'>
                                <div>
                                </div>
                                <div>
                                    Completed tasks
                                </div>
                            </div> 
                    </button>
                </div>
                <div>
                    <button className='context-menu-link-btn' onClick={() => filterComplete('all')}>
                            <div className='context-menu-link-container'>
                                <div>
                                    All tasks
                                </div>
                            </div> 
                    </button>
                </div>
            </div>
        )
    }

    if ( showDropdown.name === 'filterBtn') {
        return (
            <div 
                className={`dropdown-container ${showDropdown.show ? 'show-dropdown-container' : ''}`}
                style={{ top: showDropdown.locY, left: showDropdown.locX }}
            >
                <div>
                    <button className='context-menu-link-btn'>
                            <div className='context-menu-link-container'>
                                <div>
                                    Filter Button
                                </div>
                            </div> 
                    </button>
                </div>
            </div>
        )
    }
}

export default FilterDropdown;