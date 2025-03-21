
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  Search, 
  Trash2, 
  Filter,
  StepForward,
  StepBack,
  Send
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { transactions, Transaction } from "@/lib/mockData";

interface ReportedFraud {
  id: string;
  transactionId: string;
  reportedDate: string;
  status: "pending" | "reviewing" | "confirmed" | "rejected";
  details: string;
}

export default function Reporting() {
  const [searchQuery, setSearchQuery] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [fraudDetails, setFraudDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  const mockReportedFrauds: ReportedFraud[] = [
    {
      id: "FR-001",
      transactionId: "TXN1000001",
      reportedDate: "2023-10-15T14:32:21Z",
      status: "confirmed",
      details: "Customer reported unauthorized transaction. Card was still in possession."
    },
    {
      id: "FR-002",
      transactionId: "TXN1000235",
      reportedDate: "2023-10-16T09:17:43Z",
      status: "pending",
      details: "Multiple transactions from unfamiliar locations."
    },
    {
      id: "FR-003",
      transactionId: "TXN1000412",
      reportedDate: "2023-10-18T16:45:12Z",
      status: "rejected",
      details: "After investigation, customer recognized the transaction."
    },
    {
      id: "FR-004",
      transactionId: "TXN1000587",
      reportedDate: "2023-10-20T11:22:37Z",
      status: "reviewing",
      details: "Unusual transaction pattern. User claims no knowledge of purchases."
    },
    {
      id: "FR-005",
      transactionId: "TXN1000623",
      reportedDate: "2023-10-21T08:14:55Z",
      status: "confirmed",
      details: "Account accessed from new device, then multiple transactions made."
    }
  ];
  
  const pageSize = 10;
  const totalReports = mockReportedFrauds.length;
  const totalPages = Math.ceil(totalReports / pageSize);
  
  // Filter based on search and status
  const filteredReports = mockReportedFrauds.filter(report => {
    const matchesSearch = !searchQuery || 
      report.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) || 
      report.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !statusFilter || report.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  const handleReportFraud = () => {
    if (!transactionId.trim()) {
      toast.error("Please enter a transaction ID");
      return;
    }
    
    if (!fraudDetails.trim()) {
      toast.error("Please provide fraud details");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Fraud report submitted successfully");
      
      // Clear form
      setTransactionId("");
      setFraudDetails("");
    }, 1500);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const getStatusBadge = (status: ReportedFraud["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            Pending
          </Badge>
        );
      case "reviewing":
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
          Reviewing
        </Badge>;
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            Confirmed
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">
            Rejected
          </Badge>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="bg-grid absolute inset-0 z-0" aria-hidden="true" />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-8 gradient-heading">Fraud Reporting</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="glass-card overflow-hidden sticky top-24">
              <CardHeader>
                <CardTitle>Report Fraud</CardTitle>
                <CardDescription>
                  Submit information about suspected fraudulent transactions
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="transaction-id" className="text-sm font-medium">
                    Transaction ID
                  </label>
                  <Input
                    id="transaction-id"
                    placeholder="Enter transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="fraud-details" className="text-sm font-medium">
                    Fraud Details
                  </label>
                  <Textarea
                    id="fraud-details"
                    placeholder="Describe the suspicious activity..."
                    className="h-32 resize-none"
                    value={fraudDetails}
                    onChange={(e) => setFraudDetails(e.target.value)}
                  />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleReportFraud}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Report
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="glass-card overflow-hidden">
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Reported Frauds</CardTitle>
                    <CardDescription>
                      Review and manage submitted fraud reports
                    </CardDescription>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search reports..."
                        className="pl-8 w-[200px] sm:w-[250px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <div className="relative">
                      <select
                        className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        value={statusFilter || ""}
                        onChange={(e) => setStatusFilter(e.target.value || null)}
                      >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <Filter className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="overflow-x-auto animate-in slide-up">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Transaction</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Details</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedReports.length > 0 ? (
                      paginatedReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>{report.transactionId}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatDate(report.reportedDate)}
                          </TableCell>
                          <TableCell>{getStatusBadge(report.status)}</TableCell>
                          <TableCell className="hidden lg:table-cell max-w-[300px] truncate">
                            {report.details}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => toast.success(`Viewing details for ${report.id}`)}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center h-24">
                          No fraud reports found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
              
              {filteredReports.length > 0 && (
                <CardFooter className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {Math.min(filteredReports.length, pageSize)} of {filteredReports.length} reports
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      <StepBack className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                      Page {currentPage} of {Math.max(1, totalPages)}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages || totalPages === 0}
                    >
                      <StepForward className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
