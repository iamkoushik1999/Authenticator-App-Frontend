import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('accessToken'); // Replace 'authToken' with your token key

  return token ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
