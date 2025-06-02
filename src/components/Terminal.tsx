import { useState, useRef, useEffect } from "react";
import { Minus, Square, X, Maximize, Minimize } from "lucide-react";

const Terminal = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [commands, setCommands] = useState<string[]>([
    "                   -`                    0xN1kU_H4X_!@kali-linux",
    "                  .o+`                   -----------------",
    "                 `ooo/                   OS: Kali GNU/Linux Rolling x86_64",
    "                `+oooo:                  Host: Aws Cluster Workstation v2.0",
    "               `+oooooo:                 Kernel: 6.1.0-kali7-amd64",
    "               -+oooooo+:                Shell: zsh 5.9",
    "             `/:-:++oooo+:               Resolution: 1920x1080",
    "            `/++++/+++++++:              Terminal: gnome-terminal",
    "           `/++++++++++++++:             CPU: Intel i7-12700K (16) @ 5.0GHz",
    "          `/+++ooooooooo+++/             GPU: NVIDIA RTX 3080",
    "         ./ooosssso++osssssso+`          Memory: 32GB DDR4",
    "        .oossssso-````/ossssss+`         ",
    "       -osssssso.      :ssssssso.        ",
    "      :osssssss/        osssso+++.       ",
    "     /ossssssss/        +ssssooo/-       ",
    "   `/ossssso+/:-        -:/+osssso+-     ",
    "  `+sso+:-`                 `.-/+oso:    ",
    " `++:.                           `-/+/   ",
    " .`                                 `/   ",
    "",
    "Type 'help' for available commands",
    "",
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const simulatedCommands: Record<string, () => string[]> = {
    help: () => [
      "Available commands:",
      "  whoami        - Display current user",
      "  ls            - List directory contents",
      "  ifconfig      - Network configuration",
      "  ps aux        - Running processes",
      "  nmap          - Network scanner",
      "  clear         - Clear terminal",
      "  neofetch      - System information",
      "  hack          - Initialize hacking mode 😈",
      "",
    ],
    whoami: () => ["0xN1kU_H4X_!"],
    ls: () => [
      "drwxr-xr-x  2 0xN1kU_H4X_! 0xN1kU_H4X_! 4096 Dec 15 10:30 exploits/",
      "drwxr-xr-x  2 0xN1kU_H4X_! 0xN1kU_H4X_! 4096 Dec 15 10:30 payloads/",
      "drwxr-xr-x  2 0xN1kU_H4X_! 0xN1kU_H4X_! 4096 Dec 15 10:30 scripts/",
      "drwxr-xr-x  2 0xN1kU_H4X_! 0xN1kU_H4X_! 4096 Dec 15 10:30 top_secret.txt/",
      "-rw-r--r--  1 0xN1kU_H4X_! 0xN1kU_H4X_! 1337 Dec 15 10:30 targets.txt",
      "-rwxr-xr-x  1 0xN1kU_H4X_! 0xN1kU_H4X_! 2048 Dec 15 10:30 scanner.py",
      "",
    ],
    ifconfig: () => [
      "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500",
      "        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255",
      "        inet6 fe80::a00:27ff:fe4e:66a1  prefixlen 64  scopeid 0x20<link>",
      "        ether 08:00:27:4e:66:a1  txqueuelen 1000  (Ethernet)",
      "",
    ],
    "ps aux": () => [
      "USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND",
      "root         1  0.0  0.1  22520  1616 ?        Ss   10:00   0:01 /sbin/init",
      "0xN1kU    1337  0.0  0.5  58972  5120 pts/0    S+   10:30   0:00 ./exploit",
      "0xN1kU    1338  0.0  0.3  45672  3456 pts/1    R+   10:31   0:00 nmap -sS target",
      "",
    ],
    nmap: () => [
      "Starting Nmap 7.94 ( https://nmap.org )",
      "Nmap scan report for target (192.168.1.10)",
      "Host is up (0.00050s latency).",
      "PORT     STATE SERVICE",
      "22/tcp   open  ssh",
      "80/tcp   open  http",
      "443/tcp  open  https",
      "3389/tcp open  ms-wbt-server",
      "",
    ],
    neofetch: () => [
      "                   -`                    0xN1kU_H4X_!@kali-linux",
      "                  .o+`                   -----------------",
      "                 `ooo/                   OS: Kali GNU/Linux Rolling x86_64",
      "                `+oooo:                  Host: Hacker Workstation v2.0",
      "               `+oooooo:                 Kernel: 6.1.0-kali7-amd64",
      "               -+oooooo+:                Shell: zsh 5.9",
      "             `/:-:++oooo+:               Resolution: 1920x1080",
      "            `/++++/+++++++:              Terminal: gnome-terminal",
      "           `/++++++++++++++:             CPU: Intel i7-12700K (16) @ 5.0GHz",
      "          `/+++ooooooooo+++/             GPU: NVIDIA RTX 3080",
      "         ./ooosssso++osssssso+`          Memory: 32GB DDR4",
      "        .oossssso-````/ossssss+`         ",
      "       -osssssso.      :ssssssso.        ",
      "      :osssssss/        osssso+++.       ",
      "     /ossssssss/        +ssssooo/-       ",
      "   `/ossssso+/:-        -:/+osssso+-     ",
      "  `+sso+:-`                 `.-/+oso:    ",
      " `++:.                           `-/+/   ",
      " .`                                 `/   ",
      "",
    ],
    hack: () => [
      "Initializing hacking protocols...",
      "Loading exploits... ████████████ 100%",
      "Bypassing firewalls... ████████████ 100%",
      "Accessing mainframe... ████████████ 100%",
      "You're in! 🔓",
      "Just kidding! This is just a demo terminal 😄",
      "",
    ],
    clear: () => {
      setCommands([]);
      return [];
    },
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newCommands = [...commands, `0xN1kU_H4X_!@kali:~$ ${cmd}`];
    
    if (simulatedCommands[trimmedCmd]) {
      const output = simulatedCommands[trimmedCmd]();
      if (trimmedCmd !== 'clear') {
        setCommands([...newCommands, ...output]);
      }
    } else if (trimmedCmd === '') {
      setCommands([...newCommands]);
    } else {
      setCommands([...newCommands, `bash: ${cmd}: command not found`, ""]);
    }
    
    setCommandHistory(prev => [...prev, cmd]);
    setCurrentInput("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  if (!isVisible) {
    return null;
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="terminal-window px-4 py-2 rounded font-mono text-sm text-neon-green hover:bg-opacity-80 transition-all"
        >
          Terminal
        </button>
      </div>
    );
  }

  const terminalClasses = isMaximized 
    ? "fixed inset-4 z-50 terminal-window rounded-lg overflow-hidden flex flex-col"
    : "fixed bottom-4 right-4 w-96 h-80 z-50 terminal-window rounded-lg overflow-hidden flex flex-col";

  return (
    <div className={terminalClasses}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between bg-cyber-dark border-b border-neon-green/30 px-4 py-2 flex-shrink-0">
        <span className="text-sm font-mono text-neon-green">0xN1kU_H4X_!@kali: ~</span>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors flex items-center justify-center"
          >
            <Minus className="w-2 h-2" />
          </button>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors flex items-center justify-center"
          >
            {isMaximized ? <Minimize className="w-2 h-2" /> : <Maximize className="w-2 h-2" />}
          </button>
          <button 
            onClick={() => setIsMinimized(true)}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors flex items-center justify-center"
          >
            <X className="w-2 h-2" />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-sm bg-black cursor-text"
        style={{ 
          minHeight: 0,
          overflowY: 'auto',
          scrollBehavior: 'smooth'
        }}
      >
        {commands.map((line, index) => (
          <div key={index} className="text-neon-green whitespace-pre-wrap">
            {line}
          </div>
        ))}
        <div className="flex items-center text-neon-green">
          <span>0xN1kU_H4X_!@kali:~$ </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-neon-green font-mono"
            autoFocus
          />
          <span className="animate-blink">_</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
