
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Ban, 
  Lock, 
  ShieldOff, 
  Slash, 
  AlertTriangle, 
  Search, 
  AlertOctagon,
  Shield,
  AlertCircle,
  Pencil,
  Settings
} from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for blocked accounts
const blockedAccounts = [
  { 
    id: "acc-1234", 
    name: "John Smith", 
    reason: "Unusual activity pattern", 
    severity: "high", 
    blockedAt: "2023-05-15T10:30:00Z",
    status: "blocked" 
  },
  { 
    id: "acc-2345", 
    name: "Alice Johnson", 
    reason: "Multiple failed authentication attempts", 
    severity: "medium", 
    blockedAt: "2023-05-14T08:15:00Z",
    status: "blocked" 
  },
  { 
    id: "acc-3456", 
    name: "Robert Davis", 
    reason: "Suspicious transaction pattern", 
    severity: "high", 
    blockedAt: "2023-05-13T14:45:00Z",
    status: "blocked" 
  },
  { 
    id: "acc-4567", 
    name: "Emma Wilson", 
    reason: "Login from unusual location", 
    severity: "low", 
    blockedAt: "2023-05-12T09:20:00Z",
    status: "monitoring" 
  },
  { 
    id: "acc-5678", 
    name: "Michael Brown", 
    reason: "Potential account takeover", 
    severity: "high", 
    blockedAt: "2023-05-11T16:10:00Z",
    status: "blocked" 
  }
];

// Mock data for blocked transactions
const blockedTransactions = [
  {
    id: "tx-7890",
    accountId: "acc-1234",
    amount: 1250.00,
    reason: "Amount exceeds usual spending pattern",
    riskScore: 87,
    timestamp: "2023-05-15T09:45:00Z",
    status: "blocked"
  },
  {
    id: "tx-8901",
    accountId: "acc-2345",
    amount: 980.50,
    reason: "Transaction from unusual location",
    riskScore: 76,
    timestamp: "2023-05-14T11:30:00Z",
    status: "blocked"
  },
  {
    id: "tx-9012",
    accountId: "acc-3456",
    amount: 3500.00,
    reason: "Potential card testing pattern",
    riskScore: 92,
    timestamp: "2023-05-13T16:20:00Z",
    status: "blocked"
  },
  {
    id: "tx-0123",
    accountId: "acc-4567",
    amount: 450.75,
    reason: "Merchant on watchlist",
    riskScore: 65,
    timestamp: "2023-05-12T14:10:00Z",
    status: "reviewing"
  },
  {
    id: "tx-1234",
    accountId: "acc-5678",
    amount: 2100.00,
    reason: "Velocity check failed",
    riskScore: 84,
    timestamp: "2023-05-11T10:05:00Z",
    status: "blocked"
  }
];

// Block rules for automation
const blockRules = [
  {
    id: "rule-1",
    name: "High Value Transaction",
    description: "Block transactions over $5,000",
    isActive: true,
    conditions: ["Transaction amount > $5,000", "Account age < 90 days"],
    actionType: "block",
    createdAt: "2023-04-10T08:00:00Z"
  },
  {
    id: "rule-2",
    name: "Unusual Location",
    description: "Block transactions from high-risk countries",
    isActive: true,
    conditions: ["Transaction country in high-risk list", "No prior activity in country"],
    actionType: "review",
    createdAt: "2023-04-15T09:30:00Z"
  },
  {
    id: "rule-3",
    name: "Rapid Succession",
    description: "Block multiple transactions in quick succession",
    isActive: false,
    conditions: ["> 5 transactions in 10 minutes", "Different merchants", "Total amount > $1,000"],
    actionType: "block",
    createdAt: "2023-04-20T11:15:00Z"
  },
  {
    id: "rule-4",
    name: "Card Testing Pattern",
    description: "Block suspected card testing activity",
    isActive: true,
    conditions: ["Multiple small transactions < $5", "Same merchant category", "Within 5 minutes"],
    actionType: "block",
    createdAt: "2023-04-25T14:45:00Z"
  },
  {
    id: "rule-5",
    name: "New Merchant Type",
    description: "Review transactions with new merchant types",
    isActive: true,
    conditions: ["Merchant category not previously used", "Transaction amount > $200"],
    actionType: "review",
    createdAt: "2023-05-01T10:30:00Z"
  }
];

