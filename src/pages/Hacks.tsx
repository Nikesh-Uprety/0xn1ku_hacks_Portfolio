
import { useState } from "react";
import { ExternalLink, Github, FileText } from "lucide-react";

interface HackItem {
  id: number;
  title: string;
  description: string;
  category: string;
  url: string;
  type: 'writeup' | 'tool' | 'note';
}

const hackItems: HackItem[] = [
  {
    id: 1,
    title: "TryHackMe: Buffer Overflow Prep",
    description: "Complete walkthrough of buffer overflow techniques and exploitation methods",
    category: "Binary Exploitation",
    url: "#",
    type: "writeup"
  },
  {
    id: 2,
    title: "Burp Suite Extensions Guide",
    description: "Essential extensions for web application security testing",
    category: "Web Security",
    url: "#",
    type: "tool"
  },
  {
    id: 3,
    title: "Active Directory Enumeration",
    description: "PowerShell and BloodHound techniques for AD reconnaissance",
    category: "Red Team",
    url: "#",
    type: "note"
  },
  {
    id: 4,
    title: "HackTheBox: Retired Machines",
    description: "Collection of detailed writeups for retired HTB machines",
    category: "Penetration Testing",
    url: "#",
    type: "writeup"
  },
  {
    id: 5,
    title: "Custom Payload Generator",
    description: "Python script for generating custom shellcode payloads",
    category: "Tool Development",
    url: "#",
    type: "tool"
  },
  {
    id: 6,
    title: "OSCP Methodology Notes",
    description: "Personal notes and methodology for OSCP preparation",
    category: "Certification",
    url: "#",
    type: "note"
  }
];

const Hacks = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const categories = [...new Set(hackItems.map(item => item.category))];
  const types = [...new Set(hackItems.map(item => item.type))];

  const filteredItems = hackItems.filter(item => {
    const categoryMatch = !selectedCategory || item.category === selectedCategory;
    const typeMatch = !selectedType || item.type === selectedType;
    return categoryMatch && typeMatch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'writeup':
        return <FileText className="w-4 h-4" />;
      case 'tool':
        return <Github className="w-4 h-4" />;
      case 'note':
        return <ExternalLink className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Hacks & Writeups</h1>
          <p className="text-gray-400 text-lg">
            Collection of security research, writeups, and tools
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 rounded-full text-sm font-mono transition-colors ${
                !selectedCategory 
                  ? 'bg-accent-teal text-dark-bg' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm font-mono transition-colors ${
                  selectedCategory === category
                    ? 'bg-accent-teal text-dark-bg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType(null)}
              className={`px-3 py-1 rounded-full text-sm font-mono transition-colors ${
                !selectedType 
                  ? 'bg-accent-teal text-dark-bg' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All Types
            </button>
            {types.map(type => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1 rounded-full text-sm font-mono transition-colors capitalize ${
                  selectedType === type
                    ? 'bg-accent-teal text-dark-bg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid gap-4">
          {filteredItems.map(item => (
            <a
              key={item.id}
              href={item.url}
              className="group bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-accent-teal transition-all duration-200 block"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-accent-teal">
                      {getTypeIcon(item.type)}
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-accent-teal transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-400 mb-3 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs font-mono">
                      {item.category}
                    </span>
                    <span className="px-2 py-1 bg-accent-teal/20 text-accent-teal rounded text-xs font-mono capitalize">
                      {item.type}
                    </span>
                  </div>
                </div>
                
                <div className="text-gray-500 group-hover:text-accent-teal transition-colors ml-4">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-mono">No items found for the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hacks;
