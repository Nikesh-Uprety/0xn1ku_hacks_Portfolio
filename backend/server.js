
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nikesh_portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Models
const Blog = require('./models/Blog');
const Hack = require('./models/Hack');
const Secret = require('./models/Secret');

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  const { password } = req.body;
  
  // Simple password check (in production, use proper user auth)
  if (password === process.env.ADMIN_PASSWORD || 'NIKESH_SECURITY_2024_KEY') {
    const token = jwt.sign(
      { userId: 'admin', role: 'admin' },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    res.json({ token, message: 'Authentication successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Blog Routes
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/blogs', authenticateToken, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/blogs/:id', authenticateToken, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/blogs/:id', authenticateToken, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Hack Routes
app.get('/api/hacks', async (req, res) => {
  try {
    const hacks = await Hack.find().sort({ createdAt: -1 });
    res.json(hacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/hacks', authenticateToken, async (req, res) => {
  try {
    const hack = new Hack(req.body);
    await hack.save();
    res.status(201).json(hack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/hacks/:id', authenticateToken, async (req, res) => {
  try {
    const hack = await Hack.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hack) {
      return res.status(404).json({ message: 'Hack not found' });
    }
    res.json(hack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/hacks/:id', authenticateToken, async (req, res) => {
  try {
    const hack = await Hack.findByIdAndDelete(req.params.id);
    if (!hack) {
      return res.status(404).json({ message: 'Hack not found' });
    }
    res.json({ message: 'Hack deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Secret Routes
app.get('/api/secret', async (req, res) => {
  try {
    const secrets = await Secret.find().sort({ createdAt: -1 });
    res.json(secrets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/secret', authenticateToken, async (req, res) => {
  try {
    const secret = new Secret(req.body);
    await secret.save();
    res.status(201).json(secret);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/secret/:id', authenticateToken, async (req, res) => {
  try {
    const secret = await Secret.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!secret) {
      return res.status(404).json({ message: 'Secret not found' });
    }
    res.json(secret);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/secret/:id', authenticateToken, async (req, res) => {
  try {
    const secret = await Secret.findByIdAndDelete(req.params.id);
    if (!secret) {
      return res.status(404).json({ message: 'Secret not found' });
    }
    res.json({ message: 'Secret deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
