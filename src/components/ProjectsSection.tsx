
import { useState, useEffect } from "react";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "React.JS Learning Path",
    description: "Comprehensive 20-hour React.JS course covering fundamentals, hooks, state management, and modern development practices.",
    category: "[Web Dev]",
    tech: ["React", "JavaScript", "CSS", "HTML"],
    github: "https://github.com/Nikesh-Uprety/React.JS_LearningPath-20hrsCOURSE",
    demo: "#",
    status: "Completed"
  },
  {
    id: 2,
    name: "NIKU BLOG MERN",
    description: "Full-stack blog application built with MongoDB, Express.js, React, and Node.js featuring user authentication and content management.",
    category: "[Full Stack]",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
    github: "https://github.com/Nikesh-Uprety/NIKU_BLOG_MERN",
    demo: "#",
    status: "Live"
  },
  {
    id: 3,
    name: "Hash Buster Tool",
    description: "Python-based hash cracking tool for cybersecurity testing and password analysis with multiple hash algorithm support.",
    category: "[Security]",
    tech: ["Python", "Cryptography", "Security", "CLI"],
    github: "https://github.com/Nikesh-Uprety/Hash-Buster_Tool.py",
    demo: "#",
    status: "Open Source"
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
    <div className="container mx-auto px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg">
            A collection of development projects, security tools, and CTF challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const isVisible = visibleProjects.includes(project.id);

            return (
              <div
                key={project.id}
                data-project-id={project.id}
                className={`bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-accent-teal transition-all duration-300 group ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-accent-teal font-mono text-sm font-semibold">
                    {project.category}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-mono ${
                    project.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                    project.status === 'Completed' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent-teal transition-colors">
                  {project.name}
                </h3>

                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-800 border border-gray-600 rounded text-xs font-mono text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-accent-teal px-3 py-2 rounded text-sm font-mono transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.demo}
                    className="flex items-center space-x-2 border border-gray-600 hover:border-accent-teal text-gray-300 hover:text-accent-teal px-3 py-2 rounded text-sm font-mono transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
