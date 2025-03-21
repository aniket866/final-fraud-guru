
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Code,
  Database,
  Key,
  Lock,
  Save,
  Server,
  Settings2,
  ShieldCheck,
  Users,
  Wand2,
  Palette,
  Languages,
  MousePointerClick,
  Brain,
  BookOpen,
  RefreshCw,
  MessageCircle,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/lib/theme";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SettingsPage() {
  const { theme, accent, setTheme, setAccent } = useTheme();
  const [apiKey, setApiKey] = useState("");
  const [refreshRate, setRefreshRate] = useState("5");
  const [batchSize, setBatchSize] = useState("100");
  const [aiSettings, setAiSettings] = useState({
    modelVersion: "v3",
    confidenceThreshold: "0.7",
    adaptiveLearning: true,
    featureImportance: true,
    retraining: "weekly",
    useFeedback: true,
    anomalyDetection: true,
    patternRecognition: true,
    autotuning: true,
    explainability: true
  });
  
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  const handleResetSettings = () => {
    toast.success("Settings reset to defaults");
  };

  const modelVersionOptions = [
    { value: "v1", label: "Basic (v1)" },
    { value: "v2", label: "Standard (v2)" },
    { value: "v3", label: "Advanced (v3)" },
    { value: "custom", label: "Custom Model" },
  ];

  const retrainingOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
  ];

  const aiFeatures = [
    { id: "adaptiveLearning", label: "Adaptive Learning", icon: Brain, description: "Model automatically improves over time based on new data" },
    { id: "featureImportance", label: "Feature Importance", icon: Wand2, description: "Highlights which attributes most influence fraud decisions" },
    { id: "useFeedback", label: "User Feedback Loop", icon: MessageCircle, description: "Incorporates user reports into model training" },
    { id: "anomalyDetection", label: "Anomaly Detection", icon: AlertTriangle, description: "Identifies transactions that deviate from normal patterns" },
    { id: "patternRecognition", label: "Pattern Recognition", icon: MousePointerClick, description: "Detects complex fraud patterns across transactions" },
    { id: "autotuning", label: "Auto-tuning", icon: RefreshCw, description: "Automatically adjusts model parameters for optimal performance" },
    { id: "explainability", label: "Explainability", icon: BookOpen, description: "Provides human-readable explanations for fraud decisions" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="bg-grid absolute inset-0 z-0" aria-hidden="true" />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-8 gradient-heading">System Settings</h1>
        
        <Tabs defaultValue="general" className="w-full">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-64 shrink-0">
              <Card className="glass-card overflow-hidden sticky top-24">
                <CardContent className="p-6">
                  <TabsList className="flex flex-col w-full h-auto gap-2">
                    <TabsTrigger value="general" className="w-full justify-start">
                      <Settings2 className="h-4 w-4 mr-2" />
                      General
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="w-full justify-start">
                      <Palette className="h-4 w-4 mr-2" />
                      Appearance
                    </TabsTrigger>
                    <TabsTrigger value="api" className="w-full justify-start">
                      <Code className="h-4 w-4 mr-2" />
                      API Settings
                    </TabsTrigger>
                    <TabsTrigger value="security" className="w-full justify-start">
                      <ShieldCheck className="h-4 w-4 mr-2" />
                      Security
                    </TabsTrigger>
                    <TabsTrigger value="ai" className="w-full justify-start">
                      <Brain className="h-4 w-4 mr-2" />
                      AI Configuration
                    </TabsTrigger>
                    <TabsTrigger value="integrations" className="w-full justify-start">
                      <Cloud className="h-4 w-4 mr-2" />
                      Integrations
                    </TabsTrigger>
                  </TabsList>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex-1">
              <Card className="glass-card overflow-hidden animate-in slide-up">
                <TabsContent value="general" className="m-0">
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Configure basic system settings and preferences
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="refresh-rate">Dashboard Refresh Rate (minutes)</Label>
                        <Input
                          id="refresh-rate"
                          type="number"
                          min="1"
                          max="60"
                          value={refreshRate}
                          onChange={(e) => setRefreshRate(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          How often the dashboard automatically refreshes data
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="batch-size">Batch Processing Size</Label>
                        <Input
                          id="batch-size"
                          type="number"
                          min="10"
                          max="1000"
                          step="10"
                          value={batchSize}
                          onChange={(e) => setBatchSize(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Maximum number of transactions to process in a single batch
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h3 className="font-medium text-sm">Notifications</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifs">Email Notifications</Label>
                          <p className="text-xs text-muted-foreground">
                            Receive important alerts via email
                          </p>
                        </div>
                        <Switch id="email-notifs" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="high-risk-notifs">High-Risk Transaction Alerts</Label>
                          <p className="text-xs text-muted-foreground">
                            Get notified immediately for high-risk transactions
                          </p>
                        </div>
                        <Switch id="high-risk-notifs" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="report-notifs">Fraud Report Notifications</Label>
                          <p className="text-xs text-muted-foreground">
                            Receive alerts when new fraud reports are submitted
                          </p>
                        </div>
                        <Switch id="report-notifs" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleResetSettings}>
                      Reset to Defaults
                    </Button>
                    
                    <Button onClick={handleSaveSettings}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </TabsContent>
                
                <TabsContent value="appearance" className="m-0">
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                      Customize the look and feel of the application
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Theme</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            variant="outline"
                            className={`h-16 ${theme === "light" ? "border-2 border-primary" : ""}`}
                            onClick={() => setTheme("light")}
                          >
                            <div className="flex items-center">
                              <div className="w-5 h-5 rounded-full bg-[#fff] border mr-2"></div>
                              <span>Light</span>
                            </div>
                          </Button>
                          
                          <Button
                            variant="outline"
                            className={`h-16 ${theme === "dark" ? "border-2 border-primary" : ""}`}
                            onClick={() => setTheme("dark")}
                          >
                            <div className="flex items-center">
                              <div className="w-5 h-5 rounded-full bg-[#1e293b] border mr-2"></div>
                              <span>Dark</span>
                            </div>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Accent Color</Label>
                        <div className="grid grid-cols-5 gap-4">
                          <button
                            className={`h-10 rounded-lg bg-blue-500 ${
                              accent === "blue" ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900" : ""
                            }`}
                            onClick={() => setAccent("blue")}
                            title="Blue"
                          />
                          <button
                            className={`h-10 rounded-lg bg-purple-500 ${
                              accent === "purple" ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900" : ""
                            }`}
                            onClick={() => setAccent("purple")}
                            title="Purple"
                          />
                          <button
                            className={`h-10 rounded-lg bg-teal-500 ${
                              accent === "teal" ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900" : ""
                            }`}
                            onClick={() => setAccent("teal")}
                            title="Teal"
                          />
                          <button
                            className={`h-10 rounded-lg bg-amber-500 ${
                              accent === "amber" ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900" : ""
                            }`}
                            onClick={() => setAccent("amber")}
                            title="Amber"
                          />
                          <button
                            className={`h-10 rounded-lg bg-rose-500 ${
                              accent === "rose" ? "ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900" : ""
                            }`}
                            onClick={() => setAccent("rose")}
                            title="Rose"
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-3">
                        <h3 className="font-medium text-sm">UI Preferences</h3>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="animations">Interface Animations</Label>
                            <p className="text-xs text-muted-foreground">
                              Enable animations throughout the interface
                            </p>
                          </div>
                          <Switch id="animations" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="compact">Compact Mode</Label>
                            <p className="text-xs text-muted-foreground">
                              Reduce the spacing between UI elements
                            </p>
                          </div>
                          <Switch id="compact" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="blur-effects">Glassmorphism Effects</Label>
                            <p className="text-xs text-muted-foreground">
                              Enable blur and transparency effects
                            </p>
                          </div>
                          <Switch id="blur-effects" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleResetSettings}>
                      Reset to Defaults
                    </Button>
                    
                    <Button onClick={handleSaveSettings}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </TabsContent>
                
                <TabsContent value="api" className="m-0">
                  <CardHeader>
                    <CardTitle>API Settings</CardTitle>
                    <CardDescription>
                      Configure API endpoints and authentication
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="api-key">API Key</Label>
                        <div className="flex">
                          <Input
                            id="api-key"
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="rounded-r-none"
                          />
                          <Button 
                            variant="secondary"
                            className="rounded-l-none"
                            onClick={() => {
                              setApiKey(Math.random().toString(36).substring(2, 15));
                              toast.success("New API key generated");
                            }}
                          >
                            Generate
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Used to authenticate with the API
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="endpoint-url">API Endpoint URL</Label>
                        <Input
                          id="endpoint-url"
                          defaultValue="https://api.fraudguard.io/v1"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timeout">Request Timeout (seconds)</Label>
                        <Input
                          id="timeout"
                          type="number"
                          min="1"
                          max="60"
                          defaultValue="30"
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h3 className="font-medium text-sm">API Behavior</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="retries">Automatic Retries</Label>
                          <p className="text-xs text-muted-foreground">
                            Retry failed API requests automatically
                          </p>
                        </div>
                        <Switch id="retries" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="batch-processing">Batch Processing</Label>
                          <p className="text-xs text-muted-foreground">
                            Enable parallel processing for batch requests
                          </p>
                        </div>
                        <Switch id="batch-processing" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="logging">Request Logging</Label>
                          <p className="text-xs text-muted-foreground">
                            Log all API requests and responses
                          </p>
                        </div>
                        <Switch id="logging" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleResetSettings}>
                      Reset to Defaults
                    </Button>
                    
                    <Button onClick={handleSaveSettings}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </TabsContent>

                <TabsContent value="security" className="m-0">
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Configure security and access controls
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                        <Input
                          id="session-timeout"
                          type="number"
                          min="5"
                          max="120"
                          defaultValue="30"
                        />
                        <p className="text-xs text-muted-foreground">
                          Automatically log out inactive users after this period
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                        <Input
                          id="password-expiry"
                          type="number"
                          min="30"
                          max="365"
                          defaultValue="90"
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <h3 className="font-medium text-sm">Security Features</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                          <p className="text-xs text-muted-foreground">
                            Require 2FA for all user accounts
                          </p>
                        </div>
                        <Switch id="two-factor" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="ip-restrict">IP Restrictions</Label>
                          <p className="text-xs text-muted-foreground">
                            Restrict access to approved IP addresses
                          </p>
                        </div>
                        <Switch id="ip-restrict" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="audit-logging">Audit Logging</Label>
                          <p className="text-xs text-muted-foreground">
                            Log all user actions and system events
                          </p>
                        </div>
                        <Switch id="audit-logging" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sensitive-data">Data Masking</Label>
                          <p className="text-xs text-muted-foreground">
                            Mask sensitive data in logs and reports
                          </p>
                        </div>
                        <Switch id="sensitive-data" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleResetSettings}>
                      Reset to Defaults
                    </Button>
                    
                    <Button onClick={handleSaveSettings}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </TabsContent>
                
                <TabsContent value="ai" className="m-0">
                  <CardHeader>
                    <CardTitle>AI Configuration</CardTitle>
                    <CardDescription>
                      Configure machine learning and AI settings
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="model-version">Model Version</Label>
                        <select
                          id="model-version"
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          value={aiSettings.modelVersion}
                          onChange={(e) => setAiSettings({...aiSettings, modelVersion: e.target.value})}
                        >
                          {modelVersionOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confidence-threshold">Confidence Threshold</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="confidence-threshold"
                            type="range"
                            min="0.5"
                            max="0.95"
                            step="0.05"
                            value={aiSettings.confidenceThreshold}
                            onChange={(e) => setAiSettings({...aiSettings, confidenceThreshold: e.target.value})}
                            className="w-full"
                          />
                          <span className="w-12 text-center">{(parseFloat(aiSettings.confidenceThreshold) * 100).toFixed(0)}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Minimum confidence level to flag a transaction as fraudulent
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="retraining">Model Retraining Frequency</Label>
                        <select
                          id="retraining"
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          value={aiSettings.retraining}
                          onChange={(e) => setAiSettings({...aiSettings, retraining: e.target.value})}
                        >
                          {retrainingOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-sm">AI Features</h3>
                      
                      <ScrollArea className="h-48 pr-4">
                        <div className="space-y-4">
                          {aiFeatures.map((feature) => (
                            <div key={feature.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                              <feature.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <Label htmlFor={feature.id} className="font-medium">{feature.label}</Label>
                                  <Switch 
                                    id={feature.id} 
                                    checked={aiSettings[feature.id as keyof typeof aiSettings] as boolean}
                                    onCheckedChange={(checked) => 
                                      setAiSettings({
                                        ...aiSettings, 
                                        [feature.id]: checked
                                      })
                                    }
                                  />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleResetSettings}>
                      Reset to Defaults
                    </Button>
                    
                    <Button onClick={handleSaveSettings}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </TabsContent>
                
                <TabsContent value="integrations" className="m-0">
                  <CardHeader>
                    <CardTitle>Integrations</CardTitle>
                    <CardDescription>
                      Configure third-party integrations and services
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border rounded-lg p-4 flex flex-col h-full justify-between hover:shadow-md transition-shadow">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Database className="h-5 w-5 text-blue-500" />
                              <h3 className="font-medium">Database Connection</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Configure connection to external database systems
                            </p>
                          </div>
                          <Button variant="outline" className="mt-4 w-full justify-between" onClick={() => toast.success("Database configuration opened")}>
                            Configure 
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="border rounded-lg p-4 flex flex-col h-full justify-between hover:shadow-md transition-shadow">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Server className="h-5 w-5 text-green-500" />
                              <h3 className="font-medium">Payment Gateway</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Connect to payment processing services
                            </p>
                          </div>
                          <Button variant="outline" className="mt-4 w-full justify-between" onClick={() => toast.success("Payment gateway configuration opened")}>
                            Connect
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="border rounded-lg p-4 flex flex-col h-full justify-between hover:shadow-md transition-shadow">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Users className="h-5 w-5 text-purple-500" />
                              <h3 className="font-medium">User Directory</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Connect to LDAP or Active Directory for authentication
                            </p>
                          </div>
                          <Button variant="outline" className="mt-4 w-full justify-between" onClick={() => toast.success("User directory configuration opened")}>
                            Connect
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="border rounded-lg p-4 flex flex-col h-full justify-between hover:shadow-md transition-shadow">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <AlertCircle className="h-5 w-5 text-rose-500" />
                              <h3 className="font-medium">Alert Services</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Configure SMS, Email, and other notification channels
                            </p>
                          </div>
                          <Button variant="outline" className="mt-4 w-full justify-between" onClick={() => toast.success("Alert services configuration opened")}>
                            Configure
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium text-sm">API Integrations</h3>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded bg-blue-500/10 flex items-center justify-center">
                              <CloudCheck className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                              <h4 className="font-medium">External Fraud Database</h4>
                              <p className="text-xs text-muted-foreground">
                                Check transactions against external fraud database
                              </p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded bg-emerald-500/10 flex items-center justify-center">
                              <Languages className="h-5 w-5 text-emerald-500" />
                            </div>
                            <div>
                              <h4 className="font-medium">Language Processing API</h4>
                              <p className="text-xs text-muted-foreground">
                                Analyze transaction descriptions for suspicious content
                              </p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded bg-amber-500/10 flex items-center justify-center">
                              <Lock className="h-5 w-5 text-amber-500" />
                            </div>
                            <div>
                              <h4 className="font-medium">Identity Verification</h4>
                              <p className="text-xs text-muted-foreground">
                                Verify user identities with third-party KYC service
                              </p>
                            </div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleResetSettings}>
                      Reset to Defaults
                    </Button>
                    
                    <Button onClick={handleSaveSettings}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </TabsContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </main>
    </div>
  );
}

// Custom icon
function CloudCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13V17M14 13V17M17.8 18.5C20.1 17.9 22 15.9 22 13.5C22 10.5 19.5 8 16.5 8C16.3 8 16.2 7.8 16.2 7.7C15.6 6.5 14.9 5.3 13.7 4.4C12.5 3.5 11 3 9.5 3C6.5 3 4 5 4 8C4 8.3 4 8.7 4.1 9C4.1 9.2 4 9.3 3.8 9.4C2.4 10.1 1.5 11.4 1.5 13C1.5 15.1 3.1 16.7 5.1 16.9" />
      <path d="m7 15 3 3 3-3" />
    </svg>
  );
}
