import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, ExternalLink, Bookmark, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getHacks } from "@/services/database";
import type { Hack } from "@shared/schema";

interface HackItem {
  id: number;
  title: string;
  url: string;
  category: string;
  favicon?: string;
  description?: string;
  difficulty?: string;
  tags?: string[];
  featured?: boolean;
}

export default function Hacks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch hacks from Supabase
  const { data: hacksData = [], isLoading, error } = useQuery({
    queryKey: ['/api/hacks'],
    queryFn: () => getHacks().then(res => res.data || [])
  });

  // Transform Supabase data to match expected format
  const hackItems: HackItem[] = hacksData.map(hack => ({
    id: hack.id,
    title: hack.title,
    url: hack.url,
    category: hack.category,
    favicon: hack.favicon || `https://www.google.com/s2/favicons?domain=${new URL(hack.url).hostname}&sz=32`,
    description: hack.description,
    difficulty: hack.difficulty,
    tags: hack.tags,
    featured: hack.featured
  }));

  const categories = [
    { id: "all", name: "All", count: hackItems.length },
    { id: "platforms", name: "Platforms", count: hackItems.filter(item => item.category === "platforms").length },
    { id: "tools", name: "Tools", count: hackItems.filter(item => item.category === "tools").length },
    { id: "resources", name: "Resources", count: hackItems.filter(item => item.category === "resources").length },
    { id: "writeups", name: "Writeups", count: hackItems.filter(item => item.category === "writeups").length },
  ];

  const filteredItems = hackItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderFavicon = (item: HackItem) => {
    try {
      return (
        <img 
          src={item.favicon} 
          alt={`${item.title} favicon`}
          className="w-6 h-6 rounded"
          onError={(e) => {
            e.currentTarget.src = `https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=32`;
          }}
        />
      );
    } catch {
      return <Bookmark className="w-6 h-6 text-accent-teal" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-teal mx-auto"></div>
              <p className="mt-4 text-gray-400 font-mono">Loading hacks database...</p>
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
              <p className="text-red-400 font-mono">Error loading hacks: {error.message}</p>
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
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-accent-teal to-white bg-clip-text text-transparent">
            Cybersecurity Bookmarks
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A curated collection of cybersecurity platforms, tools, and resources for ethical hackers and security professionals.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search hacks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-accent-teal"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id 
                    ? "bg-accent-teal text-black hover:bg-accent-teal/90" 
                    : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                  }
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 transition-all duration-300 group hover:scale-[1.02]">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {renderFavicon(item)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-teal transition-colors">
                          {item.title}
                        </h3>
                        
                        {item.description && (
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                            {item.description}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline" className="border-gray-600 text-gray-300 capitalize">
                            {item.category}
                          </Badge>
                          {item.difficulty && (
                            <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                              {item.difficulty}
                            </Badge>
                          )}
                          {item.featured && (
                            <Badge className="bg-accent-teal text-black">
                              Featured
                            </Badge>
                          )}
                        </div>

                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                            {item.tags.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{item.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-accent-teal hover:text-white transition-colors group"
                    >
                      <span className="text-sm font-medium">Visit Site</span>
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No bookmarks found</h3>
            <p className="text-gray-500">
              {searchTerm 
                ? `No results for "${searchTerm}" in ${selectedCategory === "all" ? "all categories" : selectedCategory}`
                : `No bookmarks in ${selectedCategory} category`
              }
            </p>
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-16 text-center">
          <p className="text-gray-400">
            Showing {filteredItems.length} of {hackItems.length} total bookmarks
          </p>
        </div>
      </div>
    </div>
  );
}