
import { useState, useEffect } from "react";
import { Github, Terminal, Zap } from "lucide-react";

// Placeholder component for Monitor icon - moved to top
const Monitor = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h6l-2 2v1h8v-1l-2-2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"/>
    </svg>
  </div>
);

const projects = [
  {
    id: 1,
    name: "VulnScanner Pro",
    description: "Advanced vulnerability scanner with AI-powered threat detection and automated exploitation frameworks.",
    tech: ["Python", "Nmap", "Metasploit", "AI/ML"],
    github: "https://github.com/Nikesh-Uprety",
    demo: "#",
    icon: Terminal
  },
  {
    id: 2,
    name: "CyberShield Dashboard",
    description: "Real-time cybersecurity monitoring dashboard with threat intelligence and incident response automation.",
    tech: ["React", "Node.js", "MongoDB", "WebSockets"],
    github: "https://github.com/Nikesh-Uprety",
    demo: "#",
    icon: Monitor
  },
  {
    id: 3,
    name: "SecureAPI Gateway",
    description: "Enterprise-grade API security gateway with advanced authentication, rate limiting, and threat protection.",
    tech: ["Go", "Docker", "Kubernetes", "Redis"],
    github: "https://github.com/Nikesh-Uprety",
    demo: "#",
    icon: Zap
  }
];

export const ProjectsSection = () => {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = parseInt(entry.target.getAttribute('data-project-id') || '0');
            setVisibleProjects(prev => [...prev, projectId]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const projectElements = document.querySelectorAll('[data-project-id]');
    projectElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <div className="font-mono text-neon-green text-lg mb-4">
          nikesh@kali:~$ ls -la /projects/
        </div>
        <h2 className="text-4xl md:text-5xl font-cyber font-bold text-white mb-4">
          FEATURED <span className="text-neon-green">EXPLOITS</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          A collection of cybersecurity tools, penetration testing frameworks, and security research projects.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => {
          const IconComponent = project.icon;
          const isVisible = visibleProjects.includes(project.id);
          
          return (
            <div
              key={project.id}
              data-project-id={project.id}
              className={`glass-morphism rounded-lg p-6 hover:border-neon-green transition-all duration-500 group scanline ${
                isVisible ? 'animate-fade-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex items-center mb-4">
                <IconComponent className="w-8 h-8 text-neon-green mr-3" />
                <h3 className="text-xl font-cyber font-bold text-white group-hover:text-neon-green transition-colors">
                  {project.name}
                </h3>
              </div>
              
              <p className="text-gray-400 mb-4 font-mono text-sm leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-cyber-dark border border-neon-green/30 rounded text-xs font-mono text-neon-green"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 cyber-button px-4 py-2 rounded text-sm font-mono"
                >
                  <Github className="w-4 h-4" />
                  <span>CODE</span>
                </a>
                <a
                  href={project.demo}
                  className="flex items-center space-x-2 border border-neon-green/50 text-neon-green px-4 py-2 rounded text-sm font-mono hover:bg-neon-green/10 transition-colors"
                >
                  <Terminal className="w-4 h-4" />
                  <span>DEMO</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Placeholder component for Monitor icon
const Monitor = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h6l-2 2v1h8v-1l-2-2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"/>
    </svg>
  </div>
);
