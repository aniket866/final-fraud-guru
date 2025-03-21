
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Calendar, 
  Filter, 
  ChevronDown, 
  Share2, 
  FileText, 
  BarChart2, 
  PieChart as PieChartIcon, 
  Table as TableIcon
} from 'lucide-react';
import { toast } from 'sonner';

interface ReportData {
  startDate: string;
  endDate: string;
  fraudCount: number;
  legitimateCount: number;
  totalAmount: number;
  fraudAmount: number;
  fraudRate: number;
  fraudByType: {
    name: string;
    value: number;
    color: string;
  }[];
  fraudByDay: {
    date: string;
    fraudCount: number;
    legitCount: number;
  }[];
  topRulesTriggers: {
    name: string;
    count: number;
  }[];
  topCountries: {
    name: string;
    count: number;
  }[];
}

// Sample data for demo
const generateSampleReportData = (): ReportData => {
  const now = new Date();
  
  // Calculate startDate as 30 days ago
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - 30);
  
  const fraudByDay = [];
  
  // Generate 30 days of data
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Generate random fraud and legitimate counts with some patterns
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    const baseCount = isWeekend ? 15 : 10;
    const variation = Math.floor(Math.random() * 8);
    
    const fraudCount = baseCount + variation;
    const legitCount = baseCount * 10 + Math.floor(Math.random() * 50);
    
    fraudByDay.push({
      date: date.toISOString().split('T')[0],
      fraudCount,
      legitCount
    });
  }
  
  // Calculate totals based on the daily data
  const fraudCount = fraudByDay.reduce((sum, day) => sum + day.fraudCount, 0);
  const legitimateCount = fraudByDay.reduce((sum, day) => sum + day.legitCount, 0);
  const totalCount = fraudCount + legitimateCount;
  const fraudRate = fraudCount / totalCount;
  
  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: now.toISOString().split('T')[0],
    fraudCount,
    legitimateCount,
    totalAmount: 5243892,
    fraudAmount: 398521,
    fraudRate,
    fraudByType: [
      { name: 'Payment Fraud', value: 38, color: '#FF6384' },
      { name: 'Identity Theft', value: 27, color: '#36A2EB' },
      { name: 'Account Takeover', value: 21, color: '#FFCE56' },
      { name: 'Chargeback', value: 8, color: '#4BC0C0' },
      { name: 'Promotion Abuse', value: 6, color: '#9966FF' }
    ],
    fraudByDay,
    topRulesTriggers: [
      { name: 'Unusual Location', count: 87 },
      { name: 'High Value Transaction', count: 64 },
      { name: 'Multiple Failed Attempts', count: 42 },
      { name: 'New Device Login', count: 36 },
      { name: 'Velocity Check', count: 29 }
    ],
    topCountries: [
      { name: 'United States', count: 124 },
      { name: 'United Kingdom', count: 56 },
      { name: 'Canada', count: 34 },
      { name: 'Germany', count: 28 },
      { name: 'Australia', count: 23 }
    ]
  };
};

