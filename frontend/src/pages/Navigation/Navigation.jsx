import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import StudentInfo from '../StudentInfo/StudentInfo';

function App() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/student/:roll_no" element={<StudentInfo />} />
            </Routes>
    );
}

export default App;
