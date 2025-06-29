
export const SkillsSection = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Skills
        </h2>

        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 font-mono">
          <div className="text-accent-teal mb-4">tree /skills</div>
          <div className="text-gray-300 space-y-2">
            <div className="flex">
              <span className="text-gray-500">├──</span>
              <span className="ml-2">
                <span className="text-purple-400">languages</span>: JavaScript,
                Python, C, Go, Bash 
              </span>
            </div>
            <div className="flex">
              <span className="text-gray-500">├──</span>
              <span className="ml-2">
                <span className="text-purple-400">frameworks</span>: React,
                Node.js, Express, FastAPI, Flask
              </span>
            </div>
            <div className="flex">
              <span className="text-gray-500">├──</span>
              <span className="ml-2">
                <span className="text-purple-400">security</span>: Burp Suite,
                Nmap, Metasploit, OWASP, Wireshark
              </span>
            </div>
            <div className="flex">
              <span className="text-gray-500">├──</span>
              <span className="ml-2">
                <span className="text-purple-400">devops</span>: Docker, GitHub
                Actions, AWS, Linux, Nginx
              </span>
            </div>
            <div className="flex">
              <span className="text-gray-500">├──</span>
              <span className="ml-2">
                <span className="text-purple-400">databases</span>: PostgreSQL,
                MongoDB, Redis, Supabase
              </span>
            </div>
            <div className="flex">
              <span className="text-gray-500">├──</span>
              <span className="ml-2">
                <span className="text-purple-400">tools</span>: Git, VS Code,
                Vim, Postman
              </span>
            </div>
            <div className="flex">
              <span className="text-gray-500">└──</span>
              <span className="ml-2">
                <span className="text-purple-400">platforms</span>: GitHub,
                Vercel, Railway, DigitalOcean, Render, Firebase
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-accent-teal mb-4">
              Certifications
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Explore React.js Development (20hrs)</li>
              <li>• Javascript30 - Wes Bos (Build 30 apps in 30 Days)</li>
              <li>• Javascript - For Beginners</li>
              <li>• Basics of web - Internet fundamentals</li>
              <li>• Offensive Penetration Testing</li>
            </ul>
          </div>

          <div className="bg-gray-900 rounded-lg border border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-accent-teal mb-4">
              CTF Rankings
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• PicoCTF 2024: Top 5%</li>
              <li>• TryHackMe: Top 10%</li>
              <li>• Local CTFs: Multiple Wins</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
