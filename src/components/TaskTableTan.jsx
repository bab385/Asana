import React, { useState, useEffect, useReducer } from 'react';
import TaskTab from './TaskTab';
import TaskItem from './TaskItem';

import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

import { useGlobalContext } from '../context';

import { useReactTable, ColumnResizeMode, getCoreRowModel, ColumnDef, flexRender } from '@tanstack/react-table';

// let Person = {
//     firstName: String,
//     lastName: String,
//     age: Number,
//     visits: Number,
//     status: String,
//     progress: Number
// }

const defaultData: Person[] = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
]

const defaultColumns: ColumnDef<Person>[] = [
    {
        header: 'Name',
        footer: props => props.column.id,
        columns: [
            {
                accessorKey: 'firstName',
                cell: info => info.getValue(),
                footer: props => props.column.id,
            },
            {
                accessorFn: row => row.lastName,
                id: 'lastName',
                cell: info => info.getValue(),
                header: () => <span>Last Name</span>,
                footer: props => props.column.id,
            },
        ],
    },
    {
        header: 'Info',
        footer: props => props.column.id,
        columns: [
            {
                accessorKey: 'age',
                header: () => 'Age',
                footer: props => props.column.id,
            },
            {
                header: 'More Info',
                columns: [
                {
                    accessorKey: 'visits',
                    header: () => <span>Visits</span>,
                    footer: props => props.column.id,
                },
                {
                    accessorKey: 'status',
                    header: 'Status',
                    footer: props => props.column.id,
                },
                {
                    accessorKey: 'progress',
                    header: 'Profile Progress',
                    footer: props => props.column.id,
                },
                ],
            },
        ],
    },
]



const TaskTable = () => {
    const { tasks, users, projects, tableSorting, handleTableSort } = useGlobalContext()
    const [data, setData] = useState(() => [...defaultData])
    const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns,])

    const [columnResizeMode, setColumnResizeMode] = useState<ColumnResizeMode>('onChange')

    const rerender = useReducer(() => ({}), {})[1]

    const table = useReactTable({
        data,
        columns,
        columnResizeMode,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
    })

    return (
        <>  
            <table 
                {...{
                    style: {
                    width: table.getCenterTotalSize(),
                    },
                }}
            >
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th
                                {...{
                                    key: header.id,
                                    colSpan: header.colSpan,
                                    style: {
                                        width: header.getSize(),
                                    },
                                }}
                            >
                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
                
            </table>
        </>
    )
}

export default TaskTable;