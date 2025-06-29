import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Terminal, Lock, User, Key, Power } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AdminLoginProps {
  onSuccess?: () => void;
}

export const AdminLogin = ({ onSuccess }: AdminLoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await login(email, password);
      if (error) {
        setError(error.message || "Authentication failed");
      } else {
        onSuccess?.();
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      {/* MacBook Terminal Container */}
      <div className="relative">
        {/* MacBook Frame */}
        <div className="bg-gradient-to-b from-gray-300 to-gray-400 rounded-2xl p-3 shadow-2xl">
          {/* Screen Bezel */}
          <div className="bg-black rounded-xl p-4 shadow-inner">
            {/* Terminal Window */}
            <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-lg">
              {/* Terminal Header */}
              <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Terminal className="w-4 h-4" />
                    <span className="text-sm font-mono">admin@0xn1ku_hacks</span>
                  </div>
                </div>
                <div className="text-gray-400 text-xs font-mono">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 bg-gray-900 text-green-400 font-mono text-sm">
                {/* Terminal Prompt */}
                <div className="mb-4 space-y-1">
                  <div className="text-gray-500">Last login: {new Date().toLocaleString()}</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-accent-teal">./0xn1ku_hacks ~#</span>
                    <span className="text-yellow-400">./adminlogin.py</span>
                  </div>
                  <div className="text-gray-400">Initializing secure authentication protocol...</div>
                  <div className="text-green-400">✓ SSH tunnel established</div>
                  <div className="text-green-400">✓ Encryption keys loaded</div>
                  <div className="text-yellow-400 mb-4">→ Awaiting administrator credentials</div>
                </div>

                {/* Login Form */}
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-2">
                      <Lock className="w-5 h-5 text-accent-teal" />
                      <CardTitle className="text-white font-mono text-lg">
                        Admin Authentication
                      </CardTitle>
                    </div>
                    <CardDescription className="text-gray-400 font-mono text-sm">
                      Enter your credentials to access the control panel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {error && (
                        <Alert className="bg-red-900/20 border-red-500/50 text-red-400">
                          <AlertDescription className="font-mono text-sm">
                            <span className="text-red-500">ERROR:</span> {error}
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300 font-mono flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Email Address</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="admin@domain.com"
                          className="bg-gray-800/50 border-gray-600 text-green-400 font-mono placeholder:text-gray-500 focus:border-accent-teal focus:ring-accent-teal/20"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-300 font-mono flex items-center space-x-2">
                          <Key className="w-4 h-4" />
                          <span>Password</span>
                        </Label>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="bg-gray-800/50 border-gray-600 text-green-400 font-mono placeholder:text-gray-500 focus:border-accent-teal focus:ring-accent-teal/20"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-accent-teal hover:bg-accent-teal/90 text-black font-mono font-semibold py-3 transition-all duration-200 transform hover:scale-[1.02]"
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Authenticating...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Power className="w-4 h-4" />
                            <span>Execute Login</span>
                          </div>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Terminal Footer */}
                <div className="mt-6 text-xs text-gray-500 font-mono space-y-1">
                  <div>Security Level: Maximum</div>
                  <div>Session: Encrypted</div>
                  <div>Status: <span className="text-yellow-400">Waiting for input</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MacBook Base Reflection */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent rounded-full opacity-30"></div>
      </div>
    </div>
  );
};