export default function BlockControls() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("accounts");
  const [activeRuleTab, setActiveRuleTab] = useState("active");
  
  // Function to toggle block rule status
  const toggleRuleStatus = (ruleId: string) => {
    toast.success(`Rule status updated successfully`);
  };
  
  // Function to unblock an account
  const unblockAccount = (accountId: string) => {
    toast.success(`Account ${accountId} has been unblocked`);
  };
  
  // Function to change transaction status
  const updateTransactionStatus = (txId: string, newStatus: string) => {
    toast.success(`Transaction ${txId} status changed to ${newStatus}`);
  };
  
  // Function to filter rules based on active status
  const filteredRules = blockRules.filter(rule => 
    activeRuleTab === "all" || 
    (activeRuleTab === "active" && rule.isActive) || 
    (activeRuleTab === "inactive" && !rule.isActive)
  );
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto py-10 px-4 space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Block Controls</h1>
          <p className="text-muted-foreground">
            Manage and monitor blocked accounts, transactions, and automated block rules
          </p>
        </div>
        
        <div className="w-full flex items-center space-x-2 mb-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, name, or reason..."
            className="max-w-sm"
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <Ban className="h-4 w-4" />
              <span>Blocked Accounts</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <Slash className="h-4 w-4" />
              <span>Blocked Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="rules" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Block Rules</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Blocked Accounts</span>
                  <Button>
                    <Ban className="mr-2 h-4 w-4" />
                    Block New Account
                  </Button>
                </CardTitle>
                <CardDescription>
                  View and manage accounts that have been blocked due to suspicious activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Blocked At</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blockedAccounts.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell className="font-mono">{account.id}</TableCell>
                        <TableCell>{account.name}</TableCell>
                        <TableCell>{account.reason}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`
                              ${account.severity === 'high' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                                 account.severity === 'medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                                'bg-blue-500/10 text-blue-500 border-blue-500/20'}
                            `}
                          >
                            {account.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(account.blockedAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`
                              ${account.status === 'blocked' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                                'bg-amber-500/10 text-amber-500 border-amber-500/20'}
                            `}
                          >
                            {account.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => unblockAccount(account.id)}
                          >
                            Unblock
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Blocked Transactions</span>
                  <Button>
                    <Slash className="mr-2 h-4 w-4" />
                    Block New Transaction
                  </Button>
                </CardTitle>
                <CardDescription>
                  View and manage transactions that have been blocked due to suspicious activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Risk Score</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blockedTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell className="font-mono">{tx.id}</TableCell>
                        <TableCell className="font-mono">{tx.accountId}</TableCell>
                        <TableCell>${tx.amount.toFixed(2)}</TableCell>
                        <TableCell>{tx.reason}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`
                              ${tx.riskScore > 80 ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                                 tx.riskScore > 60 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                                'bg-blue-500/10 text-blue-500 border-blue-500/20'}
                            `}
                          >
                            {tx.riskScore}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(tx.timestamp).toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`
                              ${tx.status === 'blocked' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                                'bg-amber-500/10 text-amber-500 border-amber-500/20'}
                            `}
                          >
                            {tx.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateTransactionStatus(tx.id, 'approved')}
                          >
                            Approve
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="rules" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Automated Block Rules</span>
                  <Button>
                    <Shield className="mr-2 h-4 w-4" />
                    Create New Rule
                  </Button>
                </CardTitle>
                <CardDescription>
                  Configure rules to automatically block suspicious accounts and transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TabsList className="mb-4">
                  <TabsTrigger value="all" onClick={() => setActiveRuleTab("all")}>
                    All Rules
                  </TabsTrigger>
                  <TabsTrigger value="active" onClick={() => setActiveRuleTab("active")}>
                    Active Rules
                  </TabsTrigger>
                  <TabsTrigger value="inactive" onClick={() => setActiveRuleTab("inactive")}>
                    Inactive Rules
                  </TabsTrigger>
                </TabsList>
                
                <div className="space-y-4">
                  {filteredRules.map((rule) => (
                    <Card key={rule.id} className="overflow-hidden">
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-md ${rule.isActive ? 'bg-primary/10' : 'bg-slate-500/10'}`}>
                            <Shield className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="font-medium">{rule.name}</h3>
                            <p className="text-xs text-muted-foreground">{rule.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge 
                            variant="outline" 
                            className={`
                              ${rule.actionType === 'block' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                                'bg-amber-500/10 text-amber-500 border-amber-500/20'}
                            `}
                          >
                            {rule.actionType}
                          </Badge>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id={`rule-${rule.id}`} 
                              checked={rule.isActive}
                              onCheckedChange={() => toggleRuleStatus(rule.id)}
                            />
                            <Label htmlFor={`rule-${rule.id}`}>
                              {rule.isActive ? 'Active' : 'Inactive'}
                            </Label>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pb-4 pt-0">
                        <h4 className="text-sm font-medium mb-2">Conditions:</h4>
                        <ul className="space-y-1">
                          {rule.conditions.map((condition, i) => (
                            <li key={i} className="text-sm flex items-center gap-2">
                              <AlertCircle className="h-3 w-3 text-primary" />
                              {condition}
                            </li>
                          ))}
                        </ul>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">
                            <Pencil className="h-3.5 w-3.5 mr-1.5" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="h-3.5 w-3.5 mr-1.5" />
                            Configure
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
