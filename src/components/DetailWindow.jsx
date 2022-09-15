import React from 'react';
import { useGlobalContext } from '../context';

const DetailWindow = () => {
    const { showDetailWindow } = useGlobalContext()

    return (
        <div className={`detail-window-container ${showDetailWindow ? 'show-detail-window' : ''}`}>
            Hello World
        </div>
    )
}

export default DetailWindow;