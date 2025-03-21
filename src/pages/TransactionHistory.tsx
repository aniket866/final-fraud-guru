
import { Navbar } from "@/components/layout/Navbar";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  History,
  Search,
  Filter,
  Download,
  Calendar,
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  X,
  AlertTriangle,
  ShieldAlert,
  Flag,
  RefreshCw,
  CreditCard,
  Wallet,
  Building,
  CircleDollarSign,
  ChevronsUpDown
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock transaction data
interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
  status: "completed" | "pending" | "flagged" | "rejected";
  description: string;
  account: string;
  merchant: string;
  category: string;
  riskScore: number;
}

export default function TransactionHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  
  const transactions: Transaction[] = [
    {
      id: "tx-123456",
      date: "2023-06-01T10:23:00Z",
      amount: 450.00,
      type: "debit",
      status: "completed",
      description: "Online purchase",
      account: "Personal Checking (...4321)",
      merchant: "Amazon",
      category: "Shopping",
      riskScore: 12
    },
    {
      id: "tx-123457",
      date: "2023-06-01T14:50:00Z",
      amount: 1200.00,
      type: "credit",
      status: "completed",
      description: "Direct deposit",
      account: "Savings (...9876)",
      merchant: "Employer Inc.",
      category: "Income",
      riskScore: 5
    },
    {
      id: "tx-123458",
      date: "2023-06-02T08:15:00Z",
      amount: 850.75,
      type: "debit",
      status: "flagged",
      description: "International transfer",
      account: "Personal Checking (...4321)",
      merchant: "Unknown",
      category: "Transfer",
      riskScore: 85
    },
    {
      id: "tx-123459",
      date: "2023-06-02T19:30:00Z",
      amount: 120.00,
      type: "debit",
      status: "pending",
      description: "Utility payment",
      account: "Bills Account (...5555)",
      merchant: "Power Company",
      category: "Utilities",
      riskScore: 8
    },
    {
      id: "tx-123460",
      date: "2023-06-03T12:45:00Z",
      amount: 325.50,
      type: "debit",
      status: "rejected",
      description: "Attempted withdrawal",
      account: "Joint Account (...7777)",
      merchant: "ATM",
      category: "Cash",
      riskScore: 78
    }
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
          <Check className="h-3 w-3 mr-1" /> Completed
        </Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
          <RefreshCw className="h-3 w-3 mr-1" /> Pending
        </Badge>;
      case "flagged":
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
          <Flag className="h-3 w-3 mr-1" /> Flagged
        </Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-slate-500/10 text-slate-500 border-slate-500/20">
          <X className="h-3 w-3 mr-1" /> Rejected
        </Badge>;
      default:
        return null;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  
  const getMerchantAvatar = (merchant: string) => {
    const initial = merchant.charAt(0).toUpperCase();
    const colors = [
      "bg-primary text-primary-foreground",
      "bg-teal-500 text-white",
      "bg-amber-500 text-white",
      "bg-rose-500 text-white",
      "bg-indigo-500 text-white"
    ];
    const randomColor = colors[merchant.length % colors.length];
    
    return (
      <Avatar className="h-10 w-10">
        <AvatarFallback className={randomColor}>{initial}</AvatarFallback>
      </Avatar>
    );
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="bg-grid absolute inset-0 z-0" aria-hidden="true" />
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-heading">Transaction History</h1>
            <p className="text-muted-foreground mt-2">
              View and analyze transaction data with comprehensive filtering
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <History className="mr-1 h-3 w-3" />
              Transaction Log
            </Badge>
            <Badge variant="outline" className="bg-teal-500/10 text-teal-500 border-teal-500/20">
              <ShieldAlert className="mr-1 h-3 w-3" />
              Risk Analysis
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-col space-y-6">
          {/* Transaction Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-primary" />
                  Total Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,452</div>
                <p className="text-sm text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CircleDollarSign className="h-5 w-5 mr-2 text-green-500" />
                  Total Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$245,128</div>
                <p className="text-sm text-muted-foreground flex items-center text-green-500">
                  <ArrowUp className="h-3 w-3 mr-1" /> 8.2% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Flag className="h-5 w-5 mr-2 text-amber-500" />
                  Flagged Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">23</div>
                <p className="text-sm text-muted-foreground flex items-center text-amber-500">
                  <ArrowDown className="h-3 w-3 mr-1" /> 3.1% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-rose-500" />
                  Rejected Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7</div>
                <p className="text-sm text-muted-foreground flex items-center text-rose-500">
                  <ArrowUp className="h-3 w-3 mr-1" /> 1.4% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
              
              <Button variant="outline" size="sm">
                <ChevronsUpDown className="h-4 w-4 mr-2" />
                Amount
              </Button>
              
              <Button variant="secondary" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          {/* Transaction List */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Transaction List</CardTitle>
              <CardDescription>View detailed transaction data and risk analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <Card key={transaction.id} className="overflow-hidden border border-border/50">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex items-start gap-4">
                          {getMerchantAvatar(transaction.merchant)}
                          <div>
                            <div className="font-medium">{transaction.description}</div>
                            <div className="text-sm text-muted-foreground">{transaction.merchant} • {transaction.category}</div>
                            <div className="text-xs text-muted-foreground mt-1">{formatDate(transaction.date)}</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
                          <div className="flex flex-col items-end">
                            <span className={`font-medium ${transaction.type === 'credit' ? 'text-green-500' : ''}`}>
                              {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                            </span>
                            <span className="text-xs text-muted-foreground">{transaction.account}</span>
                          </div>
                          
                          <div className="flex flex-col gap-1 items-end">
                            {getStatusBadge(transaction.status)}
                            
                            {transaction.riskScore > 50 && (
                              <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">
                                Risk: {transaction.riskScore}/100
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">Load More Transactions</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
