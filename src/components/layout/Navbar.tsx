
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  AlertCircle, 
  BarChart3, 
  Shield, 
  FileText, 
  Settings, 
  Menu, 
  X,
  Users,
  History,
  CreditCard,
  Brain,
  Gavel,
  Ban,
  Lock,
  FilterX
} from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Detection", href: "/detection", icon: Shield },
  { name: "Reporting", href: "/reporting", icon: FileText },
  { name: "Risk Scoring", href: "/risk-scoring", icon: CreditCard },
  { name: "User Analysis", href: "/user-analysis", icon: Users },
  { name: "Transaction History", href: "/history", icon: History },
  { name: "AI Insights", href: "/ai-insights", icon: Brain },
  { name: "Compliance", href: "/compliance", icon: Gavel },
  { name: "Block Controls", href: "/block-controls", icon: Ban },
  { name: "Rule Engine", href: "/rule-engine", icon: FilterX },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden group">
              <AlertCircle className="w-6 h-6 text-primary z-10 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"></div>
            </div>
            <span className="font-semibold text-xl tracking-tight hidden sm:block">FraudGuard</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center",
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-2">
            <ThemeSwitcher />
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-dialog animate-in slide-in-right p-4 mt-2 mx-4 rounded-lg">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center",
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
