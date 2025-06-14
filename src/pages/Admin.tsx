
import { useAuth } from '@/hooks/useAuth';
import { AdminLogin } from '@/components/AdminLogin';
import { AdminDashboard } from '@/components/AdminDashboard';
import { MatrixRain } from '@/components/MatrixRain';
import { MouseCursor } from '@/components/MouseCursor';

const Admin = () => {
  const { user, loading, isAdmin, supabaseConfigured } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-bg flex items-center justify-center">
        <div className="text-neon-green font-mono">Authenticating...</div>
      </div>
    );
  }

  if (!supabaseConfigured) {
    return (
      <div className="min-h-screen bg-cyber-bg relative overflow-hidden cursor-none">
        <MatrixRain />
        <MouseCursor />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="bg-cyber-dark border border-neon-green/50 rounded-lg p-8 max-w-md text-center">
            <h2 className="text-xl font-cyber text-neon-green mb-4">Supabase Not Configured</h2>
            <p className="text-gray-400 font-mono text-sm mb-4">
              Please connect to Supabase to enable authentication and database features.
            </p>
            <p className="text-gray-400 font-mono text-xs">
              Click the green Supabase button in the top right to get started.
            </p>
          </div>
        </div>
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
