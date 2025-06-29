import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  FileText, 
  Bookmark, 
  Key, 
  FolderOpen, 
  Settings, 
  User,
  Calendar,
  Tag,
  ExternalLink,
  Eye,
  EyeOff,
  Search,
  Filter,
  MoreHorizontal,
  Globe,
  Lock
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  getBlogs,
  getHacks, 
  getSecrets,
  getProjects,
  getPortfolioContent,
  createBlog,
  createHack,
  createSecret,
  createProject,
  createPortfolioContent,
  updateBlog,
  updateHack,
  updateSecret,
  updateProject,
  updatePortfolioContent,
  deleteBlog,
  deleteHack,
  deleteSecret,
  deleteProject,
  deletePortfolioContent,
  signOut
} from "@/services/database";
import type { Blog, Hack, Secret, Project, PortfolioContent } from "@shared/schema";

// Form schemas
const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  author: z.string().min(1, "Author is required"),
  tags: z.string(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  read_time: z.string().default("5 min read"),
});

const hackFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Valid URL is required"),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  favicon: z.string().optional(),
  difficulty: z.string().optional(),
  tags: z.string(),
  featured: z.boolean().default(false),
});

const secretFormSchema = z.object({
  key: z.string().min(1, "Key is required"),
  value: z.string().min(1, "Value is required"),
  description: z.string().optional(),
  category: z.string().default("general"),
  encrypted: z.boolean().default(true),
});

