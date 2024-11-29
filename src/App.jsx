// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/SignUp/SignUpPage';
import HistoryPage from './pages/History/HistoryPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/' element={<HistoryPage />} />
        <Route path='*' element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default App;
