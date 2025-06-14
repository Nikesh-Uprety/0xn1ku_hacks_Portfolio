
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Shield, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AdminLoginProps {
  onSuccess?: () => void;
}

export const AdminLogin = ({ onSuccess }: AdminLoginProps) => {
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await login(email, password);
    
    if (error) {
      toast({
        title: "Authentication Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Access Granted",
        description: "Welcome, Administrator",
      });
      onSuccess?.();
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md glass-morphism border-neon-green/50">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Shield className="w-12 h-12 text-neon-green" />
        </div>
        <CardTitle className="text-xl font-cyber text-neon-green">
          ADMIN ACCESS
        </CardTitle>
        <CardDescription className="text-gray-400 font-mono text-sm">
          JWT Authentication Required
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-mono text-neon-green">Email</label>
          <Input
            type="email"
            placeholder="admin@nikesh.dev"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-cyber-dark border-neon-green/50 text-white"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-mono text-neon-green">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter admin password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-cyber-dark border-neon-green/50 text-white pr-10"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        <Button 
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-neon-green hover:bg-neon-green/80 text-black border border-neon-green"
        >
          <Lock className="w-4 h-4 mr-2" />
          {loading ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
        </Button>
      </CardContent>
    </Card>
  );
};
