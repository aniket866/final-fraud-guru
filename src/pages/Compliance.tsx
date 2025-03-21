
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { 
  Gavel, 
  FileCheck, 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  Clock, 
  FileText,
  BarChart,
  User,
  CreditCard,
  RefreshCw
} from "lucide-react";

export default function Compliance() {
  const [complianceStatus, setComplianceStatus] = useState({
    kyc: true,
    aml: true,
    gdpr: false,
    pci: true,
    sanctions: true,
    reporting: false
  });

  const toggleCompliance = (key: keyof typeof complianceStatus) => {
    setComplianceStatus(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="bg-grid absolute inset-0 z-0" aria-hidden="true" />
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-heading">Compliance</h1>
            <p className="text-muted-foreground mt-2">
              Regulatory compliance monitoring and management
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <ShieldCheck className="mr-1 h-3 w-3" />
              Compliance Tools
            </Badge>
            <Badge variant="outline" className="bg-teal-500/10 text-teal-500 border-teal-500/20">
              <FileCheck className="mr-1 h-3 w-3" />
              Regulation Updates
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Compliance Dashboard */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gavel className="h-5 w-5 text-primary mr-2" />
                Compliance Dashboard
              </CardTitle>
              <CardDescription>
                Monitor your regulatory compliance status and requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-accent/30 border border-border/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <User className="h-4 w-4 mr-2 text-primary" />
                      KYC Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <Badge variant={complianceStatus.kyc ? "outline" : "destructive"} className={complianceStatus.kyc ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}>
                        {complianceStatus.kyc ? "Compliant" : "Action Required"}
                      </Badge>
                      <Switch 
                        checked={complianceStatus.kyc} 
                        onCheckedChange={() => toggleCompliance('kyc')} 
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Know Your Customer verification procedures
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-accent/30 border border-border/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-primary" />
                      AML Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <Badge variant={complianceStatus.aml ? "outline" : "destructive"} className={complianceStatus.aml ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}>
                        {complianceStatus.aml ? "Compliant" : "Action Required"}
                      </Badge>
                      <Switch 
                        checked={complianceStatus.aml} 
                        onCheckedChange={() => toggleCompliance('aml')} 
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Anti-Money Laundering monitoring systems
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-accent/30 border border-border/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <ShieldCheck className="h-4 w-4 mr-2 text-primary" />
                      GDPR Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <Badge variant={complianceStatus.gdpr ? "outline" : "destructive"} className={complianceStatus.gdpr ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}>
                        {complianceStatus.gdpr ? "Compliant" : "Action Required"}
                      </Badge>
                      <Switch 
                        checked={complianceStatus.gdpr} 
                        onCheckedChange={() => toggleCompliance('gdpr')} 
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Data protection and privacy requirements
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-accent/30 border border-border/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-primary" />
                      PCI DSS
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <Badge variant={complianceStatus.pci ? "outline" : "destructive"} className={complianceStatus.pci ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}>
                        {complianceStatus.pci ? "Compliant" : "Action Required"}
                      </Badge>
                      <Switch 
                        checked={complianceStatus.pci} 
                        onCheckedChange={() => toggleCompliance('pci')} 
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Payment Card Industry Data Security Standard
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-accent/30 border border-border/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-primary" />
                      Sanctions Screening
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <Badge variant={complianceStatus.sanctions ? "outline" : "destructive"} className={complianceStatus.sanctions ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}>
                        {complianceStatus.sanctions ? "Compliant" : "Action Required"}
                      </Badge>
                      <Switch 
                        checked={complianceStatus.sanctions} 
                        onCheckedChange={() => toggleCompliance('sanctions')} 
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      International sanctions compliance monitoring
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-accent/30 border border-border/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      Regulatory Reporting
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <Badge variant={complianceStatus.reporting ? "outline" : "destructive"} className={complianceStatus.reporting ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}>
                        {complianceStatus.reporting ? "Complete" : "Pending"}
                      </Badge>
                      <Switch 
                        checked={complianceStatus.reporting} 
                        onCheckedChange={() => toggleCompliance('reporting')} 
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Mandatory reporting to regulatory authorities
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" size="sm" className="mr-2">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Status
              </Button>
              <Button variant="default" size="sm">
                <FileCheck className="h-4 w-4 mr-2" />
                Generate Compliance Report
              </Button>
            </CardFooter>
          </Card>

          {/* Regulatory Updates */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 text-primary mr-2" />
                Regulatory Updates
              </CardTitle>
              <CardDescription>
                Stay informed on the latest regulatory changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Updates</TabsTrigger>
                  <TabsTrigger value="urgent">Urgent</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="archived">Archived</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  <div className="rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
                        <div>
                          <h3 className="font-semibold">Updated KYC Requirements</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            New identity verification procedures effective January 15, 2024
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                        <Clock className="mr-1 h-3 w-3" />
                        Upcoming
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                        <div>
                          <h3 className="font-semibold">Data Protection Amendment</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Updated GDPR requirements for cross-border data transfers
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        <Check className="mr-1 h-3 w-3" />
                        Implemented
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-rose-500 mt-0.5 mr-3" />
                        <div>
                          <h3 className="font-semibold">Anti-Money Laundering Directive</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            New reporting requirements for suspicious transactions
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        Urgent
                      </Badge>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="urgent">
                  <div className="p-4 text-center text-muted-foreground">
                    Select the "Urgent" tab to view critical regulatory updates requiring immediate action
                  </div>
                </TabsContent>
                
                <TabsContent value="upcoming">
                  <div className="p-4 text-center text-muted-foreground">
                    Select the "Upcoming" tab to view regulatory changes scheduled for future implementation
                  </div>
                </TabsContent>
                
                <TabsContent value="archived">
                  <div className="p-4 text-center text-muted-foreground">
                    Select the "Archived" tab to view historical regulatory updates
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Compliance Metrics */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="h-5 w-5 text-primary mr-2" />
                Compliance Analytics
              </CardTitle>
              <CardDescription>
                Key performance indicators for regulatory compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center p-10 border border-dashed rounded-lg border-muted-foreground/30">
                <BarChart className="h-20 w-20 text-muted-foreground" />
                <p className="ml-4 text-muted-foreground">Interactive compliance metrics charts will appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
