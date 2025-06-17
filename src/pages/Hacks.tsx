import { useState } from "react";
import { ExternalLink, Calendar, Tag, Search, Filter } from "lucide-react";

interface HackItem {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
  date: string;
  tags: string[];
  featured?: boolean;
}

const hackItems: HackItem[] = [
  {
    id: 1,
    title: "TryHackMe - Pickle Rick",
    description: "Web exploitation room featuring command injection and privilege escalation techniques",
    url: "#",
    category: "CTF Writeup",
    date: "2024-01-15",
    tags: ["Web", "Command Injection", "Linux"],
    featured: true
  },
  {
    id: 2,
    title: "HackTheBox - Lame",
    description: "Classic Linux box involving Samba exploitation and distcc vulnerability analysis",
    url: "#",
    category: "CTF Writeup",
    date: "2024-01-10",
    tags: ["Linux", "SMB", "Privilege Escalation"],
    featured: true
  },
  {
    id: 3,
    title: "Burp Suite Professional Guide",
    description: "Comprehensive guide for advanced web application testing with Burp Suite",
    url: "#",
    category: "Tool Guide",
    date: "2024-01-08",
    tags: ["Web", "Burp Suite", "Testing"]
  },
  {
    id: 4,
    title: "SQL Injection Payload Collection",
    description: "Curated collection of SQL injection payloads for different database systems",
    url: "#",
    category: "Resource",
    date: "2024-01-05",
    tags: ["SQL", "Web", "Database"]
  },
  {
    id: 5,
    title: "Advanced Nmap Techniques",
    description: "Network reconnaissance using Nmap with stealth and evasion techniques",
    url: "#",
    category: "Tool Guide",
    date: "2024-01-03",
    tags: ["Network", "Reconnaissance", "Nmap"]
  },
  {
    id: 6,
    title: "Buffer Overflow Fundamentals",
    description: "Step-by-step guide to understanding and exploiting stack-based buffer overflows",
    url: "#",
    category: "Tutorial",
    date: "2024-01-01",
    tags: ["Binary", "Exploitation", "Assembly"]
  },
  {
    id: 7,
    title: "OSCP Lab Notes",
    description: "Personal notes and methodologies from OSCP lab environment",
    url: "#",
    category: "Notes",
    date: "2023-12-28",
    tags: ["OSCP", "Methodology", "Notes"]
  },
  {
    id: 8,
    title: "Active Directory Enumeration",
    description: "Comprehensive guide to AD enumeration and attack vectors",
    url: "#",
    category: "Tutorial",
    date: "2023-12-25",
    tags: ["Active Directory", "Windows", "Enumeration"]
  }
];

const categories = ["All", "CTF Writeup", "Tool Guide", "Resource", "Tutorial", "Notes"];

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

  const featuredItems = filteredItems.filter(item => item.featured);
  const regularItems = filteredItems.filter(item => !item.featured);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bookmarks
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            A curated collection of CTF writeups, security tools, and penetration testing resources I find useful.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all text-sm"
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-md text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-1">
          {filteredItems.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 rounded-md hover:bg-gray-50 transition-colors duration-150"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-base font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                      {item.title}
                    </h3>
                    <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0" />
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                      {item.category}
                    </span>
                    <span>{item.date}</span>
                    <div className="flex items-center space-x-1">
                      <span>{item.tags.join(" • ")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-2">No bookmarks found</h3>
            <p className="text-sm text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hacks;