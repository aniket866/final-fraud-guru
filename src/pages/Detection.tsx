
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle, 
  Copy, 
  FileJson, 
  Loader2, 
  RotateCcw, 
  ListFilter, 
  PanelLeftOpen,
  Layers
} from "lucide-react";
import { toast } from "sonner";

type DetectionMode = "single" | "batch";
type DetectionStatus = "idle" | "loading" | "success" | "error";

export default function Detection() {
  const [mode, setMode] = useState<DetectionMode>("single");
  const [jsonInput, setJsonInput] = useState<string>("");
  const [status, setStatus] = useState<DetectionStatus>("idle");
  const [results, setResults] = useState<any | null>(null);
  const [rulesPanelOpen, setRulesPanelOpen] = useState(false);

  const handleSubmit = () => {
    if (!jsonInput.trim()) {
      toast.error("Please enter valid JSON input");
      return;
    }

    try {
      // Validate JSON
      JSON.parse(jsonInput);
      
      // Process the request
      setStatus("loading");
      setTimeout(() => {
        if (mode === "single") {
          // Mock single response
          setResults({
            transaction_id: "TXN123456",
            is_fraud: Math.random() > 0.7,
            fraud_source: Math.random() > 0.5 ? "rule" : "model",
            fraud_reason: "Unusual location and multiple failed attempts",
            fraud_score: 0.76
          });
        } else {
          // Mock batch response
          setResults({
            "TXN123456": {
              is_fraud: Math.random() > 0.7,
              fraud_reason: "Unusual location and multiple failed attempts",
              fraud_score: 0.76
            },
            "TXN123457": {
              is_fraud: Math.random() > 0.8,
              fraud_reason: "Velocity check failed",
              fraud_score: 0.81
            },
            "TXN123458": {
              is_fraud: false,
              fraud_reason: "",
              fraud_score: 0.23
            }
          });
        }
        setStatus("success");
        toast.success(`Fraud detection ${mode} analysis complete`);
      }, 1500);
    } catch (error) {
      toast.error("Invalid JSON format");
    }
  };

  const resetForm = () => {
    setJsonInput("");
    setResults(null);
    setStatus("idle");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const getExampleJson = () => {
    if (mode === "single") {
      return JSON.stringify({
        transaction_id: "TXN123456",
        transaction_date: new Date().toISOString(),
        transaction_amount: 1299.99,
        transaction_channel: "web",
        transaction_payment_mode: "card",
        payment_gateway_bank: "bank_a",
        payer_email: "customer@example.com",
        payer_mobile: "+12025550198",
        payer_card: "**** **** **** 4242",
        device_id: "DEV-324567",
        browser: "Chrome",
        payee_id: "PAYEE-789"
      }, null, 2);
    } else {
      return JSON.stringify([
        {
          transaction_id: "TXN123456",
          transaction_date: new Date().toISOString(),
          transaction_amount: 1299.99,
          transaction_channel: "web",
          transaction_payment_mode: "card",
          payment_gateway_bank: "bank_a",
          payer_email: "customer@example.com",
          payer_mobile: "+12025550198",
          payer_card: "**** **** **** 4242",
          device_id: "DEV-324567",
          browser: "Chrome",
          payee_id: "PAYEE-789"
        },
        {
          transaction_id: "TXN123457",
          transaction_date: new Date().toISOString(),
          transaction_amount: 499.99,
          transaction_channel: "mobile",
          transaction_payment_mode: "UPI",
          payment_gateway_bank: "bank_b",
          payer_email: "other@example.com",
          payer_mobile: "+12025550199",
          payer_card: "",
          device_id: "DEV-324568",
          browser: "Safari Mobile",
          payee_id: "PAYEE-456"
        }
      ], null, 2);
    }
  };

  const getBadgeForScore = (score: number) => {
    if (score > 0.7) {
      return (
        <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">
          <AlertCircle className="mr-1 h-3 w-3" /> High Risk
        </Badge>
      );
    } else if (score > 0.4) {
      return (
        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
          <AlertTriangle className="mr-1 h-3 w-3" /> Medium Risk
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
          <CheckCircle className="mr-1 h-3 w-3" /> Low Risk
        </Badge>
      );
    }
  };

  const mockRules = [
    { id: 1, name: "Velocity Check", description: "Detects multiple transactions in short time period", threshold: "5 transactions / minute", active: true },
    { id: 2, name: "Amount Threshold", description: "Flags transactions above certain amount", threshold: "$5,000", active: true },
    { id: 3, name: "Geo Anomaly", description: "Detects transactions from unusual locations", threshold: "90% confidence", active: true },
    { id: 4, name: "Device Fingerprint", description: "Checks for suspicious devices", threshold: "Blacklist match", active: false },
    { id: 5, name: "Card Velocity", description: "Detects card used in multiple locations", threshold: "2+ locations / hour", active: true },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="bg-grid absolute inset-0 z-0" aria-hidden="true" />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gradient-heading">Fraud Detection API</h1>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setRulesPanelOpen(!rulesPanelOpen)}
          >
            <ListFilter className="h-4 w-4" />
            Configure Rules
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={`lg:col-span-${rulesPanelOpen ? '2' : '3'} transition-all duration-300`}>
            <Card className="glass-card overflow-hidden">
              <CardHeader>
                <CardTitle>Fraud Detection</CardTitle>
                <CardDescription>
                  Submit transaction data for real-time or batch fraud analysis
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="single" className="w-full" onValueChange={(v) => setMode(v as DetectionMode)}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="single">Single Transaction</TabsTrigger>
                    <TabsTrigger value="batch">Batch Processing</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={mode} className="mt-0 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium">
                          {mode === "single" ? "Transaction JSON" : "Batch Transactions JSON"}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {mode === "single" 
                            ? "Enter a single transaction in JSON format" 
                            : "Enter an array of transactions in JSON format"}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setJsonInput(getExampleJson())}
                      >
                        <FileJson className="h-3.5 w-3.5 mr-1" />
                        Example
                      </Button>
                    </div>
                    
                    <Textarea
                      placeholder={`Paste your ${mode === "single" ? "transaction" : "transactions"} JSON here...`}
                      className="font-mono h-64 resize-none"
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetForm} disabled={status === "loading"}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={handleSubmit} disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Analyze
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            {results && status === "success" && (
              <Card className="glass-card mt-8 overflow-hidden animate-in slide-up">
                <CardHeader>
                  <CardTitle>Detection Results</CardTitle>
                  <CardDescription>
                    {mode === "single" ? "Transaction analysis" : `Analysis of ${Object.keys(results).length} transactions`}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {mode === "single" ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Transaction ID:</span>
                        <span className="font-mono">{results.transaction_id}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Fraud Detection:</span>
                        {results.is_fraud ? (
                          <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">
                            <AlertCircle className="mr-1 h-3 w-3" /> Fraud Detected
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                            <CheckCircle className="mr-1 h-3 w-3" /> No Fraud Detected
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Fraud Score:</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                results.fraud_score > 0.7
                                  ? "bg-rose-500"
                                  : results.fraud_score > 0.4
                                  ? "bg-amber-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${results.fraud_score * 100}%` }}
                            />
                          </div>
                          <span>{(results.fraud_score * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      
                      {results.is_fraud && (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Fraud Source:</span>
                            <Badge variant={results.fraud_source === "rule" ? "secondary" : "outline"}>
                              {results.fraud_source === "rule" ? "Rule Engine" : "AI Model"}
                            </Badge>
                          </div>
                          
                          <div className="flex items-start justify-between">
                            <span className="font-medium">Fraud Reason:</span>
                            <span className="text-right max-w-[60%]">{results.fraud_reason}</span>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(results).map(([txnId, result]: [string, any]) => (
                        <div key={txnId} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium font-mono">{txnId}</span>
                            {getBadgeForScore(result.fraud_score)}
                          </div>
                          
                          <div className="flex items-center justify-between mb-2">
                            <span>Fraud Detection:</span>
                            {result.is_fraud ? (
                              <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">
                                <AlertCircle className="mr-1 h-3 w-3" /> Fraud Detected
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                                <CheckCircle className="mr-1 h-3 w-3" /> No Fraud Detected
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span>Fraud Score:</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-muted rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    result.fraud_score > 0.7
                                      ? "bg-rose-500"
                                      : result.fraud_score > 0.4
                                      ? "bg-amber-500"
                                      : "bg-green-500"
                                  }`}
                                  style={{ width: `${result.fraud_score * 100}%` }}
                                />
                              </div>
                              <span>{(result.fraud_score * 100).toFixed(0)}%</span>
                            </div>
                          </div>
                          
                          {result.is_fraud && result.fraud_reason && (
                            <div className="mt-2 text-sm text-muted-foreground">
                              <span>Reason: {result.fraud_reason}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                
                <CardFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(JSON.stringify(results, null, 2))}
                    className="ml-auto"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Results
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
          
          {rulesPanelOpen && (
            <Card className="glass-card h-fit lg:col-span-1 animate-in slide-in-right">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">Rule Engine</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setRulesPanelOpen(false)}
                  className="lg:hidden"
                >
                  <PanelLeftOpen className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">Configure detection rules</p>
                  <Button variant="outline" size="sm">
                    <Layers className="h-4 w-4 mr-2" />
                    Add Rule
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {mockRules.map((rule) => (
                    <div 
                      key={rule.id} 
                      className={`p-3 border rounded-lg transition-colors ${
                        rule.active ? "bg-muted/30" : "bg-background/30 opacity-60"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h4 className="font-medium">{rule.name}</h4>
                          <p className="text-xs text-muted-foreground">{rule.description}</p>
                        </div>
                        <div className="flex items-center h-6">
                          <div
                            className={`w-8 h-4 flex items-center rounded-full p-1 cursor-pointer ${
                              rule.active ? "bg-primary justify-end" : "bg-muted justify-start"
                            }`}
                            onClick={() => {
                              // In a real app, this would update the rule's active state
                              toast.success(`${rule.active ? "Disabled" : "Enabled"} ${rule.name} rule`);
                            }}
                          >
                            <div className="bg-white rounded-full h-3 w-3 shadow-md transform transition-transform duration-200" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Threshold:</span>
                        <span>{rule.threshold}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
