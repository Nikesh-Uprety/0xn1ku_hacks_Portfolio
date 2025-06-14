
import { useState } from "react";
import { Calendar, User, ChevronDown, ChevronUp } from "lucide-react";

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
          <h1 className="text-4xl font-cyber font-bold text-neon-green mb-4 glitch-text" data-text="SECURITY RESEARCH BLOG">
            SECURITY RESEARCH BLOG
          </h1>
          <p className="text-gray-300 font-mono">Exploring the depths of cybersecurity</p>
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
                    <div className="flex items-center space-x-4 text-sm text-gray-400 font-mono">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => togglePost(post.id)}
                      className="text-neon-green hover:text-white transition-colors"
                    >
                      {expandedPost === post.id ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>
                  
                  <h2 className="text-xl font-bold text-neon-green mb-3">{post.title}</h2>
                  
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
                      <div className="whitespace-pre-wrap text-gray-300 font-mono text-sm leading-relaxed">
                        {post.content}
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
