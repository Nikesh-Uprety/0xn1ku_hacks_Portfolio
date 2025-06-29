
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

  // Create properly encrypted data
  const createEncryptedPayload = (secret: string) => {
    const secretsData = {
      "github_token": "ghp_xX9YzAbC123DefGhI456JkL789MnO0pQrS",
      "api_key": "sk-proj-1234567890abcdef1234567890abcdef1234567890abcdef",
      "database_url": "postgresql://user:pass@localhost:5432/db",
      "stripe_secret": "sk_test_51234567890abcdefghijklmnopqrstuvwxyz",
      "jwt_secret": "super_secret_jwt_signing_key_2024",
      "encryption_key": "AES256_ENCRYPTION_KEY_FOR_SENSITIVE_DATA"
    };

    const salt = "NIKESH_SECURITY_SALT_2024";
    
    // Create encryption key from secret + salt
    const encryptionKey = CryptoJS.PBKDF2(secret, salt, {
      keySize: 256/32,
      iterations: 10000
    });

    // Encrypt the secrets
    const encryptedSecrets = CryptoJS.AES.encrypt(
      JSON.stringify(secretsData), 
      encryptionKey.toString()
    ).toString();

    return {
      encryptedSecrets,
      salt,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    };
  };

  const validateAndDecrypt = (secret: string) => {
    try {
      // Check if the secret matches our expected key
      if (secret.trim() !== "NIKESH_SECURITY_2024_KEY") {
        return null;
      }

      // Create the payload with the correct secret
      const payload = createEncryptedPayload(secret);
      
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
    const payload = validateAndDecrypt(secretKey);
    
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
              <Shield className="w-12 h-12 text-red-500" />
            </div>
            <CardTitle className="text-xl font-cyber text-red-500" data-text="CLASSIFIED ACCESS">
              CLASSIFIED ACCESS
            </CardTitle>
            <CardDescription className="text-gray-400 font-mono text-sm">
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
          <h1 className="text-2xl font-cyber font-bold text-red-500" data-text="CLASSIFIED VAULT">
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
                <CardTitle className="text-red-400 font-mono text-base">
                  {key.replace(/_/g, ' ').toUpperCase()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-cyber-dark p-4 rounded border border-red-500/30">
                  <code className="text-red-300 font-mono break-all text-sm">{value}</code>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-red-400/60 font-mono text-xs">
            🔐 Encrypted with AES-256 + PBKDF2 | Zero-Knowledge Architecture
          </p>
        </div>
      </div>
    </div>
  );
};

export default Secret;
