import { tasks } from "./data/tasks"

const originalTasks = tasks

const reducer = (state, action) => {
    if ( action.type === 'CLOSE_SIDEBAR') {
        return { ...state, isSidebarOpen: false}
    }

    if ( action.type === 'OPEN_SIDEBAR') {
        return { ...state, isSidebarOpen: true}
    }

    if ( action.type === 'CHANGE_USER') {
        const tempUser = state.users.filter((user) => user.id === state.userId)[0]
        const initials = tempUser.firstName[0] + tempUser.lastName[0]
        return { ...state, currentUser: tempUser, userInitials: initials}
    }

    if ( action.type === 'TOGGLE_COMPLETED') {
        let tempTasks = state.tasks.map((task) => {
            let { completed } = task
            if (task.id === action.payload) {
                return { ...task, completed: !completed }
            }
            return task
        })
        return { ...state, tasks: tempTasks }
    }

    if ( action.type === 'TABLE_SORT') {
        const { sortBy, ascend } = state.tableSorting
        if (sortBy === action.payload) {
            return { ...state, tableSorting: { ...state.tableSorting, ascend: !ascend } }
        } 
        if (sortBy !== action.payload) {
            return { ...state, tableSorting: { sortBy: action.payload, ascend: true }}
        }
    }

    if ( action.type === 'TABLE_SORT_EFFECT') {
        const { sortBy, ascend } = state.tableSorting

        let tempTasks = [...state.tasks]
        let projects = [...state.projects]
        let users = [...state.users]

        if (sortBy === 'name') {
            if (ascend) {
                tempTasks = tempTasks.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1 )
            } else {
                tempTasks = tempTasks.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? 1 : -1 )
            }
        }

        if (sortBy === 'dueDate') {
            if (ascend) {
                tempTasks = tempTasks.sort((a, b) => (a.dueDate > b.dueDate) ? 1 : -1 )
            } else {
                tempTasks = tempTasks.sort((a, b) => (a.dueDate < b.dueDate) ? 1 : -1 )
            }
        }

        if (sortBy === 'assignedTo') {

            // To properly sort an by an item that is a primaryID, each item has to be changed to it's written value
            // from the primaryID number. 
            tempTasks = tempTasks.map((task) => {
                let currUser = users.find((user) => user.id === task.assignedTo)
                currUser = `${currUser.firstName} ${currUser.lastName}`
                return { ...task, assignedTo: currUser }
            })

            // Now sort the tasks by the written value
            if (ascend) {
                tempTasks = tempTasks.sort((a, b) => (a.assignedTo > b.assignedTo) ? 1 : -1 )
            } else {
                tempTasks = tempTasks.sort((a, b) => (a.assignedTo < b.assignedTo) ? 1 : -1 )
            }

            // Now change the written value back to the primaryID so that the state of tasks is back in its
            // original form with the values sorted by the written value
            tempTasks = tempTasks.map((task) => {
                let userNum = users.find((user) => `${user.firstName} ${user.lastName}` === task.assignedTo)
                userNum = userNum.id
                return { ...task, assignedTo: userNum }
            })

            return { ...state, tasks: tempTasks}
        }

        if (sortBy === 'project') {

            // To properly sort an by an item that is a primaryID, each item has to be changed to it's written value
            // from the primaryID number. 
            tempTasks = tempTasks.map((task) => {
                let currProj = projects.find((proj) => proj.id === task.project)
                currProj = currProj.name
                return { ...task, project: currProj }
            })

            // Now sort the tasks by the written value
            if (ascend) {
                tempTasks = tempTasks.sort((a, b) => (a.project > b.project) ? 1 : -1 )
            } else {
                tempTasks = tempTasks.sort((a, b) => (a.project < b.project) ? 1 : -1 )
            }

            // Now change the written value back to the primaryID so that the state of tasks is back in its
            // original form with the values sorted by the written value
            tempTasks = tempTasks.map((task) => {
                let projNum = projects.find((proj) => proj.name === task.project)
                projNum = projNum.id
                return { ...task, project: projNum }
            })

            return { ...state, tasks: tempTasks}
        }

        return { ...state, tasks: tempTasks }
    }

    if ( action.type === 'TOGGLE_DETAIL' ) {
        const showDetailWindow = state.showDetailWindow
        return { ...state, showDetailWindow: !showDetailWindow }
    }

    if ( action.type === 'FILTER_COMPLETE') {


        // if (action.payload === 'complete') {
        //     const tempTasks = originalTasks.filter((task) => task.completed === true)
        //     return { ...state, tasks: tempTasks }
        // }
        // if (action.payload === 'incomplete') {
        //     const tempTasks = originalTasks.filter((task) => task.completed === false)
        //     return { ...state, tasks: tempTasks }
        // }
        // if (action.payload === 'all') {
        //     return { ...state, tasks: originalTasks }
        // }
        return { ...state, completeFilter: action.payload }
    }

    throw new Error ('no matching action type in reducer' + action.type)
}

export default reducer;