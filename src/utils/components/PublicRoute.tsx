import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/context';
import { LoadingSpinner } from '@/components/ui';

type PublicRouteProps = {
  redirectTo?: string;
};

const PublicRoute = ({ redirectTo = '/dashboard' }: PublicRouteProps) => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className='min-h-screen w-full items-center flex justify-center'>
        <LoadingSpinner size={20} />
      </div>
    );
  }

  return session ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

export default PublicRoute;
