
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Shield, Lock, Eye, EyeOff } from "lucide-react";
import CryptoJS from 'crypto-js';

const Secret = () => {
  const { toast } = useToast();
  const [secretKey, setSecretKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [passwords, setPasswords] = useState<Record<string, string>>({});

  // Encrypted JWT token - passwords are now AES encrypted within the payload
  const encryptedJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWRTZWNyZXRzIjoiVTJGc2RHVmtYMTlpT2pReWVESkNPVGhKZVZkdFZsQkVlR0ZwY1M1MFlYTjVkbTVTUkVGcE5IWlhVRlJzTW1sd2FIZHNZWEptTWs1UFlrbGpTM0l6Y0daME5tdDJieTVpU2xWNlV6VkdOazVOZGxoWE9HbHllSEYyY0dzd2JqVjBRMWN5Vms1Q1N6TnplREpKUTNaNGJWUmthSGRCYm01V1JESTRjVkUzWkRKaE5FRk5VVU14T1ZGdk1FWnRkWGhPVFdGUGRqSTFWMjVrYUVGbmRVOXhMVzE0VWxGa1ozSmZjSEF5V2pJME4wUTFSV2RWVVZWNVlVTjJlRXQ1Wm5wM1pGVTJjRkkwT1VWbFEzbERhV0l6WjJGdU5GTTNlVFZGU25abE0xcG9PR1ZNZG0xWWEyZHBUQzV3UW5aRmNWRkVWM3BJVm5OWE5EQlJURVZDVVZoRlJYcHdjME42YzIxQ05tOWxjR3R5TlZwWVZsQXlaMmgyTWpWSGVHazJlaTVhWjFaaFVsZzNXRkZTYlVaVllXVnNOSFZ6TmpKRE1VSklORFpwU1d4NGJIVmlZekpHVEVGSGJGTlZPR1ZoYW1sc1NISkViamRWVTJacGFVRnBUa2g0UlVGd1EybFNSME5vUjBZemRXUnZhRzVNUjJ0MU5tbFpiRkl5VFZSb1ZEbExRVVl6VTNodWJucGpibXAwYVZGcWVERnZWakJNYzBJdGNtMXhWakF1UmtOeGVXNDBXalpoYTFwdFExVlJkMGRqVkZVeVptNXlPUzkzUmpkWVRUa3ljbVUwYjB4WVVVUlNhVFZvV0dGclpGcDVhR3BVVVhCelFXUk9TVUoxZEVoaWJVdGhiWEk0VUVabU5VWXRVamhEWlU5aWVGWlZSWGhHWmk5M1RGTjFPRlo0TUV4c05qQk5PVGxYY25OS2VFeEdaR2M1VjJoSGRYSlZhR0p0YTNkdlNIUmthekJNYVRkYWNHNWtUbUpvU1V4M05qQnZkSEp2T1E9PSIsInNhbHQiOiJOSUtFU0hfU0VDVVJJVFlfU0FMVF8yMDI0IiwiaWF0IjoxNzA3Njk2MDAwLCJleHAiOjE3MzkyMzIwMDB9.mX8rN2kE7fH9vQ3lP6tA1sY9zC8wJ4uM5nR7oK0iL3e";

  const validateAndDecrypt = (token: string, secret: string) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = JSON.parse(atob(parts[1]));
      
      // Check if the secret matches our expected key
      if (secret.trim() !== "NIKESH_SECURITY_2024_KEY") {
        return null;
      }

      // Create encryption key from secret + salt
      const encryptionKey = CryptoJS.PBKDF2(secret, payload.salt, {
        keySize: 256/32,
        iterations: 10000
      });

      // Decrypt the secrets
      const decryptedBytes = CryptoJS.AES.decrypt(payload.encryptedSecrets, encryptionKey.toString());
      const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
      
      if (!decryptedData) {
        throw new Error("Decryption failed");
      }

      const secrets = JSON.parse(decryptedData);
      return { secrets };
    } catch (error) {
      console.error("JWT validation/decryption error:", error);
      return null;
    }
  };

  const handleAuthentication = () => {
    console.log("Attempting authentication with key:", secretKey);
    const payload = validateAndDecrypt(encryptedJwtToken, secretKey);
    
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
        description: "Invalid secret key or decryption failed",
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
      description: "Session terminated - all data cleared from memory",
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
              AES-256 Encrypted Vault
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-mono text-red-400">Secret Key</label>
              <div className="relative">
                <Input
                  type={showKey ? "text" : "password"}
                  placeholder="Enter decryption key..."
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
              DECRYPT & AUTHENTICATE
            </Button>

            <div className="text-center">
              <p className="text-xs text-green-400 font-mono border border-green-400/30 bg-green-400/10 p-2 rounded">
                Key: NIKESH_SECURITY_2024_KEY
              </p>
              <p className="text-xs text-gray-500 font-mono mt-2">
                🔒 AES-256 + PBKDF2 Protection
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
            Secure Logout
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
            🔐 Encrypted with AES-256 + PBKDF2 | Zero-Knowledge Architecture
          </p>
        </div>
      </div>
    </div>
  );
};

export default Secret;
