import React from "react";
import BasicTabs from '../components/Tabs'

const widgetInfo = [
    {
        title: "Tasks I've assigned",
        showWidget: true,
    },
    {
        title: "My Priorities",
        showWidget: true,
    },
    {
        title: "Projects",
        showWidget: true,
    },
    {
        title: "Private Notepad",
        showWidget: true,
    }
]

const TaskWidget = () => {
    return (
        <div className="widget-container">
            <div className="widget-header">
                <div>
                    <h3>Tasks I've Assigned</h3>
                </div>
            </div>
            <div className="widget-body">
                <BasicTabs />
            </div>
        </div>
    )
}

export default TaskWidget;