const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tech_stack: z.string(),
  github_url: z.string().optional(),
  live_url: z.string().optional(),
  image_url: z.string().optional(),
  featured: z.boolean().default(false),
  order_index: z.number().default(0),
});

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("blogs");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Queries
  const { data: blogs = [], isLoading: blogsLoading } = useQuery({
    queryKey: ['/api/blogs'],
    queryFn: () => getBlogs().then(res => res.data || [])
  });

  const { data: hacks = [], isLoading: hacksLoading } = useQuery({
    queryKey: ['/api/hacks'],
    queryFn: () => getHacks().then(res => res.data || [])
  });

  const { data: secrets = [], isLoading: secretsLoading } = useQuery({
    queryKey: ['/api/secrets'],
    queryFn: () => getSecrets().then(res => res.data || [])
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects'],
    queryFn: () => getProjects().then(res => res.data || [])
  });

  const { data: portfolioContent = [], isLoading: portfolioLoading } = useQuery({
    queryKey: ['/api/portfolio-content'],
    queryFn: () => getPortfolioContent().then(res => res.data || [])
  });

  // Mutations for blogs
  const createBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blogs'] });
      toast({ title: "Blog created successfully" });
      setIsCreateDialogOpen(false);
    },
    onError: (error: any) => {
      toast({ title: "Error creating blog", description: error.message, variant: "destructive" });
    }
  });

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: any }) => updateBlog(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blogs'] });
      toast({ title: "Blog updated successfully" });
      setEditingItem(null);
    },
    onError: (error: any) => {
      toast({ title: "Error updating blog", description: error.message, variant: "destructive" });
    }
  });

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blogs'] });
      toast({ title: "Blog deleted successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Error deleting blog", description: error.message, variant: "destructive" });
    }
  });

  // Similar mutations for other entities (hacks, secrets, projects)
  const createHackMutation = useMutation({
    mutationFn: createHack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/hacks'] });
      toast({ title: "Hack created successfully" });
      setIsCreateDialogOpen(false);
    }
  });

  const createSecretMutation = useMutation({
    mutationFn: createSecret,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/secrets'] });
      toast({ title: "Secret created successfully" });
      setIsCreateDialogOpen(false);
    }
  });

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({ title: "Project created successfully" });
      setIsCreateDialogOpen(false);
    }
  });

  const handleLogout = async () => {
    await signOut();
    window.location.reload();
  };

  const filteredData = (data: any[]) => {
    if (!searchTerm) return data;
    return data.filter(item => 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.key?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'blogs': return <FileText className="w-4 h-4" />;
      case 'hacks': return <Bookmark className="w-4 h-4" />;
      case 'secrets': return <Key className="w-4 h-4" />;
      case 'projects': return <FolderOpen className="w-4 h-4" />;
      case 'portfolio': return <User className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const renderCreateForm = () => {
    switch (activeTab) {
      case 'blogs':
        return <BlogForm onSubmit={(data) => createBlogMutation.mutate(data)} />;
      case 'hacks':
        return <HackForm onSubmit={(data) => createHackMutation.mutate(data)} />;
      case 'secrets':
        return <SecretForm onSubmit={(data) => createSecretMutation.mutate(data)} />;
      case 'projects':
        return <ProjectForm onSubmit={(data) => createProjectMutation.mutate(data)} />;
      default:
        return null;
    }
  };

  const renderDataTable = () => {
    switch (activeTab) {
      case 'blogs':
        return <BlogsTable data={filteredData(blogs)} onEdit={setEditingItem} onDelete={(id) => deleteBlogMutation.mutate(id)} />;
      case 'hacks':
        return <HacksTable data={filteredData(hacks)} onEdit={setEditingItem} onDelete={(id) => deleteHack(id)} />;
      case 'secrets':
        return <SecretsTable data={filteredData(secrets)} onEdit={setEditingItem} onDelete={(id) => deleteSecret(id)} />;
      case 'projects':
        return <ProjectsTable data={filteredData(projects)} onEdit={setEditingItem} onDelete={(id) => deleteProject(id)} />;
      case 'portfolio':
        return <PortfolioTable data={filteredData(portfolioContent)} onEdit={setEditingItem} />;
      default:
        return null;
    }
  };

  const getStats = () => {
    return [
      { 
        title: "Blog Posts", 
        value: blogs.length, 
        description: `${blogs.filter(b => b.published).length} published`,
        icon: <FileText className="w-5 h-5" />,
        color: "text-blue-500"
      },
      { 
        title: "Bookmarks", 
        value: hacks.length, 
        description: `${hacks.filter(h => h.featured).length} featured`,
        icon: <Bookmark className="w-5 h-5" />,
        color: "text-green-500"
      },
      { 
        title: "Secrets", 
        value: secrets.length, 
        description: `${secrets.filter(s => s.encrypted).length} encrypted`,
        icon: <Key className="w-5 h-5" />,
        color: "text-yellow-500"
      },
      { 
        title: "Projects", 
        value: projects.length, 
        description: `${projects.filter(p => p.featured).length} featured`,
        icon: <FolderOpen className="w-5 h-5" />,
        color: "text-purple-500"
      },
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-teal to-blue-500 rounded-lg flex items-center justify-center">
                <Settings className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Content Management System</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-white/50 dark:bg-gray-800/50"
              />
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-900 border-r flex flex-col">
          {/* Stats Cards */}
          <div className="p-6 space-y-4">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Overview</h2>
            <div className="grid grid-cols-2 gap-3">
              {getStats().map((stat, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.title}</p>
                    </div>
                    <div className={stat.color}>
                      {stat.icon}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Navigation */}
          <div className="flex-1 p-4">
            <nav className="space-y-1">
              {[
                { id: 'blogs', label: 'Blog Posts', icon: FileText },
                { id: 'hacks', label: 'Bookmarks', icon: Bookmark },
                { id: 'secrets', label: 'Secrets', icon: Key },
                { id: 'projects', label: 'Projects', icon: FolderOpen },
                { id: 'portfolio', label: 'Portfolio', icon: User },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-accent-teal/10 text-accent-teal border border-accent-teal/20'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Content Header */}
          <div className="p-6 bg-white dark:bg-gray-900 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getTabIcon(activeTab)}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 capitalize">
                    {activeTab === 'portfolio' ? 'Portfolio Content' : activeTab}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Manage your {activeTab === 'portfolio' ? 'portfolio content' : activeTab}
                  </p>
                </div>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-accent-teal hover:bg-accent-teal/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New {activeTab.slice(0, -1)}</DialogTitle>
                    <DialogDescription>
                      Add a new {activeTab.slice(0, -1)} to your {activeTab} collection.
                    </DialogDescription>
                  </DialogHeader>
                  {renderCreateForm()}
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-auto">
            <Card className="h-full">
              <CardContent className="p-0">
                {renderDataTable()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual form components will be created next
const BlogForm = ({ onSubmit, defaultValues }: { onSubmit: (data: any) => void; defaultValues?: any }) => {
  const form = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: defaultValues || {
      title: "",
      content: "",
      excerpt: "",
      author: "0xN1kU_H4X_!",
      tags: "",
      featured: false,
      published: true,
      read_time: "5 min read",
    }
  });

  const handleSubmit = (data: any) => {
    const formData = {
      ...data,
      tags: data.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean),
    };
    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter blog title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content (Markdown)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Write your blog content in markdown..." 
                  className="min-h-[200px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="read_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Read Time</FormLabel>
                <FormControl>
                  <Input placeholder="5 min read" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="security, hacking, tutorial" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-6">
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Featured</FormLabel>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Published</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="submit" className="bg-accent-teal hover:bg-accent-teal/90">
            <Save className="w-4 h-4 mr-2" />
            Save Blog
          </Button>
        </div>
      </form>
    </Form>
  );
};

// Additional form components for other entities
const HackForm = ({ onSubmit, defaultValues }: { onSubmit: (data: any) => void; defaultValues?: any }) => {
  const form = useForm({
    resolver: zodResolver(hackFormSchema),
    defaultValues: defaultValues || {
      title: "",
      url: "",
      description: "",
      category: "tools",
      favicon: "",
      difficulty: "",
      tags: "",
      featured: false,
    }
  });

  const handleSubmit = (data: any) => {
    const formData = {
      ...data,
      tags: data.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean),
    };
    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="platforms">Platforms</SelectItem>
                    <SelectItem value="tools">Tools</SelectItem>
                    <SelectItem value="resources">Resources</SelectItem>
                    <SelectItem value="writeups">Writeups</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="security, tools, hacking" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Featured</FormLabel>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit" className="bg-accent-teal hover:bg-accent-teal/90">
            <Save className="w-4 h-4 mr-2" />
            Save Bookmark
          </Button>
        </div>
      </form>
    </Form>
  );
};

const SecretForm = ({ onSubmit, defaultValues }: { onSubmit: (data: any) => void; defaultValues?: any }) => {
  const form = useForm({
    resolver: zodResolver(secretFormSchema),
    defaultValues: defaultValues || {
      key: "",
      value: "",
      description: "",
      category: "general",
      encrypted: true,
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key</FormLabel>
              <FormControl>
                <Input placeholder="SECRET_KEY_NAME" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Textarea placeholder="Secret value..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="What this secret is used for..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="api">API Keys</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="encryption">Encryption</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="encrypted"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Encrypted</FormLabel>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit" className="bg-accent-teal hover:bg-accent-teal/90">
            <Save className="w-4 h-4 mr-2" />
            Save Secret
          </Button>
        </div>
      </form>
    </Form>
  );
};

const ProjectForm = ({ onSubmit, defaultValues }: { onSubmit: (data: any) => void; defaultValues?: any }) => {
  const form = useForm({
    resolver: zodResolver(projectFormSchema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      tech_stack: "",
      github_url: "",
      live_url: "",
      image_url: "",
      featured: false,
      order_index: 0,
    }
  });

  const handleSubmit = (data: any) => {
    const formData = {
      ...data,
      tech_stack: data.tech_stack.split(',').map((tech: string) => tech.trim()).filter(Boolean),
    };
    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Project name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Project description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tech_stack"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tech Stack (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="React, TypeScript, Node.js" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="github_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="live_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Live URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://project.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="order_index"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Index</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Featured</FormLabel>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit" className="bg-accent-teal hover:bg-accent-teal/90">
            <Save className="w-4 h-4 mr-2" />
            Save Project
          </Button>
        </div>
      </form>
    </Form>
  );
};

// Table components will be created next
const BlogsTable = ({ data, onEdit, onDelete }: { data: Blog[]; onEdit: (item: Blog) => void; onDelete: (id: number) => void }) => {
  return (
    <div className="p-6">
      <div className="space-y-4">
        {data.map((blog) => (
          <Card key={blog.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-lg">{blog.title}</h3>
                  <div className="flex space-x-2">
                    {blog.featured && <Badge variant="secondary">Featured</Badge>}
                    <Badge variant={blog.published ? "default" : "destructive"}>
                      {blog.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3">{blog.excerpt}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {blog.author}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(blog.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    {blog.tags?.length || 0} tags
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(blog)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete(blog.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const HacksTable = ({ data, onEdit, onDelete }: { data: Hack[]; onEdit: (item: Hack) => void; onDelete: (id: number) => void }) => {
  return (
    <div className="p-6">
      <div className="space-y-4">
        {data.map((hack) => (
          <Card key={hack.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-lg">{hack.title}</h3>
                  <div className="flex space-x-2">
                    {hack.featured && <Badge variant="secondary">Featured</Badge>}
                    <Badge variant="outline">{hack.category}</Badge>
                    {hack.difficulty && <Badge variant="secondary">{hack.difficulty}</Badge>}
                  </div>
                </div>
                {hack.description && (
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{hack.description}</p>
                )}
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <a 
                    href={hack.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-accent-teal hover:underline"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    {hack.url}
                  </a>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(hack.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(hack)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete(hack.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const SecretsTable = ({ data, onEdit, onDelete }: { data: Secret[]; onEdit: (item: Secret) => void; onDelete: (id: number) => void }) => {
  const [visibleSecrets, setVisibleSecrets] = useState<number[]>([]);

  const toggleSecretVisibility = (id: number) => {
    setVisibleSecrets(prev => 
      prev.includes(id) 
        ? prev.filter(secretId => secretId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="p-6">
      <div className="space-y-4">
        {data.map((secret) => (
          <Card key={secret.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-lg font-mono">{secret.key}</h3>
                  <div className="flex space-x-2">
                    <Badge variant="outline">{secret.category}</Badge>
                    <Badge variant={secret.encrypted ? "default" : "destructive"}>
                      {secret.encrypted ? <Lock className="w-3 h-3 mr-1" /> : <Globe className="w-3 h-3 mr-1" />}
                      {secret.encrypted ? "Encrypted" : "Plain"}
                    </Badge>
                  </div>
                </div>
                {secret.description && (
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{secret.description}</p>
                )}
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-2 font-mono text-sm">
                    <span className="text-gray-500">Value:</span>
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {visibleSecrets.includes(secret.id) 
                        ? secret.value 
                        : '•'.repeat(secret.value.length)
                      }
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSecretVisibility(secret.id)}
                    >
                      {visibleSecrets.includes(secret.id) ? 
                        <EyeOff className="w-4 h-4" /> : 
                        <Eye className="w-4 h-4" />
                      }
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(secret.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(secret)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete(secret.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ProjectsTable = ({ data, onEdit, onDelete }: { data: Project[]; onEdit: (item: Project) => void; onDelete: (id: number) => void }) => {
  return (
    <div className="p-6">
      <div className="space-y-4">
        {data.map((project) => (
          <Card key={project.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  <div className="flex space-x-2">
                    {project.featured && <Badge variant="secondary">Featured</Badge>}
                    <Badge variant="outline">Order: {project.order_index}</Badge>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech_stack?.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  {project.github_url && (
                    <a 
                      href={project.github_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-accent-teal hover:underline"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      GitHub
                    </a>
                  )}
                  {project.live_url && (
                    <a 
                      href={project.live_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-accent-teal hover:underline"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live Demo
                    </a>
                  )}
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(project)}>
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete(project.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const PortfolioTable = ({ data, onEdit }: { data: PortfolioContent[]; onEdit: (item: PortfolioContent) => void }) => {
  return (
    <div className="p-6">
      <div className="space-y-4">
        {data.map((content) => (
          <Card key={content.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-lg capitalize">{content.section}</h3>
                  <Badge variant={content.published ? "default" : "destructive"}>
                    {content.published ? "Published" : "Draft"}
                  </Badge>
                </div>
                {content.title && (
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{content.title}</p>
                )}
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(content.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(content)}>
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};