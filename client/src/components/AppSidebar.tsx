
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Terminal, Shield, FileText, Wrench, Link, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AppSidebar() {
  const navigate = useNavigate();
  const [showTerminalRoutes, setShowTerminalRoutes] = useState(false);

  const apiRoutes = [
    { name: "/blogs", path: "/blogs" },
    { name: "/tools", path: "/tools" },
    { name: "/secret", path: "/secret" },
    { name: "/nexus", path: "/nexus" }, // Renamed from apii to nexus for better branding
  ];

  const handleCheckoutAPIRoutes = () => {
    setShowTerminalRoutes(!showTerminalRoutes);
  };

  const handleRouteClick = (path: string) => {
    navigate(path);
  };

  return (
    <Sidebar className="border-neon-green/20">
      <SidebarHeader className="border-b border-neon-green/20 p-4">
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-neon-green" />
          <span className="font-cyber text-neon-green font-bold">CONTROL PANEL</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-cyber-dark">
        <SidebarGroup>
          <SidebarGroupLabel className="text-neon-green/70 font-mono">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate("/")}
                  className="hover:bg-neon-green/10 hover:text-neon-green text-gray-300"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={handleCheckoutAPIRoutes}
                  className="hover:bg-neon-green/10 hover:text-neon-green text-gray-300"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Checkout API Routes</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {showTerminalRoutes && (
                <div className="ml-6 mt-2 space-y-1">
                  <div className="text-xs text-neon-green/60 font-mono mb-2">Available Routes:</div>
                  {apiRoutes.map((route) => (
                    <button
                      key={route.name}
                      onClick={() => handleRouteClick(route.path)}
                      className="block w-full text-left px-3 py-1 text-sm font-mono text-neon-green/80 hover:text-neon-green hover:bg-neon-green/5 rounded border border-neon-green/20 transition-colors"
                    >
                      {route.name}
                    </button>
                  ))}
                </div>
              )}

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate("/blogs")}
                  className="hover:bg-neon-green/10 hover:text-neon-green text-gray-300"
                >
                  <FileText className="w-4 h-4" />
                  <span>Security Blogs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate("/tools")}
                  className="hover:bg-neon-green/10 hover:text-neon-green text-gray-300"
                >
                  <Wrench className="w-4 h-4" />
                  <span>CTF Tools</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate("/nexus")}
                  className="hover:bg-neon-green/10 hover:text-neon-green text-gray-300"
                >
                  <Link className="w-4 h-4" />
                  <span>Nexus Links</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => navigate("/secret")}
                  className="hover:bg-red-400/10 hover:text-red-400 text-gray-300"
                >
                  <Shield className="w-4 h-4" />
                  <span>Classified Access</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-neon-green/20 p-4">
        <div className="text-xs text-neon-green/60 font-mono">
          Status: ONLINE
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
