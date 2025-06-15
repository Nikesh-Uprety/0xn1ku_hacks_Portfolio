
import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export const ContactSection = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = "Contact from Portfolio";
    const body = `${message}\n\nFrom: ${email}`;
    window.open(`mailto:upretynikesh021@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get In Touch
          </h2>
        </div>

        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 mb-8 font-mono">
          <div className="text-accent-teal mb-4">
            {'>'} contact ./nikuhacks
          </div>
          <div className="text-gray-300 ml-4">
            ={'>'} [ 
            <a href="https://github.com/Nikesh-Uprety" className="text-accent-teal hover:underline mx-2" target="_blank" rel="noopener noreferrer">github</a>
            ] [ 
            <a href="https://www.linkedin.com/in/nikesh-uprety-287a88244/" className="text-accent-teal hover:underline mx-2" target="_blank" rel="noopener noreferrer">linkedin</a>
            ] [ 
            <a href="mailto:upretynikesh021@gmail.com" className="text-accent-teal hover:underline mx-2">email</a>
            ]
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Let's collaborate</h3>
            <p className="text-gray-400 mb-6">
              I'm always interested in discussing cybersecurity projects, CTF challenges, 
              or opportunities to build secure applications. Feel free to reach out!
            </p>
            
            <div className="space-y-4">
              <a 
                href="https://github.com/Nikesh-Uprety" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-accent-teal transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>github.com/Nikesh-Uprety</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/nikesh-uprety-287a88244/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-accent-teal transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span>nikesh-uprety</span>
              </a>
              <a 
                href="mailto:upretynikesh021@gmail.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-accent-teal transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>upretynikesh021@gmail.com</span>
              </a>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-accent-teal transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-accent-teal transition-colors resize-none"
                  placeholder="Your message here..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent-teal text-dark-bg px-6 py-3 rounded-lg font-medium hover:bg-accent-teal/90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
