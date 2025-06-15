
export const AboutSection = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          About Me
        </h2>
        
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 font-mono">
          <div className="text-accent-teal mb-2">const nikesh = &#123;</div>
          <div className="ml-4 space-y-2 text-gray-300">
            <div><span className="text-purple-400">location</span>: <span className="text-green-400">"Kathmandu, Nepal"</span>,</div>
            <div><span className="text-purple-400">stack</span>: [<span className="text-green-400">"React"</span>, <span className="text-green-400">"Node.js"</span>, <span className="text-green-400">"Python"</span>, <span className="text-green-400">"Linux"</span>, <span className="text-green-400">"Burp Suite"</span>],</div>
            <div><span className="text-purple-400">interests</span>: [<span className="text-green-400">"CTFs"</span>, <span className="text-green-400">"Ethical Hacking"</span>, <span className="text-green-400">"Web Security"</span>, <span className="text-green-400">"DevSecOps"</span>],</div>
            <div><span className="text-purple-400">currentFocus</span>: <span className="text-green-400">"Building secure, scalable applications"</span>,</div>
            <div><span className="text-purple-400">motto</span>: <span className="text-green-400">"Security by design, not by accident"</span></div>
          </div>
          <div className="text-accent-teal">&#125;</div>
        </div>

        <div className="mt-8 text-center">
          <a 
            href="/resume.pdf" 
            target="_blank"
            className="inline-flex items-center bg-gray-800 text-gray-300 px-6 py-3 rounded-lg border border-gray-600 hover:border-accent-teal hover:text-accent-teal transition-colors"
          >
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
};
