// import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
// Custom Components
import Layout from './components/Common/Layout.jsx';
// Private Route
import PrivateRoute from './routes/PrivateRoute';
// Authentication Pages
import SignUpPage from './pages/SignUp/SignUpPage';
import LoginPage from './pages/Login/LoginPage.jsx';
// Home Page
import HistoryPage from './pages/History/HistoryPage';
// Authentication
import AuthenticatePage from './pages/Authenticate/AuthenticatePage.jsx';
// React Hot Toast
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      <div>
        {/* React Hot Toast Toaster */}
        <Toaster
          position='top-right'
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />

        {/* Application Routes */}
        <Routes>
          <Route element={<Layout />}>
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path='/' element={<HistoryPage />} />
              <Route path='/authenticate' element={<AuthenticatePage />} />
            </Route>
            <Route path='*' element={<Navigate to='/' replace />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
