import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Only create client if we have real credentials
const hasRealCredentials = 
  supabaseUrl && 
  supabaseAnonKey && 
  typeof supabaseUrl === 'string' && 
  typeof supabaseAnonKey === 'string' &&
  supabaseUrl.length > 0 && 
  supabaseAnonKey.length > 0 &&
  supabaseUrl !== 'https://ljqbboufswoqsdplmjjk.supabase.co' && 
  supabaseAnonKey !== 'heyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqcWJib3Vmc3dvcXNkcGxtamprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTcxMzAsImV4cCI6MjA2NjMzMzEzMH0.qKZkjDDO1wGW_pIhYYhKeVPXRXNmO0mZY91k1yKaXws';

export const supabase = hasRealCredentials ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Database types
export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
  published: boolean;
}

export interface Hack {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tools: string[];
  created_at: string;
  updated_at: string;
}

export interface Secret {
  id: string;
  key: string;
  value: string;
  description: string;
  created_at: string;
  updated_at: string;
}

// Auth functions
export const signIn = async (email: string, password: string) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured. Please set up your Supabase credentials.' } };
  }
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured' } };
  }
  
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  if (!supabase) {
    return null;
  }
  
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Blog CRUD operations
export const getBlogs = async () => {
  if (!supabase) {
    return { data: [], error: { message: 'Supabase not configured' } };
  }
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const createBlog = async (blog: Omit<Blog, 'id' | 'created_at' | 'updated_at'>) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } };
  }
  
  const { data, error } = await supabase
    .from('blogs')
    .insert([blog])
    .select()
    .single();
  return { data, error };
};

export const updateBlog = async (id: string, updates: Partial<Blog>) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } };
  }
  
  const { data, error } = await supabase
    .from('blogs')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deleteBlog = async (id: string) => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured' } };
  }
  
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);
  return { error };
};

// Hack CRUD operations
export const getHacks = async () => {
  if (!supabase) {
    return { data: [], error: { message: 'Supabase not configured' } };
  }
  
  const { data, error } = await supabase
    .from('hacks')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const createHack = async (hack: Omit<Hack, 'id' | 'created_at' | 'updated_at'>) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } };
  }
  
  const { data, error } = await supabase
    .from('hacks')
    .insert([hack])
    .select()
    .single();
  return { data, error };
};

export const updateHack = async (id: string, updates: Partial<Hack>) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } };
  }
  
  const { data, error } = await supabase
    .from('hacks')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deleteHack = async (id: string) => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured' } };
  }
  
  const { error } = await supabase
    .from('hacks')
    .delete()
    .eq('id', id);
  return { error };
};

// Secret CRUD operations
export const getSecrets = async () => {
  if (!supabase) {
    return { data: [], error: { message: 'Supabase not configured' } };
  }
  
  const { data, error } = await supabase
    .from('secrets')
    .select('*')
    .order('created_at', { ascending: false });
  return { data, error };
};

export const createSecret = async (secret: Omit<Secret, 'id' | 'created_at' | 'updated_at'>) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } };
  }
  
  const { data, error } = await supabase
    .from('secrets')
    .insert([secret])
    .select()
    .single();
  return { data, error };
};

export const updateSecret = async (id: string, updates: Partial<Secret>) => {
  if (!supabase) {
    return { data: null, error: { message: 'Supabase not configured' } };
  }
  
  const { data, error } = await supabase
    .from('secrets')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deleteSecret = async (id: string) => {
  if (!supabase) {
    return { error: { message: 'Supabase not configured' } };
  }
  
  const { error } = await supabase
    .from('secrets')
    .delete()
    .eq('id', id);
  return { error };
};