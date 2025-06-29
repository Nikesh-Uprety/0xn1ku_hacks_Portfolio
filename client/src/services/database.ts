import { createClient } from '@supabase/supabase-js';
import type { 
  Blog, 
  Hack, 
  Secret, 
  Project, 
  PortfolioContent,
  InsertBlog, 
  UpdateBlog,
  InsertHack, 
  UpdateHack,
  InsertSecret, 
  UpdateSecret,
  InsertProject, 
  UpdateProject,
  InsertPortfolioContent, 
  UpdatePortfolioContent 
} from '@shared/schema';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Only create client if we have real credentials
const hasRealCredentials = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key';

export const supabase = hasRealCredentials ? createClient(supabaseUrl, supabaseAnonKey) : null;

// ========================
// Authentication Functions
// ========================
export const signIn = async (email: string, password: string) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured. Please set up your Supabase credentials.' } };
  }
  
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  if (!supabase) return { error: { message: 'Supabase not configured' } };
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  if (!supabase) return { data: { user: null }, error: null };
  return await supabase.auth.getUser();
};

// ========================
// Blog Functions
// ========================
export const getBlogs = async () => {
  if (!supabase) return { data: [], error: null };
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });
    
  return { data: data || [], error };
};

export const getBlogById = async (id: number) => {
  if (!supabase) return { data: null, error: { message: 'Supabase not configured' } };
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single();
    
  return { data, error };
};

export const createBlog = async (blog: InsertBlog) => {
  if (!supabase) return { data: null, error: { message: 'Supabase not configured' } };
  
  const { data, error } = await supabase
    .from('blogs')
    .insert(blog)
    .select()
    .single();
    
  return { data, error };
};

export const updateBlog = async (id: number, updates: UpdateBlog) => {
  if (!supabase) return { data: null, error: { message: 'Supabase not configured' } };
  
  const { data, error } = await supabase
    .from('blogs')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
    
  return { data, error };
};

export const deleteBlog = async (id: number) => {
  if (!supabase) return { error: { message: 'Supabase not configured' } };
  
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);
    
  return { error };
};

// ========================
// Hack Functions
// ========================
export const getHacks = async () => {
  if (!supabase) return { data: [], error: null };
  
  const { data, error } = await supabase
    .from('hacks')
    .select('*')
    .order('created_at', { ascending: false });
    
  return { data: data || [], error };
};

export const getHackById = async (id: number) => {
  if (!supabase) return { data: null, error: { message: 'Supabase not configured' } };
  
  const { data, error } = await supabase
    .from('hacks')
    .select('*')
    .eq('id', id)
    .single();
    
  return { data, error };
};

export const createHack = async (hack: InsertHack) => {
  if (!supabase) return { data: null, error: { message: 'Supabase not configured' } };
  
  const { data, error } = await supabase
    .from('hacks')
    .insert(hack)
    .select()
    .single();
    
  return { data, error };
};

export const updateHack = async (id: number, updates: UpdateHack) => {
  if (!supabase) return { data: null, error: { message: 'Supabase not configured' } };
  
  const { data, error } = await supabase
    .from('hacks')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
    
  return { data, error };
};

export const deleteHack = async (id: number) => {
  if (!supabase) return { error: { message: 'Supabase not configured' } };
  
  const { error } = await supabase
    .from('hacks')
    .delete()
    .eq('id', id);
    
  return { error };
};

// ========================
// Secret Functions
// ========================
export const getSecrets = async () => {
  if (!supabase) return { data: [], error: null };
  
  const { data, error } = await supabase
    .from('secrets')
    .select('*')
    .order('created_at', { ascending: false });
    
  return { data: data || [], error };
};

export const getSecretById = async (id: number) => {
  if (!supabase) return { data: null, error: { message: 'Supabase not configured' } };
  
  const { data, error } = await supabase
    .from('secrets')
    .select('*')
    .eq('id', id)
    .single();
    
  return { data, error };
};

export const createSecret = async (secret: InsertSecret) => {
  if (!supabase) return { data: null, error: { message: 'Supabase not configured' } };
  
  const { data, error } = await supabase
    .from('secrets')
    .insert(secret)
    .select()
    .single();
    
  return { data, error };
};

export const updateSecret = async (id: number, updates: UpdateSecret) => {
  if (!supabase) return { data: null, error: { message: 'Supabase not configured' } };
  
  const { data, error } = await supabase
    .from('secrets')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
    
  return { data, error };
};

export const deleteSecret = async (id: number) => {
  if (!supabase) return { error: { message: 'Supabase not configured' } };
  
  const { error } = await supabase
    .from('secrets')
    .delete()
    .eq('id', id);
    
  return { error };
};

// ========================
// Project Functions
// ========================
export const getProjects = async () => {
  if (!supabase) return { data: [], error: null };
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true });
    
  return { data: data || [], error };
};

export const getProjectById = async (id: number) => {
  if (!supabase) return { data: null, error: { message: 'Supabase not configured' } };
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
    
  return { data, error };
};

export const createProject = async (project: InsertProject) => {
  if (!supabase) return { data: null, error: { message: 'Supabase not configured' } };
  
  const { data, error } = await supabase
    .from('projects')
    .insert(project)
    .select()
    .single();
    
  return { data, error };
};

export const updateProject = async (id: number, updates: UpdateProject) => {
  if (!supabase) return { data: null, error: { message: 'Supabase not configured' } };
  
  const { data, error } = await supabase
    .from('projects')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
    
  return { data, error };
};

export const deleteProject = async (id: number) => {
  if (!supabase) return { error: { message: 'Supabase not configured' } };
  
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
    
  return { error };
};

// ========================
// Portfolio Content Functions
// ========================
export const getPortfolioContent = async () => {
  if (!supabase) return { data: [], error: null };
  
  const { data, error } = await supabase
    .from('portfolio_content')
    .select('*')
    .eq('published', true)
    .order('section', { ascending: true });
    
  return { data: data || [], error };
};

export const getPortfolioContentBySection = async (section: string) => {
  if (!supabase) return { data: null, error: { message: 'Supabase not configured' } };
  
  const { data, error } = await supabase
    .from('portfolio_content')
    .select('*')
    .eq('section', section)
    .single();
    
  return { data, error };
};

export const createPortfolioContent = async (content: InsertPortfolioContent) => {
  if (!supabase) return { data: null, error: { message: 'Supabase not configured' } };
  
  const { data, error } = await supabase
    .from('portfolio_content')
    .insert(content)
    .select()
    .single();
    
  return { data, error };
};

export const updatePortfolioContent = async (section: string, updates: UpdatePortfolioContent) => {
  if (!supabase) return { data: null, error: { message: 'Supabase not configured' } };
  
  const { data, error } = await supabase
    .from('portfolio_content')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('section', section)
    .select()
    .single();
    
  return { data, error };
};

export const deletePortfolioContent = async (section: string) => {
  if (!supabase) return { error: { message: 'Supabase not configured' } };
  
  const { error } = await supabase
    .from('portfolio_content')
    .delete()
    .eq('section', section);
    
  return { error };
};