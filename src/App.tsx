
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/lib/theme";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Detection from "./pages/Detection";
import Reporting from "./pages/Reporting";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import RiskScoring from "./pages/RiskScoring";
import UserAnalysis from "./pages/UserAnalysis";
import TransactionHistory from "./pages/TransactionHistory";
import AIInsights from "./pages/AIInsights";
import Compliance from "./pages/Compliance";
import BlockControls from "./pages/BlockControls";
import RuleEngine from "./pages/RuleEngine";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" defaultAccent="teal">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/detection" element={<Detection />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/risk-scoring" element={<RiskScoring />} />
            <Route path="/user-analysis" element={<UserAnalysis />} />
            <Route path="/history" element={<TransactionHistory />} />
            <Route path="/ai-insights" element={<AIInsights />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/block-controls" element={<BlockControls />} />
            <Route path="/rule-engine" element={<RuleEngine />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
