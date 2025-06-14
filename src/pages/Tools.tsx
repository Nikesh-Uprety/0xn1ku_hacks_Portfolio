
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Tools = () => {
  const { toast } = useToast();
  const [urlInput, setUrlInput] = useState("");
  const [urlOutput, setUrlOutput] = useState("");
  const [base64Input, setBase64Input] = useState("");
  const [base64Output, setBase64Output] = useState("");
  const [cipherInput, setCipherInput] = useState("");
  const [cipherResult, setCipherResult] = useState("");
  const [code, setCode] = useState("");
  const [codeOutput, setCodeOutput] = useState("");

  const encodeURL = () => {
    setUrlOutput(encodeURIComponent(urlInput));
  };

  const decodeURL = () => {
    try {
      setUrlOutput(decodeURIComponent(urlInput));
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid URL encoding",
        variant: "destructive",
      });
    }
  };

  const encodeBase64 = () => {
    setBase64Output(btoa(base64Input));
  };

  const decodeBase64 = () => {
    try {
      setBase64Output(atob(base64Input));
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid Base64 encoding",
        variant: "destructive",
      });
    }
  };

  const identifyCipher = () => {
    const input = cipherInput.toLowerCase();
    let results = [];

    // Basic cipher identification
    if (/^[01\s]+$/.test(input.replace(/\s/g, ''))) {
      results.push("Binary");
    }
    if (/^[0-9a-f\s]+$/i.test(input.replace(/\s/g, ''))) {
      results.push("Hexadecimal");
    }
    if (/^[a-z0-9+/]+=*$/i.test(input.replace(/\s/g, ''))) {
      results.push("Base64");
    }
    if (/^[a-z]+$/i.test(input.replace(/\s/g, ''))) {
      results.push("Caesar Cipher", "Substitution Cipher", "Vigenère Cipher");
    }
    if (/^\d+$/.test(input.replace(/\s/g, ''))) {
      results.push("Numeric Cipher", "A1Z26");
    }

    setCipherResult(results.length > 0 ? results.join(", ") : "Unknown cipher type");
  };

  const executeCode = () => {
    try {
      // Simple JavaScript execution (unsafe in real world)
      const result = eval(code);
      setCodeOutput(String(result));
    } catch (error) {
      setCodeOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-bg relative">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-cyber font-bold text-neon-green mb-4 glitch-text" data-text="CTF TOOLKIT">
            CTF TOOLKIT
          </h1>
          <p className="text-gray-300 font-mono">Essential tools for penetration testing and CTF challenges</p>
        </div>

        <Tabs defaultValue="url" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-5 bg-cyber-dark border border-neon-green/30">
            <TabsTrigger value="url" className="data-[state=active]:bg-neon-green/20 data-[state=active]:text-neon-green">URL Codec</TabsTrigger>
            <TabsTrigger value="base64" className="data-[state=active]:bg-neon-green/20 data-[state=active]:text-neon-green">Base64</TabsTrigger>
            <TabsTrigger value="cipher" className="data-[state=active]:bg-neon-green/20 data-[state=active]:text-neon-green">Cipher ID</TabsTrigger>
            <TabsTrigger value="compiler" className="data-[state=active]:bg-neon-green/20 data-[state=active]:text-neon-green">Compiler</TabsTrigger>
            <TabsTrigger value="external" className="data-[state=active]:bg-neon-green/20 data-[state=active]:text-neon-green">External</TabsTrigger>
          </TabsList>

          <TabsContent value="url" className="mt-6">
            <Card className="glass-morphism border-neon-green/30">
              <CardHeader>
                <CardTitle className="text-neon-green">URL Encoder/Decoder</CardTitle>
                <CardDescription className="text-gray-400">Encode or decode URL components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter URL to encode/decode..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="bg-cyber-dark border-neon-green/30 text-white"
                />
                <div className="flex space-x-2">
                  <Button onClick={encodeURL} className="cyber-button">Encode</Button>
                  <Button onClick={decodeURL} className="cyber-button">Decode</Button>
                </div>
                <Textarea
                  placeholder="Output will appear here..."
                  value={urlOutput}
                  readOnly
                  className="bg-cyber-dark border-neon-green/30 text-neon-green"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="base64" className="mt-6">
            <Card className="glass-morphism border-neon-green/30">
              <CardHeader>
                <CardTitle className="text-neon-green">Base64 Encoder/Decoder</CardTitle>
                <CardDescription className="text-gray-400">Encode or decode Base64 strings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter text to encode/decode..."
                  value={base64Input}
                  onChange={(e) => setBase64Input(e.target.value)}
                  className="bg-cyber-dark border-neon-green/30 text-white"
                />
                <div className="flex space-x-2">
                  <Button onClick={encodeBase64} className="cyber-button">Encode</Button>
                  <Button onClick={decodeBase64} className="cyber-button">Decode</Button>
                </div>
                <Textarea
                  placeholder="Output will appear here..."
                  value={base64Output}
                  readOnly
                  className="bg-cyber-dark border-neon-green/30 text-neon-green"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cipher" className="mt-6">
            <Card className="glass-morphism border-neon-green/30">
              <CardHeader>
                <CardTitle className="text-neon-green">Cipher Identifier</CardTitle>
                <CardDescription className="text-gray-400">Identify common cipher types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter cipher text to identify..."
                  value={cipherInput}
                  onChange={(e) => setCipherInput(e.target.value)}
                  className="bg-cyber-dark border-neon-green/30 text-white"
                />
                <Button onClick={identifyCipher} className="cyber-button">Identify Cipher</Button>
                <div className="p-4 bg-cyber-dark border border-neon-green/30 rounded">
                  <p className="text-neon-green font-mono">Possible cipher types:</p>
                  <p className="text-white mt-2">{cipherResult}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compiler" className="mt-6">
            <Card className="glass-morphism border-neon-green/30">
              <CardHeader>
                <CardTitle className="text-neon-green">JavaScript Compiler</CardTitle>
                <CardDescription className="text-gray-400">Execute JavaScript code (client-side only)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter JavaScript code..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="bg-cyber-dark border-neon-green/30 text-white font-mono"
                  rows={8}
                />
                <Button onClick={executeCode} className="cyber-button">Execute</Button>
                <div className="p-4 bg-cyber-dark border border-neon-green/30 rounded">
                  <p className="text-neon-green font-mono">Output:</p>
                  <pre className="text-white mt-2 font-mono whitespace-pre-wrap">{codeOutput}</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="external" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glass-morphism border-neon-green/30">
                <CardHeader>
                  <CardTitle className="text-neon-green">CyberChef</CardTitle>
                  <CardDescription className="text-gray-400">Advanced data manipulation toolkit</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => window.open('https://gchq.github.io/CyberChef/', '_blank')}
                    className="cyber-button w-full"
                  >
                    Open CyberChef
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-morphism border-neon-green/30">
                <CardHeader>
                  <CardTitle className="text-neon-green">RevShells</CardTitle>
                  <CardDescription className="text-gray-400">Reverse shell generator</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => window.open('https://www.revshells.com/', '_blank')}
                    className="cyber-button w-full"
                  >
                    Open RevShells
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-morphism border-neon-green/30">
                <CardHeader>
                  <CardTitle className="text-neon-green">Decode.fr</CardTitle>
                  <CardDescription className="text-gray-400">Multi-format decoder</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => window.open('https://www.decode.fr/', '_blank')}
                    className="cyber-button w-full"
                  >
                    Open Decode.fr
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass-morphism border-neon-green/30">
                <CardHeader>
                  <CardTitle className="text-neon-green">Regex101</CardTitle>
                  <CardDescription className="text-gray-400">Regular expression tester</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => window.open('https://regex101.com/', '_blank')}
                    className="cyber-button w-full"
                  >
                    Open Regex101
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Tools;
