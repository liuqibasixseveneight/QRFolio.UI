import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/context';
import { LoadingSpinner } from '@/components/ui';

type ProtectedRouteProps = {
  redirectTo?: string;
};

const ProtectedRoute = ({ redirectTo = '/sign-in' }: ProtectedRouteProps) => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className='min-h-screen w-full items-center flex justify-center'>
        <LoadingSpinner size={20} />
      </div>
    );
  }

  return session ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default ProtectedRoute;
