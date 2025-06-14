
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
import { Trash2, Edit, Plus, LogOut } from 'lucide-react';

export const AdminDashboard = () => {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [hacks, setHacks] = useState<Hack[]>([]);
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [loading, setLoading] = useState(true);

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
      description: "Session terminated",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-neon-green font-mono">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-bg p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-cyber font-bold text-neon-green">
            ADMIN DASHBOARD
          </h1>
          <Button onClick={handleLogout} variant="outline" className="border-red-500 text-red-500">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="blogs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-cyber-dark border-neon-green/20">
            <TabsTrigger value="blogs" className="data-[state=active]:bg-neon-green/20">
              Blogs ({blogs.length})
            </TabsTrigger>
            <TabsTrigger value="hacks" className="data-[state=active]:bg-neon-green/20">
              Hacks ({hacks.length})
            </TabsTrigger>
            <TabsTrigger value="secrets" className="data-[state=active]:bg-neon-green/20">
              Secrets ({secrets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blogs">
            <BlogsPanel blogs={blogs} onRefresh={loadData} />
          </TabsContent>

          <TabsContent value="hacks">
            <HacksPanel hacks={hacks} onRefresh={loadData} />
          </TabsContent>

          <TabsContent value="secrets">
            <SecretsPanel secrets={secrets} onRefresh={loadData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const BlogsPanel = ({ blogs, onRefresh }: { blogs: Blog[], onRefresh: () => void }) => {
  const { toast } = useToast();
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', author: 'Nikesh Uprety', published: false });

  const handleCreateBlog = async () => {
    const { error } = await createBlog(newBlog);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Blog created successfully" });
      setNewBlog({ title: '', content: '', author: 'Nikesh Uprety', published: false });
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
      <Card className="glass-morphism border-neon-green/30">
        <CardHeader>
          <CardTitle className="text-neon-green">Create New Blog</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Blog title..."
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            className="bg-cyber-dark border-neon-green/50"
          />
          <Textarea
            placeholder="Blog content..."
            value={newBlog.content}
            onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
            className="bg-cyber-dark border-neon-green/50 min-h-32"
          />
          <Button onClick={handleCreateBlog} className="bg-neon-green text-black">
            <Plus className="w-4 h-4 mr-2" />
            Create Blog
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {blogs.map((blog) => (
          <Card key={blog.id} className="glass-morphism border-neon-green/30">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-neon-green">{blog.title}</CardTitle>
                  <CardDescription>By {blog.author} • {new Date(blog.created_at).toLocaleDateString()}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingBlog(blog)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteBlog(blog.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 line-clamp-3">{blog.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const HacksPanel = ({ hacks, onRefresh }: { hacks: Hack[], onRefresh: () => void }) => {
  const { toast } = useToast();
  const [newHack, setNewHack] = useState({
    title: '',
    description: '',
    difficulty: 'beginner' as const,
    category: '',
    tools: [] as string[]
  });

  const handleCreateHack = async () => {
    const { error } = await createHack(newHack);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Hack created successfully" });
      setNewHack({ title: '', description: '', difficulty: 'beginner', category: '', tools: [] });
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

  return (
    <div className="space-y-6">
      <Card className="glass-morphism border-neon-green/30">
        <CardHeader>
          <CardTitle className="text-neon-green">Create New Hack</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Hack title..."
            value={newHack.title}
            onChange={(e) => setNewHack({ ...newHack, title: e.target.value })}
            className="bg-cyber-dark border-neon-green/50"
          />
          <Textarea
            placeholder="Hack description..."
            value={newHack.description}
            onChange={(e) => setNewHack({ ...newHack, description: e.target.value })}
            className="bg-cyber-dark border-neon-green/50"
          />
          <Select value={newHack.difficulty} onValueChange={(value: any) => setNewHack({ ...newHack, difficulty: value })}>
            <SelectTrigger className="bg-cyber-dark border-neon-green/50">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Category..."
            value={newHack.category}
            onChange={(e) => setNewHack({ ...newHack, category: e.target.value })}
            className="bg-cyber-dark border-neon-green/50"
          />
          <Button onClick={handleCreateHack} className="bg-neon-green text-black">
            <Plus className="w-4 h-4 mr-2" />
            Create Hack
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {hacks.map((hack) => (
          <Card key={hack.id} className="glass-morphism border-neon-green/30">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-neon-green">{hack.title}</CardTitle>
                  <CardDescription>{hack.category} • {hack.difficulty}</CardDescription>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleDeleteHack(hack.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">{hack.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const SecretsPanel = ({ secrets, onRefresh }: { secrets: Secret[], onRefresh: () => void }) => {
  const { toast } = useToast();
  const [newSecret, setNewSecret] = useState({ key: '', value: '', description: '' });

  const handleCreateSecret = async () => {
    const { error } = await createSecret(newSecret);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Secret created successfully" });
      setNewSecret({ key: '', value: '', description: '' });
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
      <Card className="glass-morphism border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400">Create New Secret</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Secret key..."
            value={newSecret.key}
            onChange={(e) => setNewSecret({ ...newSecret, key: e.target.value })}
            className="bg-cyber-dark border-red-500/50"
          />
          <Input
            placeholder="Secret value..."
            type="password"
            value={newSecret.value}
            onChange={(e) => setNewSecret({ ...newSecret, value: e.target.value })}
            className="bg-cyber-dark border-red-500/50"
          />
          <Input
            placeholder="Description..."
            value={newSecret.description}
            onChange={(e) => setNewSecret({ ...newSecret, description: e.target.value })}
            className="bg-cyber-dark border-red-500/50"
          />
          <Button onClick={handleCreateSecret} className="bg-red-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Secret
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {secrets.map((secret) => (
          <Card key={secret.id} className="glass-morphism border-red-500/30">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-red-400">{secret.key}</CardTitle>
                  <CardDescription>{secret.description}</CardDescription>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleDeleteSecret(secret.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
