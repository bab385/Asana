import React, { useState, useEffect, useReducer, useCallback, useContext } from 'react';
import reducer from './reducer';
import { users } from './data/users'
import { tasks } from './data/tasks';
import { projects } from './data/projects';
import { display } from '@mui/system';

const AppContext = React.createContext()

const initialState = {
    isSidebarOpen: true,
    users: users,
    userId: 1,
    currentUser: {},
    userInitials: '',
    tasks: tasks,
    projects: projects,
    tableSorting: {
        sortBy: 'name',
        ascend: true
    },
    showDetailWindow: false,
    filterDropdown: {
        show: false,
        locY: 0,
        locX: 0,
    },
    dropdownButtons: {
        allFilter: '',
        sortItems: '',
        link: false
    },
    completeFilter: 'all',
}

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const closeSidebar = () => {
        dispatch({ type: 'CLOSE_SIDEBAR'})
    }

    const openSidebar = () => {
        dispatch({ type: 'OPEN_SIDEBAR'})
    }

    const markCompleted = (id) => {
        dispatch({ type: 'TOGGLE_COMPLETED', payload: id})
    }

    const handleTableSort = (value) => {
        dispatch({ type: 'TABLE_SORT', payload: value})
    }

    const toggleDetailWindow = () => {
        dispatch({ type: 'TOGGLE_DETAIL'})
    }

    const filterComplete = (value) => {
        dispatch({ type: 'FILTER_COMPLETE', payload: value})
    }

    useEffect(() => {
        dispatch({ type: 'CHANGE_USER'})
    }, [state.userId])

    useEffect(() => {
        dispatch({ type: 'TABLE_SORT_EFFECT'})
    }, [state.tableSorting])

    // useEffect(() => {
    //     dispatch({ type: 'FILTER_COMPLETE'})
    // }, [state.tasks])



    return (
        <AppContext.Provider
            value={{
                ...state,
                closeSidebar,
                openSidebar,
                markCompleted,
                handleTableSort,
                toggleDetailWindow,
                filterComplete
            }}    
        >
            { children }
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider };