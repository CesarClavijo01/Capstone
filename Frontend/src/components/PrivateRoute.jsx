import {Navigate, Outlet} from 'react-router-dom';
import Spinner from './Spinner';
import {useAuthStatus} from '../hooks/useAuthStatus';

export default function PrivateRoute() {
  const {token, checkingStatus} = useAuthStatus();

  if (checkingStatus) {
     return <Spinner />;
  }

  return token ? <Outlet /> : <Navigate to='/login' />;
}