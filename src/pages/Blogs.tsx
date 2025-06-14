
import { useState } from "react";
import { Calendar, User, ChevronDown, ChevronUp } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  content: string;
  tags: string[];
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
    tags: ["SQL Injection", "Web Security", "Penetration Testing"]
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
    tags: ["API Security", "Rate Limiting", "Authentication"]
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
    tags: ["Zero-Day", "Vulnerability Research", "Security Research"]
  }
];

const Blogs = () => {
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  const togglePost = (id: number) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-cyber-bg relative">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-cyber font-bold text-neon-green mb-4" data-text="BLOGS PAGE">
            BLOGS PAGE
          </h1>
          <p className="text-gray-300 font-mono text-sm">Exploring the depths of cybersecurity</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neon-green/30"></div>
            
            {blogPosts.map((post, index) => (
              <div key={post.id} className="relative mb-8">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-neon-green rounded-full border-2 border-cyber-bg"></div>
                
                {/* Blog post card */}
                <div className="ml-16 glass-morphism rounded-lg p-6 hover:border-neon-green/50 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-xs text-gray-400 font-mono">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => togglePost(post.id)}
                      className="text-neon-green hover:text-white transition-colors"
                    >
                      {expandedPost === post.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  <h2 className="text-lg font-bold text-neon-green mb-3">{post.title}</h2>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-neon-green/20 text-neon-green text-xs rounded font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  {expandedPost === post.id && (
                    <div className="prose prose-invert max-w-none">
                      <div className="markdown-content text-gray-300 text-sm">
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({ children }) => <h1 className="text-lg font-bold text-neon-green mb-4">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-base font-bold text-neon-green mb-3 mt-6">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-sm font-bold text-neon-green mb-2 mt-4">{children}</h3>,
                            p: ({ children }) => <p className="mb-4 leading-relaxed text-sm">{children}</p>,
                            code: ({ children, className }) => {
                              const isBlock = className?.includes('language-');
                              return isBlock ? (
                                <pre className="bg-cyber-dark border border-neon-green/30 rounded p-4 overflow-x-auto mb-4">
                                  <code className="text-neon-green font-mono text-xs">{children}</code>
                                </pre>
                              ) : (
                                <code className="bg-cyber-dark text-neon-green px-1 py-0.5 rounded font-mono text-xs">{children}</code>
                              );
                            },
                            ul: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-1 text-sm">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-sm">{children}</ol>,
                            li: ({ children }) => <li className="text-gray-300 text-sm">{children}</li>,
                            strong: ({ children }) => <strong className="text-neon-green font-bold">{children}</strong>,
                          }}
                        >
                          {post.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
