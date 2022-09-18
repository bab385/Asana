import React from 'react';
import { useGlobalContext } from '../context';

const DetailWindow = () => {
    const { showDetailWindow, toggleDetailWindow } = useGlobalContext()

    return (
        <div className={`detail-window-container ${showDetailWindow ? 'show-detail-window' : ''}`}>
            <div>
                <div className='flex detail-window-nav'>
                    <div>
                        <button>Mark Completed</button>
                    </div>
                    <div className='flex'>
                        <div><button>1</button></div>
                        <div><button>2</button></div>
                        <div><button>3</button></div>
                        <div><button>4</button></div>
                        <div><button>5</button></div>
                        <div><button onClick={toggleDetailWindow}>Close</button></div>
                    </div>
                </div>
                <div>Assignee</div> 
            </div>
        </div>
    )
}

export default DetailWindow;