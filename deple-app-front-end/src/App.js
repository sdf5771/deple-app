import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainApp from './Route/MainApp/MainApp'
import Profile from './Route/MainApp/Profile'
import Login from './Route/Login/Login'

function App() {
    return (
        <Routes>
            <Route path='/' element={<MainApp />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    );
}

export default App;
