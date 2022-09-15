import React from 'react';

import { Link } from 'react-router-dom';

import { GiHamburgerMenu, GiTriangleTarget } from 'react-icons/gi'
import { BsHouse, BsCheckCircle, BsBell } from 'react-icons/bs'
import { MdShowChart } from 'react-icons/md'
import { RiFolderChartLine } from 'react-icons/ri'
import { Divider } from '@mui/material';
import { AiOutlineMenu } from 'react-icons/ai'

import SidebarSearchList from './SidebarSearchList';

import { useGlobalContext } from '../context';
import { NoEncryption } from '@mui/icons-material';

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
}

const Sidebar = () => {
    const { isSidebarOpen, closeSidebar } = useGlobalContext()

    return (
        <div className={`sidebar ${isSidebarOpen ? 'show-sidebar' : '' }`}>
            <div className='sidebar-header'>
                <div>
                    Asana
                </div>
                <div>
                    <button className='btn-blank' onClick={closeSidebar}>
                        <AiOutlineMenu size={24} color="white"/>
                    </button>
                </div>
            </div>
            <Link to='/' style={linkStyle}>
                <div className='sidebar-link-container'>
                    <button className='sidebar-link-btn'>
                            <BsHouse size={16} /> Home
                    </button>
                </div>
            </Link>
            <Link to='/tasks'  style={linkStyle}>
                <div className='sidebar-link-container'>
                    <button className='sidebar-link-btn'>
                            <BsCheckCircle size={16} /> My Tasks
                    </button>
                </div>
            </Link>
            <div className='sidebar-link-container'>
                <button className='sidebar-link-btn'>
                    <BsBell size={16} /> Inbox
                </button>
            </div>
            <div className='sidebar-link-container'>
                <button className='sidebar-link-btn'>
                    <MdShowChart size={16} /> Reporting
                </button>
            </div>
            <div className='sidebar-link-container'>
                <button className='sidebar-link-btn'>
                    <RiFolderChartLine size={16} /> Portfolios
                </button>
            </div>
            <div className='sidebar-link-container'>
                <button className='sidebar-link-btn'>
                    <GiTriangleTarget size={16} /> Goals
                </button>
            </div>
            <Divider color="gray" />
            <div className='sidebar-dropdown-container'>
                <div>
                    {/* <button className='sidebar-dropdown-btn'>Saved Searches</button> */}
                    <SidebarSearchList />
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Sidebar;