import React, { useState, useEffect, useCallback } from 'react';

import { BsHouse, BsCheckCircle, BsEye, BsBoxArrowUpRight, BsClipboardPlus, BsDiamond, BsPlus, BsTrash } from 'react-icons/bs';
import { TbCopy } from 'react-icons/tb'

import { Divider } from '@mui/material';
import { useGlobalContext } from '../context';

const ContextMenu = (props) => {
    const { show, anchorPoint, id, tasks } = props
    
    const { markCompleted } = useGlobalContext()

    const task = tasks.find((task) => task.id === id)

    return (
        <React.Fragment>
            {show ? (
                <div className="context-menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
                    <div>
                        <button className='context-menu-link-btn' onClick={() => markCompleted(id)}>
                                <div className='context-menu-link-container'>
                                    <div className='pr8'>
                                        <BsCheckCircle size={16} />
                                    </div>
                                    <div>
                                        { task.completed ? 'Mark incomplete' : 'Mark completed' }
                                    </div>
                                </div> 
                        </button>
                    </div>
                    <div>
                        <button className='context-menu-link-btn'>
                                <div className='context-menu-link-container'>
                                    <div className='pr8'>
                                        <BsEye size={16} />
                                    </div>
                                    <div>
                                        View details
                                    </div>
                                </div> 
                        </button>
                    </div>
                    <div>
                        <button className='context-menu-link-btn'>
                                <div className='context-menu-link-container'>
                                    <div className='pr8'>
                                        <BsBoxArrowUpRight size={16} />
                                    </div>
                                    <div>
                                        Open in new tab
                                    </div>
                                </div> 
                        </button>
                    </div>
                    <Divider />
                    <div>
                        <button className='context-menu-link-btn'>
                                <div className='context-menu-link-container'>
                                    <div className='pr8'>
                                        <BsBoxArrowUpRight size={16} />
                                    </div>
                                    <div>
                                        Duplicate task
                                    </div>
                                </div> 
                        </button>
                    </div>
                    <div>
                        <button className='context-menu-link-btn'>
                                <div className='context-menu-link-container'>
                                    <div className='pr8'>
                                        <BsClipboardPlus size={16} />
                                    </div>
                                    <div>
                                        Copy task link
                                    </div>
                                </div> 
                        </button>
                    </div>
                    <div>
                        <button className='context-menu-link-btn'>
                                <div className='context-menu-link-container'>
                                    <div className='pr8'>
                                        <BsCheckCircle size={16} />
                                        <BsPlus style={{ marginLeft: '-5px', marginBottom: '-4px'}}/>
                                    </div>
                                    <div style={{ marginLeft: '-8px'}}>
                                        Create follow-up task
                                    </div>
                                </div> 
                        </button>
                    </div>
                    <Divider />
                    <div>
                        <button className='context-menu-link-btn'>
                                <div className='context-menu-link-container'>
                                    <div className='pr8'>
                                        <BsDiamond size={16} />
                                    </div>
                                    <div>
                                        Mark as Milestone
                                    </div>
                                </div> 
                        </button>
                    </div>
                    <Divider />
                    <div>
                        <button className='context-menu-link-btn'>
                                <div className='context-menu-link-container' style={{ color: '#de5f73'}}>
                                    <div className='pr8'>
                                        <BsTrash size={16} />
                                    </div>
                                    <div>
                                        Delete task
                                    </div>
                                </div> 
                        </button>
                    </div>
                </div>
            ) : (<></>)}
        </React.Fragment>
    )
}

export default ContextMenu;