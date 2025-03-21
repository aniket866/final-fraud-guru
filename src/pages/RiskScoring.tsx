
import { Navbar } from "@/components/layout/Navbar";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  CreditCard,
  ShieldAlert,
  AlertTriangle,
  BarChart,
  LineChart,
  Users,
  Layers,
  Check,
  ArrowRight,
  Info,
  CheckCircle,
  XCircle,
  AlertCircle,
  Lock,
  Fingerprint,
  Landmark,
  CreditCard as CreditCardIcon,
  Repeat,
  Wallet
} from "lucide-react";

// Mock risk factor data
interface RiskFactor {
  id: string;
  name: string;
  description: string;
  score: number;
  impact: "high" | "medium" | "low";
  status: "active" | "monitoring" | "resolved";
}

interface RiskProfile {
  id: string;
  name: string;
  type: string;
  score: number;
  lastUpdated: string;
  factors: RiskFactor[];
}

export default function RiskScoring() {
  const [selectedProfile, setSelectedProfile] = useState("profile-1");

  // Mock risk profiles
  const riskProfiles: RiskProfile[] = [
    {
      id: "profile-1",
      name: "Credit Card Transactions",
      type: "Transaction",
      score: 78,
      lastUpdated: "2 hours ago",
      factors: [
        {
          id: "factor-1",
          name: "Unusual Location",
          description: "Transaction attempted from a new geographic location",
          score: 85,
          impact: "high",
          status: "active"
        },
        {
          id: "factor-2",
          name: "Transaction Velocity",
          description: "Multiple transactions in a short time period",
          score: 72,
          impact: "medium",
          status: "monitoring"
        },
        {
          id: "factor-3",
          name: "Amount Threshold",
          description: "Transaction amount exceeds normal patterns",
          score: 65,
          impact: "medium",
          status: "active"
        }
      ]
    },
    {
      id: "profile-2",
      name: "New Account Registration",
      type: "Account",
      score: 42,
      lastUpdated: "1 day ago",
      factors: [
        {
          id: "factor-4",
          name: "Email Risk",
          description: "Email domain recently registered",
          score: 55,
          impact: "medium",
          status: "monitoring"
        },
        {
          id: "factor-5",
          name: "Device Fingerprint",
          description: "Device not previously associated with user",
          score: 40,
          impact: "low",
          status: "resolved"
        }
      ]
    },
    {
      id: "profile-3",
      name: "Wire Transfers",
      type: "Transaction",
      score: 92,
      lastUpdated: "30 minutes ago",
      factors: [
        {
          id: "factor-6",
          name: "International Transfer",
          description: "Transfer to high-risk jurisdiction",
          score: 95,
          impact: "high",
          status: "active"
        },
        {
          id: "factor-7",
          name: "Amount Anomaly",
          description: "Transfer amount significantly higher than usual",
          score: 88,
          impact: "high",
          status: "active"
        }
      ]
    }
  ];
  
  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-rose-500";
    if (score >= 50) return "text-amber-500";
    return "text-green-500";
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 75) return "bg-rose-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-green-500";
  };
  
  const getImpactBadge = (impact: "high" | "medium" | "low") => {
    switch (impact) {
      case "high":
        return <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">High Impact</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Medium Impact</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Low Impact</Badge>;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertCircle className="h-4 w-4 text-rose-500" />;
      case "monitoring":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };
  
  const currentProfile = riskProfiles.find(profile => profile.id === selectedProfile) || riskProfiles[0];
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="bg-grid absolute inset-0 z-0" aria-hidden="true" />
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-heading">Risk Scoring</h1>
            <p className="text-muted-foreground mt-2">
              Multi-factor risk assessment and fraud prevention
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <ShieldAlert className="mr-1 h-3 w-3" />
              Risk Engine
            </Badge>
            <Badge variant="outline" className="bg-teal-500/10 text-teal-500 border-teal-500/20">
              <BarChart className="mr-1 h-3 w-3" />
              Analytics
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Risk Score Overview Column */}
          <div className="md:col-span-1 space-y-6">
            {/* Risk Score Summary */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Risk Categories</CardTitle>
                <CardDescription>Select a category to view details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {riskProfiles.map((profile) => (
                  <div 
                    key={profile.id}
                    onClick={() => setSelectedProfile(profile.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedProfile === profile.id 
                        ? 'bg-primary/10 border border-primary/30' 
                        : 'hover:bg-accent/50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {profile.type === "Transaction" ? (
                          <CreditCard className="h-5 w-5 mr-3 text-primary" />
                        ) : (
                          <Users className="h-5 w-5 mr-3 text-primary" />
                        )}
                        <div>
                          <div className="font-medium">{profile.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Updated {profile.lastUpdated}
                          </div>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${getScoreColor(profile.score)}`}>
                        {profile.score}
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={profile.score} className={getProgressColor(profile.score)} />
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Layers className="h-4 w-4 mr-2" />
                  View All Risk Categories
                </Button>
              </CardFooter>
            </Card>
            
            {/* Risk Score Metrics */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Risk Metrics</CardTitle>
                <CardDescription>Key risk indicators over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">Authentication Risk</span>
                    </div>
                    <Badge variant="outline">72/100</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Fingerprint className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">Identity Risk</span>
                    </div>
                    <Badge variant="outline">64/100</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Landmark className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">Financial Risk</span>
                    </div>
                    <Badge variant="outline">81/100</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CreditCardIcon className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">Payment Risk</span>
                    </div>
                    <Badge variant="outline">58/100</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Repeat className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">Velocity Risk</span>
                    </div>
                    <Badge variant="outline">77/100</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Risk Profile Detail Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Selected Risk Profile */}
            <Card className="glass-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{currentProfile.name}</CardTitle>
                    <CardDescription>Detailed risk analysis</CardDescription>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className={`text-3xl font-bold ${getScoreColor(currentProfile.score)}`}>
                      {currentProfile.score}
                    </div>
                    <div className="text-xs text-muted-foreground">Risk Score</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="factors">
                  <TabsList className="mb-4 w-full">
                    <TabsTrigger value="factors">Risk Factors</TabsTrigger>
                    <TabsTrigger value="rules">Applied Rules</TabsTrigger>
                    <TabsTrigger value="history">Score History</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="factors" className="space-y-4">
                    {currentProfile.factors.map((factor) => (
                      <Card key={factor.id} className="overflow-hidden border border-border/50">
                        <CardHeader className="p-4 flex flex-row items-start justify-between">
                          <div className="flex items-start space-x-2">
                            {getStatusIcon(factor.status)}
                            <div>
                              <CardTitle className="text-base">{factor.name}</CardTitle>
                              <CardDescription className="text-sm">{factor.description}</CardDescription>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className={`font-bold ${getScoreColor(factor.score)}`}>
                              {factor.score}/100
                            </div>
                            {getImpactBadge(factor.impact)}
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="mt-2">
                            <Progress value={factor.score} className={getProgressColor(factor.score)} />
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between items-center">
                          <Button variant="ghost" size="sm" className="text-xs">
                            <Info className="h-3 w-3 mr-1" />
                            Learn More
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs">
                            Adjust Threshold
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="rules">
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>Geolocation Verification</span>
                        </div>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Passed
                        </Badge>
                      </div>
                      
                      <div className="p-4 border rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                          <XCircle className="h-4 w-4 text-rose-500 mr-2" />
                          <span>Velocity Check</span>
                        </div>
                        <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">
                          Failed
                        </Badge>
                      </div>
                      
                      <div className="p-4 border rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>Device Verification</span>
                        </div>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Passed
                        </Badge>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history">
                    <div className="h-64 flex justify-center items-center p-10 border border-dashed rounded-lg border-muted-foreground/30">
                      <LineChart className="h-20 w-20 text-muted-foreground" />
                      <p className="ml-4 text-muted-foreground">Risk score history chart will appear here</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* Response Actions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Risk Response Actions</CardTitle>
                <CardDescription>Apply risk mitigation measures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="default" className="justify-start">
                    <Wallet className="h-4 w-4 mr-2" />
                    Hold Transaction
                  </Button>
                  
                  <Button variant="outline" className="justify-start">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Flag for Review
                  </Button>
                  
                  <Button variant="outline" className="justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Request Additional Verification
                  </Button>
                  
                  <Button variant="outline" className="justify-start">
                    <Lock className="h-4 w-4 mr-2" />
                    Apply Restrictions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
