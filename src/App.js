import React from "react";
import { Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tasks from "./pages/Tasks";
import DetailWindow from "./components/DetailWindow";

const App = () => {
  return (
    <div className='parent'>
      <Sidebar />
      <div className='main'>
          <Navbar />
          <DetailWindow />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tasks' element={<Tasks />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
