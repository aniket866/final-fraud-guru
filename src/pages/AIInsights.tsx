
import { Navbar } from "@/components/layout/Navbar";
import { AIInsights as AIInsightsComponent } from "@/components/dashboard/AIInsights";
import { Badge } from "@/components/ui/badge";
import { Brain, LineChart, TrendingUp, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AIInsights() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="bg-grid absolute inset-0 z-0" aria-hidden="true" />
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-heading">AI Insights</h1>
            <p className="text-muted-foreground mt-2">
              Machine learning-powered fraud detection insights and recommendations
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <Brain className="mr-1 h-3 w-3" />
              AI Powered
            </Badge>
            <Badge variant="outline" className="bg-teal-500/10 text-teal-500 border-teal-500/20">
              <TrendingUp className="mr-1 h-3 w-3" />
              Real-time
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Main AI Insights Component */}
          <AIInsightsComponent />
          
          {/* Additional Insights Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                  Trend Analysis
                </CardTitle>
                <CardDescription>Pattern recognition</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Advanced ML algorithms continuously analyze transaction patterns to identify emerging fraud trends.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  Anomaly Detection
                </CardTitle>
                <CardDescription>Unusual behavior identification</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Detect statistical anomalies and outliers that may indicate suspicious activity.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 text-blue-500 mr-2" />
                  Predictive Modeling
                </CardTitle>
                <CardDescription>Future risk projection</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Forecast potential fraud risks based on historical data and current trends.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
