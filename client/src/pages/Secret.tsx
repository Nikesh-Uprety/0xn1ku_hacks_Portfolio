import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, Lock, Eye, EyeOff, Key, Search, Terminal } from "lucide-react";
import { getSecrets } from "@/services/database";
import type { Secret as SecretType } from "@shared/schema";
import CryptoJS from 'crypto-js';

const Secret = () => {
  const { toast } = useToast();
  const [masterKey, setMasterKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMasterKey, setShowMasterKey] = useState(false);
  const [decryptedSecrets, setDecryptedSecrets] = useState<Record<number, string>>({});
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch secrets from Supabase
  const { data: secretsData = [], isLoading, error } = useQuery({
    queryKey: ['/api/secrets'],
    queryFn: () => getSecrets().then(res => res.data || []),
    enabled: isAuthenticated
  });

  const validateMasterKey = (key: string) => {
    // Simple validation - in production, this would be more sophisticated
    const validKeys = ["0xN1kU_H4X_!", "admin", "nikesh2024", "cyberdefense"];
    return validKeys.includes(key);
  };

  const handleAuthentication = () => {
    if (validateMasterKey(masterKey)) {
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to the secure vault",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid master key",
        variant: "destructive",
      });
    }
  };

  const decryptSecret = (secret: SecretType) => {
    if (!secret.encrypted) {
      return secret.value;
    }

    try {
      // Use the master key to decrypt
      const decrypted = CryptoJS.AES.decrypt(secret.value, masterKey).toString(CryptoJS.enc.Utf8);
      return decrypted || secret.value; // Fallback to original if decryption fails
    } catch (error) {
      return secret.value; // Fallback if decryption error
    }
  };

  const toggleSecretVisibility = (secretId: number) => {
    if (decryptedSecrets[secretId]) {
      // Hide secret
      setDecryptedSecrets(prev => {
        const updated = { ...prev };
        delete updated[secretId];
        return updated;
      });
    } else {
      // Show/decrypt secret
      const secret = secretsData.find(s => s.id === secretId);
      if (secret) {
        const decrypted = decryptSecret(secret);
        setDecryptedSecrets(prev => ({
          ...prev,
          [secretId]: decrypted
        }));
      }
    }
  };

  const filteredSecrets = secretsData.filter(secret =>
    secret.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    secret.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    secret.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(secretsData.map(s => s.category)));

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
        <div className="relative">
          {/* Terminal Authentication Interface */}
          <div className="bg-gradient-to-b from-gray-300 to-gray-400 rounded-2xl p-3 shadow-2xl">
            <div className="bg-black rounded-xl p-4 shadow-inner">
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
                      <span className="text-sm font-mono">vault@secure-systems</span>
                    </div>
                  </div>
                </div>

                {/* Terminal Content */}
                <div className="p-8 bg-gray-900 text-green-400 font-mono text-sm">
                  <div className="mb-6 space-y-1">
                    <div className="text-red-400">⚠ WARNING: Classified Information Access ⚠</div>
                    <div className="text-gray-500">System: SecureVault v3.1.4</div>
                    <div className="text-gray-500">Authentication Required</div>
                    <div className="text-yellow-400">→ Enter master key to proceed</div>
                  </div>

                  <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-6 h-6 text-red-500" />
                        <CardTitle className="text-white font-mono text-xl">
                          Secure Vault Access
                        </CardTitle>
                      </div>
                      <CardDescription className="text-gray-400 font-mono">
                        This vault contains encrypted secrets and sensitive data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            type={showMasterKey ? "text" : "password"}
                            placeholder="Enter master key..."
                            value={masterKey}
                            onChange={(e) => setMasterKey(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleAuthentication()}
                            className="pl-10 pr-12 bg-gray-800/50 border-gray-600 text-green-400 font-mono placeholder:text-gray-500 focus:border-red-500"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowMasterKey(!showMasterKey)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-gray-700"
                          >
                            {showMasterKey ? 
                              <EyeOff className="w-4 h-4 text-gray-400" /> : 
                              <Eye className="w-4 h-4 text-gray-400" />
                            }
                          </Button>
                        </div>

                        <Button
                          onClick={handleAuthentication}
                          disabled={!masterKey}
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-mono font-semibold py-3"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Access Vault
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="mt-6 text-xs text-gray-500 font-mono space-y-1">
                    <div>Security Level: Maximum</div>
                    <div>Encryption: AES-256</div>
                    <div>Status: <span className="text-red-400">Locked</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
              <p className="mt-4 text-gray-400 font-mono">Decrypting vault...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <p className="text-red-400 font-mono">Error accessing vault: {error.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-red-400 font-mono">
              🔐 Secure Vault
            </h1>
            <p className="text-gray-400 font-mono">
              Access granted • {secretsData.length} secrets loaded
            </p>
          </div>
          <Button
            onClick={() => setIsAuthenticated(false)}
            variant="outline"
            className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white font-mono"
          >
            <Lock className="w-4 h-4 mr-2" />
            Lock Vault
          </Button>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search secrets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-red-500 font-mono"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Badge key={category} variant="outline" className="border-gray-600 text-gray-300 font-mono">
              {category} ({secretsData.filter(s => s.category === category).length})
            </Badge>
          ))}
        </div>

        {/* Secrets Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSecrets.map((secret) => (
            <Card key={secret.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Key className="w-5 h-5 text-red-400" />
                    <CardTitle className="text-white font-mono text-lg">
                      {secret.key}
                    </CardTitle>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={secret.encrypted ? "destructive" : "secondary"} className="font-mono text-xs">
                      {secret.encrypted ? "Encrypted" : "Plain"}
                    </Badge>
                  </div>
                </div>
                {secret.description && (
                  <CardDescription className="text-gray-400 font-mono">
                    {secret.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm font-mono">Value:</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSecretVisibility(secret.id)}
                        className="hover:bg-gray-700"
                      >
                        {decryptedSecrets[secret.id] ? 
                          <EyeOff className="w-4 h-4 text-gray-400" /> : 
                          <Eye className="w-4 h-4 text-gray-400" />
                        }
                      </Button>
                    </div>
                    <div className="bg-gray-800 rounded p-2 border">
                      <code className="text-sm font-mono text-green-400 break-all">
                        {decryptedSecrets[secret.id] || '•'.repeat(32)}
                      </code>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
                    <span>Category: {secret.category}</span>
                    <span>ID: {secret.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredSecrets.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No secrets found</h3>
            <p className="text-gray-500 font-mono">
              {searchTerm 
                ? `No results for "${searchTerm}"`
                : "No secrets in the vault"
              }
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 font-mono">
            Showing {filteredSecrets.length} of {secretsData.length} total secrets
          </p>
        </div>
      </div>
    </div>
  );
};

export default Secret;