
import { useState, useEffect } from "react";
import { Github, Terminal, Zap, Code, Globe, Shield } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "React.JS Learning Path",
    description: "Comprehensive 20-hour React.JS course covering fundamentals, hooks, state management, and modern development practices.",
    tech: ["React", "JavaScript", "CSS", "HTML"],
    github: "https://github.com/Nikesh-Uprety/React.JS_LearningPath-20hrsCOURSE",
    demo: "#",
    icon: Code
  },
  {
    id: 2,
    name: "NIKU BLOG MERN",
    description: "Full-stack blog application built with MongoDB, Express.js, React, and Node.js featuring user authentication and content management.",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
    github: "https://github.com/Nikesh-Uprety/NIKU_BLOG_MERN",
    demo: "#",
    icon: Globe
  },
  {
    id: 3,
    name: "Hash Buster Tool",
    description: "Python-based hash cracking tool for cybersecurity testing and password analysis with multiple hash algorithm support.",
    tech: ["Python", "Cryptography", "Security", "CLI"],
    github: "https://github.com/Nikesh-Uprety/Hash-Buster_Tool.py",
    demo: "#",
    icon: Shield
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
        .0xN1kU_H4X_!@kali:~$ ls -la /projects/
        </div>
        <h2 className="text-4xl md:text-5xl font-cyber font-bold text-white mb-4">
          FEATURED <span className="text-neon-green">PROJECTS</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          A collection of development projects, cybersecurity tools, and
          learning resources.
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
                isVisible ? "animate-fade-slide-up" : "opacity-0"
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
