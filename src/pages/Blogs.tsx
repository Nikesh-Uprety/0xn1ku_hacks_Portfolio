
import { useState } from "react";
import { Calendar, User, Clock, Hash, ChevronRight } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  tags: string[];
  readTime: string;
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Advanced SQL Injection Techniques in 2024",
    date: "2024-01-15",
    author: "0xN1kU_H4X_!",
    excerpt: "Exploring modern SQL injection vectors and advanced exploitation techniques for penetration testers.",
    content: `# Advanced SQL Injection Techniques

## Introduction
SQL injection remains one of the most critical web application vulnerabilities. In this post, we'll explore advanced techniques that modern penetration testers should be aware of.

## Time-Based Blind SQL Injection
Time-based attacks are particularly useful when you cannot see the results of your queries directly.

\`\`\`sql
SELECT * FROM users WHERE id = '1' AND (SELECT SLEEP(5) WHERE SUBSTRING(@@version,1,1) = '5') AND '1'='1'
\`\`\`

## Boolean-Based Blind SQL Injection
This technique relies on the application's different responses to true and false conditions.

## Mitigation Strategies
- Use parameterized queries
- Implement proper input validation
- Apply the principle of least privilege`,
    tags: ["SQL Injection", "Web Security", "Penetration Testing"],
    readTime: "8 min read",
    featured: true
  },
  {
    id: 2,
    title: "Building a Secure API Gateway",
    date: "2024-01-10",
    author: "0xN1kU_H4X_!",
    excerpt: "Best practices for designing and implementing secure API gateways in modern applications.",
    content: `# Building a Secure API Gateway

## Why API Security Matters
APIs are the backbone of modern applications, making their security crucial for overall system integrity.

## Key Security Principles
1. **Authentication & Authorization**
2. **Rate Limiting**
3. **Input Validation**
4. **Logging & Monitoring**

## Implementation Example
\`\`\`javascript
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});
\`\`\``,
    tags: ["API Security", "Rate Limiting", "Authentication"],
    readTime: "6 min read",
    featured: false
  },
  {
    id: 3,
    title: "Zero-Day Vulnerability Research Methodology",
    date: "2024-01-05",
    author: "0xN1kU_H4X_!",
    excerpt: "A systematic approach to discovering and responsibly disclosing zero-day vulnerabilities.",
    content: `# Zero-Day Vulnerability Research

## Research Methodology
Finding zero-day vulnerabilities requires a systematic approach and deep understanding of target systems.

## Tools & Techniques
- **Static Analysis**: Code review and pattern matching
- **Dynamic Analysis**: Runtime behavior analysis
- **Fuzzing**: Automated input generation

## Responsible Disclosure
Always follow responsible disclosure practices when discovering vulnerabilities.`,
    tags: ["Zero-Day", "Vulnerability Research", "Security Research"],
    readTime: "10 min read",
    featured: true
  }
];

const Blogs = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];
  
  const filteredPosts = selectedTag 
    ? blogPosts.filter(post => post.tags.includes(selectedTag))
    : blogPosts;

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 5);

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-dark-bg text-gray-100">
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center text-accent-teal hover:text-white transition-colors mb-8 font-mono"
          >
            ← Back to Blog
          </button>

          {/* Post Header */}
          <article className="prose prose-invert max-w-none">
            <header className="mb-8 pb-8 border-b border-gray-800">
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                {selectedPost.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 font-mono mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{selectedPost.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{selectedPost.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-accent-teal/20 text-accent-teal text-xs rounded-full font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Post Content */}
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-bold text-accent-teal mb-6 mt-8">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-bold text-accent-teal mb-4 mt-8">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-bold text-accent-teal mb-3 mt-6">{children}</h3>,
                  p: ({ children }) => <p className="mb-4 leading-relaxed text-gray-300">{children}</p>,
                  code: ({ children, className }) => {
                    const isBlock = className?.includes('language-');
                    return isBlock ? (
                      <pre className="bg-gray-950 border border-accent-teal/30 rounded-lg p-4 overflow-x-auto mb-6">
                        <code className="text-accent-teal font-mono text-sm">{children}</code>
                      </pre>
                    ) : (
                      <code className="bg-gray-800 text-accent-teal px-2 py-1 rounded font-mono text-sm">{children}</code>
                    );
                  },
                  ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300">{children}</ol>,
                  li: ({ children }) => <li className="text-gray-300">{children}</li>,
                  strong: ({ children }) => <strong className="text-accent-teal font-bold">{children}</strong>,
                }}
              >
                {selectedPost.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Security Blog</h1>
              <p className="text-gray-400 text-lg">
                Exploring cybersecurity research, techniques, and insights
              </p>
            </div>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-accent-teal mb-6 flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  Featured Posts
                </h2>
                <div className="grid gap-6">
                  {featuredPosts.map((post) => (
                    <article 
                      key={post.id} 
                      className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-accent-teal/50 transition-colors cursor-pointer group"
                      onClick={() => setSelectedPost(post)}
                    >
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-teal transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500 font-mono">
                          <span>{post.date}</span>
                          <span>{post.readTime}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-accent-teal group-hover:translate-x-1 transition-transform" />
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* All Posts */}
            <section>
              <h2 className="text-2xl font-bold text-accent-teal mb-6 flex items-center gap-2">
                <Hash className="w-5 h-5" />
                All Posts
              </h2>
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <article 
                    key={post.id} 
                    className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-accent-teal/50 transition-colors cursor-pointer group"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-teal transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 mb-3 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                          <span>{post.date}</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-accent-teal group-hover:translate-x-1 transition-transform mt-1" />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Tags */}
              <section className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-bold text-accent-teal mb-4 flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Tags
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`block w-full text-left px-3 py-2 rounded text-sm font-mono transition-colors ${
                      !selectedTag 
                        ? 'bg-accent-teal/20 text-accent-teal' 
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    All Posts ({blogPosts.length})
                  </button>
                  {allTags.map(tag => {
                    const count = blogPosts.filter(post => post.tags.includes(tag)).length;
                    return (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`block w-full text-left px-3 py-2 rounded text-sm font-mono transition-colors ${
                          selectedTag === tag
                            ? 'bg-accent-teal/20 text-accent-teal'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        {tag} ({count})
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Recent Posts */}
              <section className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-bold text-accent-teal mb-4">Recent Posts</h3>
                <div className="space-y-3">
                  {recentPosts.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className="block w-full text-left p-3 rounded hover:bg-gray-800 transition-colors group"
                    >
                      <h4 className="text-sm font-medium text-white group-hover:text-accent-teal transition-colors mb-1">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 font-mono">{post.date}</p>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
