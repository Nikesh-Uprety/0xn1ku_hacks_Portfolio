import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { 
  getBlogs, createBlog, updateBlog, deleteBlog,
  getHacks, createHack, updateHack, deleteHack,
  getSecrets, createSecret, updateSecret, deleteSecret,
  Blog, Hack, Secret
} from '@/services/database';
import { 
  Trash2, 
  Edit, 
  Plus, 
  LogOut, 
  FileText, 
  Shield, 
  Key, 
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  User,
  Activity,
  Database,
  Settings
} from 'lucide-react';

export const AdminDashboard = () => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [hacks, setHacks] = useState<Hack[]>([]);
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [blogsRes, hacksRes, secretsRes] = await Promise.all([
      getBlogs(),
      getHacks(),
      getSecrets()
    ]);
    
    if (blogsRes.data) setBlogs(blogsRes.data);
    if (hacksRes.data) setHacks(hacksRes.data);
    if (secretsRes.data) setSecrets(secretsRes.data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logged Out",
      description: "Session terminated successfully",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F1C] flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-[#64ffda] rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-[#64ffda] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-[#64ffda] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          <span className="text-[#64ffda] font-mono text-sm ml-3">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0D1117] sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#64ffda] rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
                  <p className="text-sm text-gray-400">Content Management System</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 bg-[#1C2128] border-gray-700 text-white placeholder:text-gray-400 focus:border-[#64ffda] focus:ring-[#64ffda]/20"
                />
              </div>
              
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#0D1117] border-gray-800 hover:border-gray-700 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Blogs</p>
                  <p className="text-2xl font-semibold text-white">{blogs.length}</p>
                </div>
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0D1117] border-gray-800 hover:border-gray-700 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Security Hacks</p>
                  <p className="text-2xl font-semibold text-white">{hacks.length}</p>
                </div>
                <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0D1117] border-gray-800 hover:border-gray-700 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Secrets</p>
                  <p className="text-2xl font-semibold text-white">{secrets.length}</p>
                </div>
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                  <Key className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0D1117] border-gray-800 hover:border-gray-700 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Items</p>
                  <p className="text-2xl font-semibold text-white">{blogs.length + hacks.length + secrets.length}</p>
                </div>
                <div className="w-10 h-10 bg-[#64ffda]/10 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-[#64ffda]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="blogs" className="space-y-6">
          <TabsList className="bg-[#0D1117] border border-gray-800 p-1 h-auto">
            <TabsTrigger 
              value="blogs" 
              className="data-[state=active]:bg-[#1C2128] data-[state=active]:text-white text-gray-400 px-4 py-2.5 rounded-md transition-all"
            >
              <FileText className="w-4 h-4 mr-2" />
              Blogs
              <span className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                {blogs.length}
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="hacks" 
              className="data-[state=active]:bg-[#1C2128] data-[state=active]:text-white text-gray-400 px-4 py-2.5 rounded-md transition-all"
            >
              <Shield className="w-4 h-4 mr-2" />
              Hacks
              <span className="ml-2 px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                {hacks.length}
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="secrets" 
              className="data-[state=active]:bg-[#1C2128] data-[state=active]:text-white text-gray-400 px-4 py-2.5 rounded-md transition-all"
            >
              <Key className="w-4 h-4 mr-2" />
              Secrets
              <span className="ml-2 px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">
                {secrets.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blogs" className="space-y-6">
            <BlogsPanel blogs={blogs} onRefresh={loadData} searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="hacks" className="space-y-6">
            <HacksPanel hacks={hacks} onRefresh={loadData} searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="secrets" className="space-y-6">
            <SecretsPanel secrets={secrets} onRefresh={loadData} searchTerm={searchTerm} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const BlogsPanel = ({ blogs, onRefresh, searchTerm }: { blogs: Blog[], onRefresh: () => void, searchTerm: string }) => {
  const { toast } = useToast();
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', author: 'Nikesh Uprety', published: false });

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateBlog = async () => {
    const { error } = await createBlog(newBlog);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Blog created successfully" });
      setNewBlog({ title: '', content: '', author: 'Nikesh Uprety', published: false });
      setShowCreateForm(false);
      onRefresh();
    }
  };

  const handleDeleteBlog = async (id: string) => {
    const { error } = await deleteBlog(id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Blog deleted successfully" });
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Blog Posts</h2>
          <p className="text-sm text-gray-400">Manage your blog content</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-[#64ffda] text-black hover:bg-[#64ffda]/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Blog
        </Button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <Card className="bg-[#0D1117] border-gray-800">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Create New Blog</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Blog title..."
              value={newBlog.title}
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              className="bg-[#1C2128] border-gray-700 text-white placeholder:text-gray-400"
            />
            <Textarea
              placeholder="Blog content..."
              value={newBlog.content}
              onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
              className="bg-[#1C2128] border-gray-700 text-white placeholder:text-gray-400 min-h-32"
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-gray-400">
                <input
                  type="checkbox"
                  checked={newBlog.published}
                  onChange={(e) => setNewBlog({ ...newBlog, published: e.target.checked })}
                  className="rounded border-gray-700 bg-[#1C2128] text-[#64ffda] focus:ring-[#64ffda]/20"
                />
                <span>Publish immediately</span>
              </label>
              <Button onClick={handleCreateBlog} className="bg-[#64ffda] text-black hover:bg-[#64ffda]/90">
                Create Blog
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Blogs List */}
      <div className="space-y-4">
        {filteredBlogs.length === 0 ? (
          <Card className="bg-[#0D1117] border-gray-800">
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No blogs found</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm ? 'No blogs match your search criteria.' : 'Get started by creating your first blog post.'}
              </p>
              {!searchTerm && (
                <Button 
                  onClick={() => setShowCreateForm(true)}
                  className="bg-[#64ffda] text-black hover:bg-[#64ffda]/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Blog
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredBlogs.map((blog) => (
            <Card key={blog.id} className="bg-[#0D1117] border-gray-800 hover:border-gray-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-white truncate">{blog.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        blog.published 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                      {blog.content.substring(0, 150)}...
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => setEditingBlog(blog)}
                      className="text-gray-400 hover:text-white hover:bg-gray-800"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

const HacksPanel = ({ hacks, onRefresh, searchTerm }: { hacks: Hack[], onRefresh: () => void, searchTerm: string }) => {
  const { toast } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newHack, setNewHack] = useState({
    title: '',
    description: '',
    difficulty: 'beginner' as const,
    category: '',
    tools: [] as string[]
  });

  const filteredHacks = hacks.filter(hack => 
    hack.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hack.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateHack = async () => {
    const { error } = await createHack(newHack);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Hack created successfully" });
      setNewHack({ title: '', description: '', difficulty: 'beginner', category: '', tools: [] });
      setShowCreateForm(false);
      onRefresh();
    }
  };

  const handleDeleteHack = async (id: string) => {
    const { error } = await deleteHack(id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Hack deleted successfully" });
      onRefresh();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Security Hacks</h2>
          <p className="text-sm text-gray-400">Manage security techniques and exploits</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-[#64ffda] text-black hover:bg-[#64ffda]/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Hack
        </Button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <Card className="bg-[#0D1117] border-gray-800">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Create New Hack</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Hack title..."
              value={newHack.title}
              onChange={(e) => setNewHack({ ...newHack, title: e.target.value })}
              className="bg-[#1C2128] border-gray-700 text-white placeholder:text-gray-400"
            />
            <Textarea
              placeholder="Hack description..."
              value={newHack.description}
              onChange={(e) => setNewHack({ ...newHack, description: e.target.value })}
              className="bg-[#1C2128] border-gray-700 text-white placeholder:text-gray-400"
            />
            <div className="grid grid-cols-2 gap-4">
              <Select value={newHack.difficulty} onValueChange={(value: any) => setNewHack({ ...newHack, difficulty: value })}>
                <SelectTrigger className="bg-[#1C2128] border-gray-700 text-white">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent className="bg-[#1C2128] border-gray-700">
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Category..."
                value={newHack.category}
                onChange={(e) => setNewHack({ ...newHack, category: e.target.value })}
                className="bg-[#1C2128] border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleCreateHack} className="bg-[#64ffda] text-black hover:bg-[#64ffda]/90">
                Create Hack
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hacks List */}
      <div className="space-y-4">
        {filteredHacks.length === 0 ? (
          <Card className="bg-[#0D1117] border-gray-800">
            <CardContent className="p-12 text-center">
              <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No hacks found</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm ? 'No hacks match your search criteria.' : 'Get started by creating your first security hack.'}
              </p>
              {!searchTerm && (
                <Button 
                  onClick={() => setShowCreateForm(true)}
                  className="bg-[#64ffda] text-black hover:bg-[#64ffda]/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Hack
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredHacks.map((hack) => (
            <Card key={hack.id} className="bg-[#0D1117] border-gray-800 hover:border-gray-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-white truncate">{hack.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(hack.difficulty)}`}>
                        {hack.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{hack.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="bg-gray-800 px-2 py-1 rounded">{hack.category}</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(hack.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleDeleteHack(hack.id)}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

const SecretsPanel = ({ secrets, onRefresh, searchTerm }: { secrets: Secret[], onRefresh: () => void, searchTerm: string }) => {
  const { toast } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newSecret, setNewSecret] = useState({ key: '', value: '', description: '' });

  const filteredSecrets = secrets.filter(secret => 
    secret.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    secret.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateSecret = async () => {
    const { error } = await createSecret(newSecret);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Secret created successfully" });
      setNewSecret({ key: '', value: '', description: '' });
      setShowCreateForm(false);
      onRefresh();
    }
  };

  const handleDeleteSecret = async (id: string) => {
    const { error } = await deleteSecret(id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Secret deleted successfully" });
      onRefresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Secrets</h2>
          <p className="text-sm text-gray-400">Manage sensitive information securely</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="bg-red-600 text-white hover:bg-red-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Secret
        </Button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <Card className="bg-[#0D1117] border-red-500/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-red-400">Create New Secret</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Secret key..."
              value={newSecret.key}
              onChange={(e) => setNewSecret({ ...newSecret, key: e.target.value })}
              className="bg-[#1C2128] border-red-500/50 text-white placeholder:text-gray-400"
            />
            <Input
              placeholder="Secret value..."
              type="password"
              value={newSecret.value}
              onChange={(e) => setNewSecret({ ...newSecret, value: e.target.value })}
              className="bg-[#1C2128] border-red-500/50 text-white placeholder:text-gray-400"
            />
            <Input
              placeholder="Description..."
              value={newSecret.description}
              onChange={(e) => setNewSecret({ ...newSecret, description: e.target.value })}
              className="bg-[#1C2128] border-red-500/50 text-white placeholder:text-gray-400"
            />
            <div className="flex justify-end">
              <Button onClick={handleCreateSecret} className="bg-red-600 text-white hover:bg-red-700">
                Create Secret
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Secrets List */}
      <div className="space-y-4">
        {filteredSecrets.length === 0 ? (
          <Card className="bg-[#0D1117] border-gray-800">
            <CardContent className="p-12 text-center">
              <Key className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No secrets found</h3>
              <p className="text-gray-400 mb-4">
                {searchTerm ? 'No secrets match your search criteria.' : 'Get started by creating your first secret.'}
              </p>
              {!searchTerm && (
                <Button 
                  onClick={() => setShowCreateForm(true)}
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Secret
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredSecrets.map((secret) => (
            <Card key={secret.id} className="bg-[#0D1117] border-red-500/30 hover:border-red-500/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-red-400 truncate">{secret.key}</h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400">
                        Classified
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{secret.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(secret.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleDeleteSecret(secret.id)}
                      className="text-gray-400 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};