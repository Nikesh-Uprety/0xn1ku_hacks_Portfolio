
import { useAuth } from '@/hooks/useAuth';
import { AdminLogin } from '@/components/AdminLogin';
import { AdminDashboard } from '@/components/AdminDashboard';
import { MatrixRain } from '@/components/MatrixRain';
import { MouseCursor } from '@/components/MouseCursor';

const Admin = () => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-bg flex items-center justify-center">
        <div className="text-neon-green font-mono">Authenticating...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-cyber-bg relative overflow-hidden cursor-none">
        <MatrixRain />
        <MouseCursor />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <AdminLogin />
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
};

export default Admin;
