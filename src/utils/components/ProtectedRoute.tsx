import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/context';

type ProtectedRouteProps = {
  redirectTo?: string;
};

const ProtectedRoute = ({ redirectTo = '/sign-in' }: ProtectedRouteProps) => {
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return session ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
