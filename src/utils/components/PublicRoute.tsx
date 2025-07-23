import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/context';

type PublicRouteProps = {
  redirectTo?: string;
};

const PublicRoute = ({ redirectTo = '/dashboard' }: PublicRouteProps) => {
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return session ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

export default PublicRoute;
