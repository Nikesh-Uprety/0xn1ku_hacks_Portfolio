
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import FloatingNav from "@/components/FloatingNav";
import { CursorGlow } from "@/components/CursorGlow";
import Index from "./pages/Index";
import Blogs from "./pages/Blogs";
import Tools from "./pages/Tools";
import Secret from "./pages/Secret";
import Nexus from "./pages/Nexus";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex w-full relative">
            <CursorGlow />
            <main className="flex-1 relative z-10">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/secret" element={<Secret />} />
                <Route path="/nexus" element={<Nexus />} />
                <Route path="/hacks" element={<Nexus />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <FloatingNav />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
