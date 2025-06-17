
import { useState } from "react";
import { Calendar, User, ChevronDown, ChevronUp, Hash } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  content: string;
  tags: string[];
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Advanced SQL Injection Techniques in 2024",
    date: "2024-01-15",
    author: "0xN1kU_H4X_!",
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
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "Building a Secure API Gateway",
    date: "2024-01-10",
    author: "0xN1kU_H4X_!",
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
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "Zero-Day Vulnerability Research Methodology",
    date: "2024-01-05",
    author: "0xN1kU_H4X_!",
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
    readTime: "10 min read"
  }
];

const Blogs = () => {
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const togglePost = (id: number) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];
  
  const filteredPosts = selectedTag 
    ? blogPosts.filter(post => post.tags.includes(selectedTag))
    : blogPosts;

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Security Blog</h1>
          <p className="text-gray-400 text-lg">
            Exploring cybersecurity research, techniques, and insights
          </p>
        </div>

        {/* Tag Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-sm font-mono transition-colors ${
                !selectedTag 
                  ? 'bg-accent-teal text-dark-bg' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All Posts
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-mono transition-colors ${
                  selectedTag === tag
                    ? 'bg-accent-teal text-dark-bg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Hash className="w-3 h-3 inline mr-1" />
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
              <div className="p-6">
                {/* Post Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-400 font-mono">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <button
                    onClick={() => togglePost(post.id)}
                    className="text-accent-teal hover:text-white transition-colors p-1"
                  >
                    {expandedPost === post.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Post Title */}
                <h2 className="text-2xl font-bold text-white mb-4 leading-tight">
                  {post.title}
                </h2>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-accent-teal/20 text-accent-teal text-xs rounded font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                {/* Post Content */}
                {expandedPost === post.id && (
                  <div className="prose prose-invert max-w-none border-t border-gray-800 pt-6">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => <h1 className="text-2xl font-bold text-accent-teal mb-6">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-xl font-bold text-accent-teal mb-4 mt-8">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-lg font-bold text-accent-teal mb-3 mt-6">{children}</h3>,
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
                        ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
                        li: ({ children }) => <li className="text-gray-300">{children}</li>,
                        strong: ({ children }) => <strong className="text-accent-teal font-bold">{children}</strong>,
                      }}
                    >
                      {post.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-mono">No posts found for the selected tag.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
