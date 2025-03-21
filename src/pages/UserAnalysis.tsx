
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users,
  Search,
  UserCheck,
  UserX,
  ShieldAlert,
  Clock,
  Filter,
  BarChart4,
  LineChart,
  ArrowUpRight,
  MapPin,
  CreditCard,
  Smartphone
} from "lucide-react";
import { useState } from "react";

export default function UserAnalysis() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock user risk data
  const userRiskData = [
    { id: "user-1", name: "Alex Johnson", email: "alex@example.com", riskScore: 85, status: "high", lastActivity: "2 hours ago", location: "New York, USA", loginAttempts: 12, device: "Mobile" },
    { id: "user-2", name: "Sarah Williams", email: "sarah@example.com", riskScore: 42, status: "medium", lastActivity: "5 hours ago", location: "London, UK", loginAttempts: 3, device: "Desktop" },
    { id: "user-3", name: "Michael Brown", email: "michael@example.com", riskScore: 12, status: "low", lastActivity: "1 day ago", location: "Toronto, Canada", loginAttempts: 1, device: "Mobile" },
    { id: "user-4", name: "Emma Davis", email: "emma@example.com", riskScore: 67, status: "medium", lastActivity: "3 hours ago", location: "Sydney, Australia", loginAttempts: 5, device: "Tablet" },
    { id: "user-5", name: "James Wilson", email: "james@example.com", riskScore: 92, status: "high", lastActivity: "30 minutes ago", location: "Chicago, USA", loginAttempts: 8, device: "Desktop" },
  ];
  
  const getRiskBadge = (status: string) => {
    switch (status) {
      case "high":
        return <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">High Risk</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">Medium Risk</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Low Risk</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="bg-grid absolute inset-0 z-0" aria-hidden="true" />
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-heading">User Analysis</h1>
            <p className="text-muted-foreground mt-2">
              Review user behavior patterns and risk profiles
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <UserCheck className="mr-1 h-3 w-3" />
              User Intelligence
            </Badge>
            <Badge variant="outline" className="bg-teal-500/10 text-teal-500 border-teal-500/20">
              <ShieldAlert className="mr-1 h-3 w-3" />
              Risk Assessment
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-col space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search users by name, email, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-2" />
                Recent
              </Button>
              <Button variant="secondary" size="sm">
                <BarChart4 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
          
          {/* Risk Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-green-500">
                  <UserCheck className="h-5 w-5 mr-2" />
                  Low Risk Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">67%</div>
                <p className="text-sm text-muted-foreground">2,456 users</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-amber-500">
                  <ShieldAlert className="h-5 w-5 mr-2" />
                  Medium Risk Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">28%</div>
                <p className="text-sm text-muted-foreground">1,023 users</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-rose-500">
                  <UserX className="h-5 w-5 mr-2" />
                  High Risk Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">5%</div>
                <p className="text-sm text-muted-foreground">184 users</p>
              </CardContent>
            </Card>
          </div>
          
          {/* User Risk Table */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>User Risk Analysis</CardTitle>
              <CardDescription>Review high-risk user activities and behaviors</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Users</TabsTrigger>
                  <TabsTrigger value="high-risk">High Risk</TabsTrigger>
                  <TabsTrigger value="suspicious">Suspicious Activity</TabsTrigger>
                  <TabsTrigger value="new">New Users</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  {userRiskData.map((user) => (
                    <Card key={user.id} className="overflow-hidden border border-border/50">
                      <CardHeader className="p-4 bg-accent/30">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{user.name}</CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                          </div>
                          <div className="flex items-center gap-2">
                            {getRiskBadge(user.status)}
                            <Badge variant="outline" className="bg-background/30">{user.device}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                            <div>
                              <div className="text-sm text-muted-foreground">Risk Score</div>
                              <div className="font-medium">{user.riskScore}/100</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            <div>
                              <div className="text-sm text-muted-foreground">Last Activity</div>
                              <div className="font-medium">{user.lastActivity}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <div>
                              <div className="text-sm text-muted-foreground">Location</div>
                              <div className="font-medium">{user.location}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Smartphone className="h-4 w-4 mr-2 text-muted-foreground" />
                            <div>
                              <div className="text-sm text-muted-foreground">Login Attempts</div>
                              <div className="font-medium">{user.loginAttempts}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end p-4 pt-0">
                        <Button variant="ghost" size="sm">
                          View Details
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="high-risk">
                  <div className="p-8 text-center text-muted-foreground">
                    Select the "High Risk" filter to view users with elevated risk scores
                  </div>
                </TabsContent>
                
                <TabsContent value="suspicious">
                  <div className="p-8 text-center text-muted-foreground">
                    Select the "Suspicious Activity" filter to view users with unusual behavior patterns
                  </div>
                </TabsContent>
                
                <TabsContent value="new">
                  <div className="p-8 text-center text-muted-foreground">
                    Select the "New Users" filter to view recently registered accounts
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Trend Analysis */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>User Behavior Trends</CardTitle>
              <CardDescription>Visualizing patterns in user activity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center p-10 border border-dashed rounded-lg border-muted-foreground/30">
                <LineChart className="h-20 w-20 text-muted-foreground" />
                <p className="ml-4 text-muted-foreground">Interactive user behavior charts will appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
