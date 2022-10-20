import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainApp from './Route/MainApp/MainApp'
import Login from './Route/Login/Login'

function App() {
    return (
        <Routes>
            <Route path='/main' element={<MainApp />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    );
}

export default App;