export function FraudReport() {
  const [reportType, setReportType] = useState<'summary' | 'trends' | 'rules' | 'geo'>('summary');
  const [reportData, setReportData] = useState<ReportData>(generateSampleReportData());
  const [isGenerating, setIsGenerating] = useState(false);
  
  const refreshReportData = () => {
    setIsGenerating(true);
    toast.info('Generating new report data...');
    
    // Simulate API call delay
    setTimeout(() => {
      setReportData(generateSampleReportData());
      setIsGenerating(false);
      toast.success('Report data refreshed');
    }, 1500);
  };
  
  const downloadReport = () => {
    toast.success('Report downloaded successfully');
  };
  
  const shareReport = () => {
    toast.success('Report link copied to clipboard');
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const formatPercent = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };
  
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  };
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Fraud Analysis Report</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              {formatDateRange(reportData.startDate, reportData.endDate)}
            </CardDescription>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1.5" disabled={isGenerating} onClick={refreshReportData}>
              {isGenerating ? (
                <div className="h-3.5 w-3.5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              ) : (
                <Filter className="h-3.5 w-3.5" />
              )}
              <span>Refresh</span>
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center gap-1.5" onClick={downloadReport}>
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center gap-1.5" onClick={shareReport}>
              <Share2 className="h-3.5 w-3.5" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={reportType} onValueChange={(value) => setReportType(value as any)}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="summary" className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Summary</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-1.5">
              <BarChart2 className="h-4 w-4" />
              <span className="hidden sm:inline">Trends</span>
            </TabsTrigger>
            <TabsTrigger value="rules" className="flex items-center gap-1.5">
              <PieChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">By Type</span>
            </TabsTrigger>
            <TabsTrigger value="geo" className="flex items-center gap-1.5">
              <TableIcon className="h-4 w-4" />
              <span className="hidden sm:inline">By Region</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="border rounded-lg p-4">
                <div className="text-sm text-muted-foreground">Total Transactions</div>
                <div className="text-2xl font-bold mt-1">{reportData.fraudCount + reportData.legitimateCount}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {reportData.legitimateCount} Legitimate | {reportData.fraudCount} Fraud
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="text-sm text-muted-foreground">Fraud Rate</div>
                <div className="text-2xl font-bold mt-1">{formatPercent(reportData.fraudRate)}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {reportData.fraudCount} out of {reportData.fraudCount + reportData.legitimateCount} transactions
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="text-sm text-muted-foreground">Total Transaction Value</div>
                <div className="text-2xl font-bold mt-1">{formatCurrency(reportData.totalAmount)}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Across all processed transactions
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="text-sm text-muted-foreground">Fraud Amount</div>
                <div className="text-2xl font-bold mt-1">{formatCurrency(reportData.fraudAmount)}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {formatPercent(reportData.fraudAmount / reportData.totalAmount)} of total amount
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Fraud By Type</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={reportData.fraudByType}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {reportData.fraudByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Top Rules Triggered</h3>
                <div className="space-y-3">
                  {reportData.topRulesTriggers.map((rule, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="text-sm">{rule.name}</div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">{rule.count}</div>
                        <div 
                          className="h-2 bg-primary rounded-full" 
                          style={{ 
                            width: `${Math.max(30, rule.count * 1.5)}px`,
                            opacity: 1 - (index * 0.15)
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trends">
            <h3 className="text-lg font-medium mb-4">Fraud Trend Analysis</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={reportData.fraudByDay}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip formatter={(value, name) => [value, name === 'fraudCount' ? 'Fraud' : 'Legitimate']} />
                <Legend />
                <Bar yAxisId="left" dataKey="fraudCount" name="Fraud" fill="#FF6384" />
                <Bar yAxisId="right" dataKey="legitCount" name="Legitimate" fill="#36A2EB" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-6 p-4 border rounded-md bg-muted/20">
              <h4 className="font-medium mb-2">Analysis Insights</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">Trend</Badge>
                  <span>Weekend fraud activity is 35% higher than weekdays on average</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">Pattern</Badge>
                  <span>Fraud attempts increase by 22% during promotion periods</span>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">Anomaly</Badge>
                  <span>Spike detected on {reportData.fraudByDay[15].date} due to suspected coordinated attack</span>
                </li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="rules">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Fraud By Type</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={reportData.fraudByType}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {reportData.fraudByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Fraud Type Details</h3>
                <div className="space-y-4">
                  {reportData.fraudByType.map(type => (
                    <div key={type.name} className="p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: type.color }} 
                        />
                        <h4 className="font-medium">{type.name}</h4>
                        <Badge className="ml-auto">{type.value}%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {type.name === 'Payment Fraud' && 'Involves unauthorized transactions and stolen payment methods'}
                        {type.name === 'Identity Theft' && 'Cases where fraudsters impersonate legitimate users'}
                        {type.name === 'Account Takeover' && 'Unauthorized access to user accounts through credential theft'}
                        {type.name === 'Chargeback' && 'Fraudulent disputes of legitimate transactions'}
                        {type.name === 'Promotion Abuse' && 'Exploitation of promotional offers and discounts'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="geo">
            <h3 className="text-lg font-medium mb-4">Geographic Distribution</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-base font-medium mb-3">Top Countries by Fraud Count</h4>
                <div className="space-y-3">
                  {reportData.topCountries.map((country, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-sm min-w-28">{country.name}</span>
                      <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden mx-2">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ 
                            width: `${Math.max(5, (country.count / reportData.topCountries[0].count) * 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">{country.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-base font-medium mb-3">Regional Risk Analysis</h4>
                <div className="space-y-3">
                  <div className="p-3 border rounded-md">
                    <h5 className="font-medium">High Risk Regions</h5>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span>Eastern Europe</span>
                        <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">
                          High Risk
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Southeast Asia</span>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                          Medium Risk
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>West Africa</span>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                          Medium Risk
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <h5 className="font-medium">Risk Factors by Region</h5>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>• Cross-border transactions show 3.2x higher fraud rate</p>
                      <p>• Transactions from VPNs have 2.7x risk multiplier</p>
                      <p>• New geographic regions have 5x risk in first 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t p-4 text-sm text-muted-foreground">
        <div>Report generated on {new Date().toLocaleString()}</div>
        <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
          View API Documentation
        </Button>
      </CardFooter>
    </Card>
  );
}
