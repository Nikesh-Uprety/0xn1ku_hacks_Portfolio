import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";

const Secret = () => {
  const { toast } = useToast();
  const [secretKey, setSecretKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [passwords, setPasswords] = useState<Record<string, string>>({});

  // Hardcoded JWT token with embedded secrets (in real app, this would come from server)
  const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXRzIjp7ImFkbWluX3Bhc3MiOiJTdXBlclNlY3VyZTEyMyEiLCJkYl9wYXNzIjoiTXlEQl9QYXNTQG9yZDIwMjQiLCJhcGlfa2V5IjoiYWs0N2Y4ZzJoNWo5azJsMW00bjhwcTNyNnM3dDl3MXgiLCJzc2hfa2V5IjoicnNhLXNoYTI1Ni0yMDQ4LWJpdC1rZXkiLCJiYWNrdXBfcGFzcyI6IkJhY2t1cF9TZWN1cml0eV8yMDI0In0sImlhdCI6MTcwNzY5NjAwMCwiZXhwIjoxNzM5MjMyMDAwfQ.8kO6B5C2H8vJ3mE5rP7uT9xL4nA1fS6dM8qW2oI9YzU";

  const validateJWT = (token: string, secret: string) => {
    try {
      // Simple JWT validation (in real app, use proper JWT library)
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = JSON.parse(atob(parts[1]));
      
      // Check if the secret matches our expected key
      if (secret.trim() === "NIKESH_SECURITY_2024_KEY") {
        return payload;
      }
      return null;
    } catch (error) {
      console.error("JWT validation error:", error);
      return null;
    }
  };

  const handleAuthentication = () => {
    console.log("Attempting authentication with key:", secretKey);
    const payload = validateJWT(jwtToken, secretKey);
    
    if (payload && payload.secrets) {
      setPasswords(payload.secrets);
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to the classified section",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid secret key. Try: NIKESH_SECURITY_2024_KEY",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswords({});
    setSecretKey("");
    toast({
      title: "Logged Out",
      description: "Session terminated",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cyber-bg relative flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50"></div>
        <Card className="w-full max-w-md glass-morphism border-red-500/50 relative z-10">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="w-16 h-16 text-red-500" />
            </div>
            <CardTitle className="text-2xl font-cyber text-red-500 glitch-text" data-text="CLASSIFIED ACCESS">
              CLASSIFIED ACCESS
            </CardTitle>
            <CardDescription className="text-gray-400 font-mono">
              JWT Secret Key Required
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-mono text-red-400">Secret Key</label>
              <div className="relative">
                <Input
                  type={showKey ? "text" : "password"}
                  placeholder="Enter JWT secret key..."
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="bg-cyber-dark border-red-500/50 text-white pr-10"
                  onKeyPress={(e) => e.key === 'Enter' && handleAuthentication()}
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <Button 
              onClick={handleAuthentication}
              className="w-full bg-red-600 hover:bg-red-700 text-white border border-red-500"
            >
              <Lock className="w-4 h-4 mr-2" />
              AUTHENTICATE
            </Button>

            <div className="text-center">
              <p className="text-xs text-green-400 font-mono border border-green-400/30 bg-green-400/10 p-2 rounded">
                Key: NIKESH_SECURITY_2024_KEY
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-bg relative">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-cyber font-bold text-red-500 glitch-text" data-text="CLASSIFIED VAULT">
            CLASSIFIED VAULT
          </h1>
          <Button onClick={handleLogout} variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/20">
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {Object.entries(passwords).map(([key, value]) => (
            <Card key={key} className="glass-morphism border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-400 font-mono text-lg">
                  {key.replace(/_/g, ' ').toUpperCase()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-cyber-dark p-4 rounded border border-red-500/30">
                  <code className="text-red-300 font-mono break-all">{value}</code>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-red-400/60 font-mono text-sm">
            ⚠️ These credentials are for demonstration purposes only ⚠️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Secret;
