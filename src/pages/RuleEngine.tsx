
import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { RuleEnginePanel } from "@/components/rule-engine/RuleEnginePanel";
import { FraudReport } from "@/components/reports/FraudReport";
import { Button } from "@/components/ui/button";
import { 
  NotificationIcon, 
  NotificationCenter, 
  useNotifications 
} from "@/components/ui/notification-center";
import { Shield, RefreshCw, Zap, Settings } from "lucide-react";
import { toast } from "sonner";

export default function RuleEngine() {
  const { 
    notifications, 
    unreadCount, 
    addNotification, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAllNotifications 
  } = useNotifications();
  
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Floating particles effect
  useEffect(() => {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;
    
    // Clear any existing particles
    while (particlesContainer.firstChild) {
      particlesContainer.removeChild(particlesContainer.firstChild);
    }
    
    // Create particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('span');
      
      // Random size between 5px and 20px
      const size = Math.random() * 15 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random animation delay
      particle.style.animationDelay = `${Math.random() * 25}s`;
      
      // Random animation duration between 15s and 30s
      particle.style.animationDuration = `${Math.random() * 15 + 15}s`;
      
      particlesContainer.appendChild(particle);
    }
  }, []);
  
  // Close notification center when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotificationCenter(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleRefresh = () => {
    setRefreshing(true);
    toast.info("Refreshing rule engine data...");
    
    setTimeout(() => {
      setRefreshing(false);
      toast.success("Rule engine data refreshed!");
      
      // Add a notification
      addNotification({
        title: "Rule Engine Refreshed",
        message: "All rule configurations have been updated and synchronized",
        type: "success"
      });
    }, 1500);
  };

  const runAllRules = () => {
    toast.info("Running all rules against recent transactions...");
    
    setTimeout(() => {
      addNotification({
        title: "Rules Execution Complete",
        message: "12 transactions flagged for review across 5 rules",
        type: "fraud"
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="floating-particles" aria-hidden="true" />
      <div className="bg-grid absolute inset-0 z-0" aria-hidden="true" />
      <div className="animated-bg-teal absolute inset-0 z-0" aria-hidden="true" />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gradient-heading">Fraud Rule Engine</h1>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleRefresh}
              disabled={refreshing}
              variant="outline"
              className="btn-glow flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            
            <Button 
              onClick={runAllRules}
              className="btn-animated btn-shine"
            >
              <Zap className="h-4 w-4 mr-2" />
              Run All Rules
            </Button>
            
            <div ref={notificationRef} className="relative">
              <NotificationIcon 
                count={unreadCount} 
                onClick={() => setShowNotificationCenter(!showNotificationCenter)} 
              />
              
              {showNotificationCenter && (
                <div className="absolute right-0 mt-2 z-50">
                  <NotificationCenter 
                    notifications={notifications}
                    markAsRead={markAsRead}
                    markAllAsRead={markAllAsRead}
                    removeNotification={removeNotification}
                    clearAllNotifications={clearAllNotifications}
                    onClose={() => setShowNotificationCenter(false)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="glass-card p-6 rounded-lg border-t-4 border-t-primary animate-in fade-in">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Rule-Based Fraud Detection</h2>
                <p className="text-muted-foreground">
                  Create, manage, and test fraud detection rules to identify suspicious patterns in real-time.
                  Rules are evaluated against each transaction to automatically flag or block potential fraud.
                </p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto h-8">
                <Settings className="h-3.5 w-3.5 mr-1.5" />
                Configure
              </Button>
            </div>
          </div>
          
          <RuleEnginePanel />
          
          <FraudReport />
        </div>
      </main>
    </div>
  );
}
