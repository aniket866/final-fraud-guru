
import { useState } from "react";
import { LineChart, Line, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, CheckCircle2, TrendingUp, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFraudTimeSeries, getConfusionMatrix, transactions } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export function DashboardHeader() {
  const [timeframe, setTimeframe] = useState("7d");
  const days = timeframe === "7d" ? 7 : timeframe === "30d" ? 30 : 90;
  const timeSeriesData = getFraudTimeSeries(transactions, days);
  const matrix = getConfusionMatrix(transactions);
  
  const totalTransactions = transactions.length;
  const predictedFrauds = transactions.filter(t => t.is_fraud_predicted).length;
  const reportedFrauds = transactions.filter(t => t.is_fraud_reported).length;
  
  const stats = [
    {
      title: "Total Transactions",
      value: totalTransactions,
      icon: Clock,
      description: "Last 30 days",
      color: "text-primary",
      trend: "+12.5%",
      trendUp: true
    },
    {
      title: "Predicted Frauds",
      value: predictedFrauds,
      icon: AlertTriangle,
      description: `${((predictedFrauds / totalTransactions) * 100).toFixed(2)}% of total`,
      color: "text-yellow-500",
      trend: "-3.2%",
      trendUp: false
    },
    {
      title: "Reported Frauds",
      value: reportedFrauds,
      icon: AlertCircle,
      description: `${((reportedFrauds / totalTransactions) * 100).toFixed(2)}% of total`,
      color: "text-rose-500",
      trend: "+1.8%",
      trendUp: true
    },
    {
      title: "Detection Accuracy",
      value: `${(matrix.precision * 100).toFixed(1)}%`,
      icon: CheckCircle2,
      description: `F1 Score: ${(matrix.f1Score * 100).toFixed(1)}%`,
      color: "text-emerald-500",
      trend: "+5.3%",
      trendUp: true
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={stat.title} className="overflow-hidden glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", `${stat.color}/10`)}>
                <stat.icon className={cn("w-4 h-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <div className="mt-2 flex items-center text-xs">
                <TrendingUp className={cn("mr-1 h-3 w-3", stat.trendUp ? "text-emerald-500" : "text-rose-500")} />
                <span className={stat.trendUp ? "text-emerald-500" : "text-rose-500"}>{stat.trend}</span>
                <span className="text-muted-foreground ml-1">vs previous period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-card overflow-hidden">
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Fraud Trends</CardTitle>
              <CardDescription>Comparison of predicted vs reported frauds</CardDescription>
            </div>
            <Tabs defaultValue="7d" className="w-[200px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="7d" onClick={() => setTimeframe("7d")}>7d</TabsTrigger>
                <TabsTrigger value="30d" onClick={() => setTimeframe("30d")}>30d</TabsTrigger>
                <TabsTrigger value="90d" onClick={() => setTimeframe("90d")}>90d</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }} 
                  tickFormatter={(value) => {
                    // Format date based on timeframe
                    const date = new Date(value);
                    if (timeframe === "7d") {
                      return date.toLocaleDateString(undefined, { weekday: 'short' });
                    } else if (timeframe === "30d") {
                      return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
                    } else {
                      return date.toLocaleDateString(undefined, { month: 'short' });
                    }
                  }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.8)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "white",
                  }}
                  formatter={(value: number, name: string) => [
                    value,
                    name === "fraudPredicted" ? "Predicted Frauds" : "Reported Frauds",
                  ]}
                  labelFormatter={(label) => {
                    return new Date(label).toLocaleDateString(undefined, { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    });
                  }}
                />
                <Legend formatter={(value) => (value === "fraudPredicted" ? "Predicted" : "Reported")} />
                <Line
                  type="monotone"
                  dataKey="fraudPredicted"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  animationDuration={1000}
                />
                <Line
                  type="monotone"
                  dataKey="fraudReported"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
