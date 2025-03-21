
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  ShieldCheck, 
  Share2, 
  BarChart3,
  RefreshCw,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { cn } from "@/lib/utils";

type InsightType = "pattern" | "anomaly" | "trend" | "recommendation";

interface Insight {
  id: string;
  type: InsightType;
  title: string;
  description: string;
  confidence: number;
  timestamp: string;
  impact: "high" | "medium" | "low";
}

// Mock AI insights
const mockInsights: Insight[] = [
  {
    id: "ai-1",
    type: "anomaly",
    title: "Unusual spike in mobile transactions",
    description: "Detected a 43% increase in fraudulent attempts via mobile platform in the last 24 hours, specifically targeting transactions over $500.",
    confidence: 0.89,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    impact: "high"
  },
  {
    id: "ai-2",
    type: "pattern",
    title: "New fraud pattern detected",
    description: "Multiple small transactions followed by a large one from the same device ID but different payment methods.",
    confidence: 0.76,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    impact: "medium"
  },
  {
    id: "ai-3",
    type: "trend",
    title: "Fraud rate decreasing for Bank B",
    description: "Bank B shows a 12% decrease in fraud rates after implementing the new verification protocol.",
    confidence: 0.92,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    impact: "medium"
  },
  {
    id: "ai-4",
    type: "recommendation",
    title: "Adjust rule thresholds for UPI transactions",
    description: "Current thresholds may be causing false positives. Recommend increasing threshold by 10% for better precision.",
    confidence: 0.81,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    impact: "low"
  },
  {
    id: "ai-5",
    type: "anomaly",
    title: "Geographical anomaly detected",
    description: "Multiple transactions from unusual locations for 5 high-value customers in the past 6 hours.",
    confidence: 0.88,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    impact: "high"
  }
];

export function AIInsights() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const refreshInsights = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const getIcon = (type: InsightType) => {
    switch (type) {
      case "pattern":
        return <ShieldCheck className="h-5 w-5 text-blue-500" />;
      case "anomaly":
        return <AlertTriangle className="h-5 w-5 text-rose-500" />;
      case "trend":
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case "recommendation":
        return <Lightbulb className="h-5 w-5 text-amber-500" />;
    }
  };

  const getImpactBadge = (impact: "high" | "medium" | "low") => {
    switch (impact) {
      case "high":
        return (
          <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">
            High Impact
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            Medium Impact
          </Badge>
        );
      case "low":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Low Impact
          </Badge>
        );
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>
                Machine learning-powered fraud detection insights
              </CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refreshInsights}
            disabled={loading}
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
            {loading ? "Analyzing..." : "Refresh"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="animate-in fade-in">
        <div className="space-y-4">
          {mockInsights.map((insight) => (
            <div
              key={insight.id}
              className={cn(
                "p-4 rounded-lg border transition-all duration-200",
                expanded[insight.id] ? "glass" : "bg-background/30"
              )}
            >
              <div 
                className="flex items-start justify-between cursor-pointer"
                onClick={() => toggleExpand(insight.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">{getIcon(insight.type)}</div>
                  <div>
                    <h3 className="font-medium">{insight.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {formatTimestamp(insight.timestamp)} • Confidence: {(insight.confidence * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getImpactBadge(insight.impact)}
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    {expanded[insight.id] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              {expanded[insight.id] && (
                <div className="mt-4 pl-8 animate-in fade-in">
                  <p className="text-sm text-muted-foreground mb-3">
                    {insight.description}
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="secondary" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analyze
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
