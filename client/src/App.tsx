import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { AuthProvider } from "@/hooks/useAuth";
import FloatingNav from "@/components/FloatingNav";
import { CursorGlow } from "@/components/CursorGlow";
import { CustomCursor } from "@/components/CustomCursor";
import Index from "./pages/Index";
import Blogs from "./pages/Blogs";
import Tools from "./pages/Tools";
import Secret from "./pages/Secret";
import Hacks from "./pages/Hacks";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <div className="min-h-screen flex w-full relative">
            <CustomCursor />
            {/* <CursorGlow /> */}
            <main className="flex-1 relative z-10">
              <Switch>
                <Route path="/" component={Index} />
                <Route path="/blogs" component={Blogs} />
                <Route path="/tools" component={Tools} />
                <Route path="/secret" component={Secret} />
                <Route path="/hacks" component={Hacks} />
                <Route path="/admin" component={Admin} />
                <Route component={NotFound} />
              </Switch>
            </main>
            <FloatingNav />
          </div>
        </Router>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
