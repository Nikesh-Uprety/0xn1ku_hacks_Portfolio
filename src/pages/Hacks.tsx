import { useState } from "react";
import { Search } from "lucide-react";

interface HackItem {
  id: number;
  title: string;
  url: string;
  category: string;
  favicon?: string;
}

const hackItems: HackItem[] = [
  {
    id: 1,
    title: "TryHackMe",
    url: "https://tryhackme.com",
    category: "platforms",
    favicon: "https://www.google.com/s2/favicons?domain=tryhackme.com&sz=32"
  },
  {
    id: 2,
    title: "HackTheBox",
    url: "https://hackthebox.com",
    category: "platforms",
    favicon: "https://www.google.com/s2/favicons?domain=hackthebox.com&sz=32"
  },
  {
    id: 3,
    title: "OverTheWire",
    url: "https://overthewire.org",
    category: "platforms",
    favicon: "https://www.google.com/s2/favicons?domain=overthewire.org&sz=32"
  },
  {
    id: 4,
    title: "PicoCTF",
    url: "https://picoctf.org",
    category: "platforms",
    favicon: "https://www.google.com/s2/favicons?domain=picoctf.org&sz=32"
  },
  {
    id: 5,
    title: "Burp Suite",
    url: "https://portswigger.net/burp",
    category: "tools",
    favicon: "https://www.google.com/s2/favicons?domain=portswigger.net&sz=32"
  },
  {
    id: 6,
    title: "Nmap",
    url: "https://nmap.org",
    category: "tools",
    favicon: "https://www.google.com/s2/favicons?domain=nmap.org&sz=32"
  },
  {
    id: 7,
    title: "Metasploit",
    url: "https://metasploit.com",
    category: "tools",
    favicon: "https://www.google.com/s2/favicons?domain=metasploit.com&sz=32"
  },
  {
    id: 8,
    title: "Wireshark",
    url: "https://wireshark.org",
    category: "tools",
    favicon: "https://www.google.com/s2/favicons?domain=wireshark.org&sz=32"
  },
  {
    id: 9,
    title: "John the Ripper",
    url: "https://www.openwall.com/john/",
    category: "tools",
    favicon: "https://www.google.com/s2/favicons?domain=openwall.com&sz=32"
  },
  {
    id: 10,
    title: "OWASP Top 10",
    url: "https://owasp.org/www-project-top-ten/",
    category: "resources",
    favicon: "https://www.google.com/s2/favicons?domain=owasp.org&sz=32"
  },
  {
    id: 11,
    title: "CWE Database",
    url: "https://cwe.mitre.org",
    category: "resources",
    favicon: "https://www.google.com/s2/favicons?domain=cwe.mitre.org&sz=32"
  },
  {
    id: 12,
    title: "CVE Details",
    url: "https://cvedetails.com",
    category: "resources",
    favicon: "https://www.google.com/s2/favicons?domain=cvedetails.com&sz=32"
  },
  {
    id: 13,
    title: "Exploit Database",
    url: "https://exploit-db.com",
    category: "resources",
    favicon: "https://www.google.com/s2/favicons?domain=exploit-db.com&sz=32"
  },
  {
    id: 14,
    title: "Super Specific Feedback: How to give actionable feedback on work output",
    url: "https://newsletter.weskao.com/p/super-specific-feedback",
    category: "resources",
    favicon: "https://www.google.com/s2/favicons?domain=newsletter.weskao.com&sz=32"
  },
  {
    id: 15,
    title: "Buffer Overflow Guide",
    url: "#",
    category: "writeups",
    favicon: "📝"
  },
  {
    id: 16,
    title: "SQL Injection Techniques",
    url: "#",
    category: "writeups",
    favicon: "💉"
  },
  {
    id: 17,
    title: "Web Application Testing",
    url: "#",
    category: "writeups",
    favicon: "🌐"
  },
  {
    id: 18,
    title: "Active Directory Attacks",
    url: "#",
    category: "writeups",
    favicon: "🏢"
  }
];

const categories = [
  { key: "all", label: "all" },
  { key: "platforms", label: "platforms" },
  { key: "tools", label: "tools" },
  { key: "resources", label: "resources" },
  { key: "writeups", label: "writeups" }
];

const Hacks = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = hackItems.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const groupedItems = categories.reduce((acc, category) => {
    if (category.key === "all") return acc;
    
    const items = filteredItems.filter(item => item.category === category.key);
    if (items.length > 0) {
      acc[category.key] = items;
    }
    return acc;
  }, {} as Record<string, HackItem[]>);

  const renderFavicon = (item: HackItem) => {
    if (item.favicon?.startsWith('https://')) {
      return (
        <img 
          src={item.favicon} 
          alt=""
          className="w-4 h-4 flex-shrink-0"
          onError={(e) => {
            // Fallback to a default icon if favicon fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('hidden');
          }}
        />
      );
    }
    return (
      <span className="text-sm flex-shrink-0" role="img" aria-label="favicon">
        {item.favicon}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 font-mono">
            bookmarks
          </h1>
          <p className="text-gray-400 text-lg">
            a collection of interesting links, articles, and resources I've saved
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search bookmarks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#1a1f2e] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#64ffda]/50 focus:border-[#64ffda] text-white placeholder:text-gray-400 transition-all"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 py-2 rounded-lg text-sm font-mono transition-all ${
                selectedCategory === category.key
                  ? 'bg-[#64ffda] text-[#0A0F1C] font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a1f2e]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Bookmarks */}
        <div className="space-y-12">
          {selectedCategory === "all" ? (
            Object.entries(groupedItems).map(([categoryKey, items]) => (
              <div key={categoryKey}>
                <h2 className="text-2xl font-bold text-white mb-6 font-mono">
                  {categoryKey}
                </h2>
                <div className="space-y-1">
                  {items.map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-[#1a1f2e]/50 transition-all duration-200"
                    >
                      {renderFavicon(item)}
                      <span className="hidden text-sm">🔗</span>
                      <span className="text-gray-300 group-hover:text-[#64ffda] transition-colors font-mono">
                        {item.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 font-mono">
                {selectedCategory}
              </h2>
              <div className="space-y-1">
                {filteredItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-[#1a1f2e]/50 transition-all duration-200"
                  >
                    {renderFavicon(item)}
                    <span className="hidden text-sm">🔗</span>
                    <span className="text-gray-300 group-hover:text-[#64ffda] transition-colors font-mono">
                      {item.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2 font-mono">No bookmarks found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hacks;
