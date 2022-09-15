import React, { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { Divider } from '@mui/material';

const SidebarSearchList = () => {
  const [ openSearch, setOpenSearch ] = useState(false)
  const [ openTeams, setOpenTeams ] = useState(false)
  const [ openBrowse, setOpenBrowse ] = useState(false)

  return (
    <>
      {/* ================== SEARCH LIST ========================= */}
      <div className="dropdown-parent">
        <div className='dropdown-head'>
          <button className='sidebar-dropdown-btn' onClick={() => setOpenSearch(!openSearch)}>
            <div>
              Saved searches
            </div>
            <div>
              { openSearch ? <BiChevronUp size={24} /> : <BiChevronDown size={24}/> }
            </div>
          </button>
        </div>
        <div className={`dropdown-list ${openSearch ? 'show-list' : 'hide-list'}`}>
          <div className='dropdown-item'>
            <button className='sidebar-link-btn'>
              Item 1
            </button>
          </div>
          <div className='dropdown-item'>
            <button className='sidebar-link-btn'>
              Item 2
            </button>
          </div>
          <div className='dropdown-item'>
            <button className='sidebar-link-btn'>
              Item 3
            </button>
          </div>
        </div>
      </div>
      <Divider color="gray"/>
      {/* ================== TEAMS LIST ========================= */}
      <div className="dropdown-parent">
        <div className='dropdown-head'>
          <button className='sidebar-dropdown-btn' onClick={() => setOpenTeams(!openTeams)}>
            <div>
              Teams
            </div>
            <div>
              { openTeams ? <BiChevronUp size={24} /> : <BiChevronDown size={24}/> }
            </div>
          </button>
        </div>
        <div className={`dropdown-list ${openTeams ? 'show-list' : 'hide-list'}`}>
          <div className='dropdown-item'>
            <button className='sidebar-link-btn'>
              Item 1
            </button>
          </div>
          <div className='dropdown-item'>
            <button className='sidebar-link-btn'>
              Item 2
            </button>
          </div>
          <div className='dropdown-item'>
            <button className='sidebar-link-btn'>
              Item 3
            </button>
          </div>
        </div>
      </div>
      <Divider color="gray"/>
      {/* ================== BROWSE LIST ========================= */}
      <div className="dropdown-parent">
        <div className='dropdown-head'>
          <button className='sidebar-dropdown-btn' onClick={() => setOpenBrowse(!openBrowse)}>
            <div>
              Browse teams
            </div>
            <div>
              { openBrowse ? <BiChevronUp size={24} /> : <BiChevronDown size={24}/> }
            </div>
          </button>
        </div>
        <div className={`dropdown-list ${openBrowse ? 'show-list' : 'hide-list'}`}>
          <div className='dropdown-item'>
            <button className='sidebar-link-btn'>
              Item 1
            </button>
          </div>
          <div className='dropdown-item'>
            <button className='sidebar-link-btn'>
              Item 2
            </button>
          </div>
          <div className='dropdown-item'>
            <button className='sidebar-link-btn'>
              Item 3
            </button>
          </div>
        </div>
      </div>
      <Divider color="gray"/>
    </>
  )
}

export default SidebarSearchList;