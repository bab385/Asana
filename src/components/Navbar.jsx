import React from "react";
import { AiOutlineMenu } from 'react-icons/ai'
import { BsPlusCircleFill } from 'react-icons/bs'
import { FiBriefcase } from "react-icons/fi";
import Search from "./Search";
import { useGlobalContext } from "../context";

const Navbar = () => {
    const { isSidebarOpen, openSidebar, userInitials } = useGlobalContext()

    return (
        <nav className='navbar'>
            <div>
                <div className='nav-left'>
                    <div className={`nav-spacing ${isSidebarOpen ? 'shrink-div' : ''}`}>
                        <button onClick={openSidebar} className={`btn-blank ${isSidebarOpen ? 'hide-btn' : '' }`}>
                            <AiOutlineMenu size={24} />
                        </button>
                    </div>
                    <div className='nav-spacing'>
                        Home
                    </div>
                    <div className="nav-title-flex pl8">
                        <div style={{ paddingTop: '12px'}}>Title Area Top</div>
                        <div style={{ paddingTop: '6px'}}>
                            <div className="flex">
                                <button className={`btn-nav-tab`} value="upcoming">Overview</button>
                                <button className={`btn-nav-tab tab-selected`} value="upcoming">List</button>
                                <button className={`btn-nav-tab`} value="upcoming">Board</button>
                                <button className={`btn-nav-tab`} value="upcoming">Timeline</button>
                                <button className={`btn-nav-tab`} value="upcoming">Calendar</button>
                                <button className={`btn-nav-tab`} value="upcoming">Workflow</button>
                                <button className={`btn-nav-tab`} value="upcoming">More...</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-right'>
                <div className='container-search'>
                    <Search />
                </div>
                <div className='pl8 pr8 mt4'>
                    <BsPlusCircleFill size={32} color="#f06a6a"/>
                </div>
                <div className='pl8 pr8'>
                    <button className='btn btn-upgrade'>
                        <FiBriefcase /> Upgrade
                    </button>
                </div>
                <div className='pl8 pr8'>
                    <button className='btn btn-avatar'>
                        {userInitials}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;