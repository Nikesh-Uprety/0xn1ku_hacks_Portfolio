
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, Plus, Trash2, Globe, Shield, Code, Database } from "lucide-react";

interface QuickLink {
  id: number;
  name: string;
  url: string;
  category: string;
  description: string;
}

const defaultLinks: QuickLink[] = [
  {
    id: 1,
    name: "OWASP Top 10",
    url: "https://owasp.org/www-project-top-ten/",
    category: "Security",
    description: "Web application security risks"
  },
  {
    id: 2,
    name: "ExploitDB",
    url: "https://www.exploit-db.com/",
    category: "Exploits",
    description: "Vulnerability database"
  },
  {
    id: 3,
    name: "CVE Details",
    url: "https://www.cvedetails.com/",
    category: "Vulnerabilities",
    description: "CVE vulnerability database"
  },
  {
    id: 4,
    name: "Burp Suite",
    url: "https://portswigger.net/burp",
    category: "Tools",
    description: "Web application security testing"
  },
  {
    id: 5,
    name: "Kali Linux Tools",
    url: "https://www.kali.org/tools/",
    category: "Tools",
    description: "Penetration testing tools"
  },
  {
    id: 6,
    name: "CyberChef",
    url: "https://gchq.github.io/CyberChef/",
    category: "Analysis",
    description: "Data analysis and decoding"
  }
];

const categoryIcons = {
  Security: Shield,
  Exploits: Code,
  Vulnerabilities: Database,
  Tools: Code,
  Analysis: Globe,
  Default: Globe
};

const Nexus = () => {
  const { toast } = useToast();
  const [links, setLinks] = useState<QuickLink[]>(defaultLinks);
  const [newLink, setNewLink] = useState({
    name: "",
    url: "",
    category: "",
    description: ""
  });
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(links.map(link => link.category)))];

  const filteredLinks = selectedCategory === "All" 
    ? links 
    : links.filter(link => link.category === selectedCategory);

  const addLink = () => {
    if (!newLink.name || !newLink.url) {
      toast({
        title: "Error",
        description: "Name and URL are required",
        variant: "destructive",
      });
      return;
    }

    const link: QuickLink = {
      id: Date.now(),
      ...newLink,
      category: newLink.category || "Custom"
    };

    setLinks([...links, link]);
    setNewLink({ name: "", url: "", category: "", description: "" });
    
    toast({
      title: "Link Added",
      description: "Quick link has been added to your nexus",
    });
  };

  const removeLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id));
    toast({
      title: "Link Removed",
      description: "Quick link has been removed",
    });
  };

  const openLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-cyber-bg relative">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-cyber font-bold text-neon-green mb-4 glitch-text" data-text="NEXUS LINKS">
            NEXUS LINKS
          </h1>
          <p className="text-gray-300 font-mono">Your command center for essential cybersecurity resources</p>
        </div>

        {/* Add New Link Form */}
        <Card className="glass-morphism border-neon-green/30 mb-8 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-neon-green flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Add Quick Link
            </CardTitle>
            <CardDescription className="text-gray-400">Add frequently used resources to your nexus</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Link name"
                value={newLink.name}
                onChange={(e) => setNewLink({...newLink, name: e.target.value})}
                className="bg-cyber-dark border-neon-green/30 text-white"
              />
              <Input
                placeholder="Category"
                value={newLink.category}
                onChange={(e) => setNewLink({...newLink, category: e.target.value})}
                className="bg-cyber-dark border-neon-green/30 text-white"
              />
            </div>
            <Input
              placeholder="URL"
              value={newLink.url}
              onChange={(e) => setNewLink({...newLink, url: e.target.value})}
              className="bg-cyber-dark border-neon-green/30 text-white"
            />
            <Input
              placeholder="Description (optional)"
              value={newLink.description}
              onChange={(e) => setNewLink({...newLink, description: e.target.value})}
              className="bg-cyber-dark border-neon-green/30 text-white"
            />
            <Button onClick={addLink} className="cyber-button w-full">
              Add to Nexus
            </Button>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`${
                selectedCategory === category 
                  ? "bg-neon-green/20 text-neon-green border-neon-green" 
                  : "border-neon-green/30 text-gray-300 hover:text-neon-green"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLinks.map((link) => {
            const IconComponent = categoryIcons[link.category] || categoryIcons.Default;
            return (
              <Card key={link.id} className="glass-morphism border-neon-green/30 hover:border-neon-green/50 transition-all group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="w-5 h-5 text-neon-green" />
                      <CardTitle className="text-neon-green text-lg">{link.name}</CardTitle>
                    </div>
                    <Button
                      onClick={() => removeLink(link.id)}
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardDescription className="text-gray-400 text-sm">
                    {link.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-neon-green/20 text-neon-green px-2 py-1 rounded font-mono">
                      {link.category}
                    </span>
                    <Button
                      onClick={() => openLink(link.url)}
                      size="sm"
                      className="cyber-button group-hover:bg-neon-green/30"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Open
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredLinks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 font-mono">No links found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nexus;
