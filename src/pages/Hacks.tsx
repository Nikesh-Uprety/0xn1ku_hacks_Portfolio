
import { useState } from "react";
import { ExternalLink, Calendar, Tag } from "lucide-react";

interface HackItem {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
  date: string;
  tags: string[];
}

const hackItems: HackItem[] = [
  {
    id: 1,
    title: "TryHackMe - Pickle Rick",
    description: "Web exploitation room featuring command injection and privilege escalation",
    url: "#",
    category: "CTF Writeup",
    date: "2024-01-15",
    tags: ["Web", "Command Injection", "Linux"]
  },
  {
    id: 2,
    title: "HackTheBox - Lame",
    description: "Classic Linux box involving Samba exploitation and distcc vulnerability",
    url: "#",
    category: "CTF Writeup",
    date: "2024-01-10",
    tags: ["Linux", "SMB", "Privilege Escalation"]
  },
  {
    id: 3,
    title: "Burp Suite Cheat Sheet",
    description: "Comprehensive guide for web application testing with Burp Suite",
    url: "#",
    category: "Tool",
    date: "2024-01-08",
    tags: ["Web", "Burp Suite", "Testing"]
  },
  {
    id: 4,
    title: "SQL Injection Payloads",
    description: "Collection of SQL injection payloads for different database systems",
    url: "#",
    category: "Resource",
    date: "2024-01-05",
    tags: ["SQL", "Web", "Database"]
  },
  {
    id: 5,
    title: "Nmap Scanning Techniques",
    description: "Advanced network reconnaissance using Nmap with stealth techniques",
    url: "#",
    category: "Tool",
    date: "2024-01-03",
    tags: ["Network", "Reconnaissance", "Nmap"]
  },
  {
    id: 6,
    title: "Buffer Overflow Basics",
    description: "Step-by-step guide to understanding and exploiting buffer overflows",
    url: "#",
    category: "Tutorial",
    date: "2024-01-01",
    tags: ["Binary", "Exploitation", "Assembly"]
  }
];

const categories = ["All", "CTF Writeup", "Tool", "Resource", "Tutorial"];

const Hacks = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = hackItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Hacks & Writeups</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            A curated collection of CTF writeups, security tools, and hacking resources
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search hacks, tools, and writeups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-accent-teal transition-colors"
          />
          
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-mono transition-colors ${
                  selectedCategory === category
                    ? 'bg-accent-teal text-dark-bg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid gap-4 md:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-accent-teal/50 transition-all duration-200 hover:transform hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold text-white group-hover:text-accent-teal transition-colors">
                      {item.title}
                    </h2>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-accent-teal transition-colors" />
                  </div>
                  
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                    <span className="px-2 py-1 bg-gray-800 rounded text-accent-teal font-mono text-xs">
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-accent-teal/10 text-accent-teal rounded text-xs font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <a
                href={item.url}
                className="absolute inset-0 rounded-lg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read ${item.title}`}
              />
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-mono">No items found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hacks;
