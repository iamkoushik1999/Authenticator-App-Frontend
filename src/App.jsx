// import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import SignUpPage from './pages/SignUp/SignUpPage';
import HistoryPage from './pages/History/HistoryPage';
import LoginPage from './pages/Login/LoginPage.jsx';
import PrivateRoute from './routes/PrivateRoute';
import Layout from './components/Common/Layout.jsx';
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
            </Route>
            <Route path='*' element={<Navigate to='/login' replace />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
