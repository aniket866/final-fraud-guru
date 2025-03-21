
import { useState, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { FraudMetrics } from "@/components/dashboard/FraudMetrics";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { FraudTypeAnalysis } from "@/components/dashboard/FraudTypeAnalysis";
import { PaymentMethodAnalysis } from "@/components/dashboard/PaymentMethodAnalysis";
import { FraudRulesets } from "@/components/dashboard/FraudRulesets";
import { Button } from "@/components/ui/button";
import { CreditCard, ShieldAlert, Users, RefreshCw, BarChart2, Activity, Zap } from "lucide-react";
import { useState as useHookState } from "react";
import { toast } from "sonner";
import { NotificationIcon, NotificationCenter, useNotifications } from "@/components/ui/notification-center";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);
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
  const notificationRef = useRef<HTMLDivElement>(null);

  const handleRefresh = () => {
    setRefreshing(true);
    toast.info("Refreshing dashboard data...");
    setTimeout(() => {
      setRefreshing(false);
      toast.success("Dashboard data refreshed!");

      // Add a notification
      addNotification({
        title: "Dashboard Updated",
        message: "Latest fraud metrics and transaction data loaded",
        type: "info"
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="floating-particles" aria-hidden="true" />
      <div className="bg-grid absolute inset-0 z-0" aria-hidden="true" />
      <div className="animated-bg-teal absolute inset-0 z-0" aria-hidden="true" />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gradient-heading">Fraud Monitoring Dashboard</h1>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleRefresh}
              disabled={refreshing}
              variant="outline"
              className="btn-glow flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh Data
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
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6 rounded-lg flex items-center space-x-4 animate-in fade-in btn-glow">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <ShieldAlert className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Fraud Alerts</p>
              <h3 className="text-2xl font-bold">2,483</h3>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-lg flex items-center space-x-4 animate-in fade-in [animation-delay:200ms] btn-glow">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Blocked Transactions</p>
              <h3 className="text-2xl font-bold">$143,821</h3>
              <p className="text-xs text-muted-foreground">Saved this month</p>
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-lg flex items-center space-x-4 animate-in fade-in [animation-delay:400ms] btn-glow">
            <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-teal-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Protected Users</p>
              <h3 className="text-2xl font-bold">12,956</h3>
              <p className="text-xs text-muted-foreground">Active accounts secured</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="outline" className="btn-animated btn-shine">
            <ShieldAlert className="h-4 w-4 mr-2" />
            View Alerts
          </Button>
          <Button variant="outline" className="btn-animated btn-shine">
            <BarChart2 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline" className="btn-animated btn-shine">
            <Activity className="h-4 w-4 mr-2" />
            Monitoring
          </Button>
          <Link to="/rule-engine">
            <Button className="btn-animated btn-shine">
              <Zap className="h-4 w-4 mr-2" />
              Rule Engine
            </Button>
          </Link>
        </div>
        
        <div className="space-y-8">
          <DashboardHeader />
          
          <TransactionTable />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FraudTypeAnalysis />
            <PaymentMethodAnalysis />
          </div>
          
          <FraudMetrics />
          
          <FraudRulesets />
          
          <AIInsights />
        </div>
      </main>
    </div>
  );
}
