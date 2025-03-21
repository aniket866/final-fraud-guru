import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  User, 
  CreditCard, 
  Gift, 
  Eye, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle,
  AlertCircle,
  Pencil,
  Settings
} from "lucide-react";
import { toast } from "sonner";

type FraudType = "identity" | "payment" | "account" | "chargeback" | "promotional";
type RuleStatus = "active" | "inactive" | "testing";

interface Rule {
  id: string;
  name: string;
  description: string;
  status: RuleStatus;
  type: FraudType;
  triggers: number;
  accuracy: number;
  lastTriggered?: string;
  conditions: string[];
}

const fraudRules: Record<FraudType, Rule[]> = {
  identity: [
    {
      id: "id-1",
      name: "Multiple Accounts with Same Device",
      description: "Detects when multiple accounts are created from the same device within a short period",
      status: "active",
      type: "identity",
      triggers: 143,
      accuracy: 89,
      lastTriggered: "2 hours ago",
      conditions: [
        "More than 3 accounts from same device ID",
        "Within 24 hour period",
        "Different user information"
      ]
    },
    {
      id: "id-2",
      name: "Identity Verification Mismatch",
      description: "Flags cases where submitted ID documents don't match user profile information",
      status: "active",
      type: "identity",
      triggers: 78,
      accuracy: 92,
      lastTriggered: "5 hours ago",
      conditions: [
        "Document name != Account name",
        "Document age != Declared age",
        "Document photo verification failed"
      ]
    },
    {
      id: "id-3",
      name: "Rapid Profile Changes",
      description: "Detects suspicious changes to user profile information shortly after creation",
      status: "testing",
      type: "identity",
      triggers: 24,
      accuracy: 76,
      lastTriggered: "1 day ago",
      conditions: [
        "Email change within 2 days of registration",
        "Phone number change within 3 days of verification",
        "Address change immediately after purchase"
      ]
    }
  ],
  payment: [
    {
      id: "pay-1",
      name: "Card BIN Country Mismatch",
      description: "Flags transactions where card BIN country doesn't match billing address country",
      status: "active",
      type: "payment",
      triggers: 215,
      accuracy: 82,
      lastTriggered: "30 minutes ago",
      conditions: [
        "Card BIN country ≠ Billing address country",
        "Transaction amount > $100",
        "Card not previously used on platform"
      ]
    },
    {
      id: "pay-2",
      name: "Excessive Payment Method Changes",
      description: "Identifies accounts that frequently add and remove payment methods",
      status: "active",
      type: "payment",
      triggers: 87,
      accuracy: 79,
      lastTriggered: "3 hours ago",
      conditions: [
        "> 3 payment methods added in 24 hours",
        "Payment method removed after single use",
        "Multiple failed transaction attempts"
      ]
    },
    {
      id: "pay-3",
      name: "Card Testing Pattern",
      description: "Detects patterns consistent with credit card testing behavior",
      status: "active",
      type: "payment",
      triggers: 132,
      accuracy: 95,
      lastTriggered: "1 hour ago",
      conditions: [
        "Multiple small transactions in sequence",
        "Transactions increasing in amount",
        "Multiple card numbers with same BIN"
      ]
    }
  ],
  account: [
    {
      id: "acc-1",
      name: "Location Anomaly",
      description: "Detects login from unusual locations compared to user history",
      status: "active",
      type: "account",
      triggers: 243,
      accuracy: 88,
      lastTriggered: "15 minutes ago",
      conditions: [
        "Login from new geolocation",
        "Login from different country than typical usage",
        "Impossible travel distance between logins"
      ]
    },
    {
      id: "acc-2",
      name: "Unusual Session Behavior",
      description: "Identifies abnormal navigation patterns and session characteristics",
      status: "testing",
      type: "account",
      triggers: 67,
      accuracy: 72,
      lastTriggered: "2 hours ago",
      conditions: [
        "Direct navigation to sensitive pages",
        "No browsing between logins and checkout",
        "Automated-like click patterns"
      ]
    },
    {
      id: "acc-3",
      name: "Credential Stuffing Detection",
      description: "Detects patterns consistent with credential stuffing attacks",
      status: "active",
      type: "account",
      triggers: 198,
      accuracy: 91,
      lastTriggered: "45 minutes ago",
      conditions: [
        "High login failure rate from single IP",
        "Sequential username attempt patterns",
        "Multiple accounts accessed from single device"
      ]
    }
  ],
  chargeback: [
    {
      id: "cb-1",
      name: "High-Value Order from New Account",
      description: "Flags large purchases from recently created accounts",
      status: "active",
      type: "chargeback",
      triggers: 56,
      accuracy: 84,
      lastTriggered: "4 hours ago",
      conditions: [
        "Account age < 7 days",
        "Order value > $500",
        "Shipping address differs from billing"
      ]
    },
    {
      id: "cb-2",
      name: "Suspicious Delivery Instructions",
      description: "Identifies potentially fraudulent delivery instructions",
      status: "inactive",
      type: "chargeback",
      triggers: 34,
      accuracy: 68,
      lastTriggered: "2 days ago",
      conditions: [
        "Contains keywords like 'leave at door'",
        "No signature requested for high-value order",
        "Rush delivery requested"
      ]
    },
    {
      id: "cb-3",
      name: "Digital Goods Velocity Check",
      description: "Checks for unusual purchasing patterns of digital goods",
      status: "active",
      type: "chargeback",
      triggers: 93,
      accuracy: 87,
      lastTriggered: "1 hour ago",
      conditions: [
        "Multiple digital purchases in short timeframe",
        "Digital goods total > $300 in 24 hours",
        "Purchase of frequently resold digital items"
      ]
    }
  ],
  promotional: [
    {
      id: "promo-1",
      name: "Multiple Accounts, Same Promo",
      description: "Identifies multiple accounts using the same promotion from similar attributes",
      status: "active",
      type: "promotional",
      triggers: 112,
      accuracy: 94,
      lastTriggered: "1 hour ago",
      conditions: [
        "Same device ID or IP address",
        "Similar email pattern",
        "Accounts created within 48 hours"
      ]
    },
    {
      id: "promo-2",
      name: "Referral Abuse Detection",
      description: "Detects patterns of abuse in referral programs",
      status: "active",
      type: "promotional",
      triggers: 76,
      accuracy: 91,
      lastTriggered: "3 hours ago",
      conditions: [
        "Self-referral patterns",
        "Referrals with matching device or IP",
        "Low activity after claiming referral bonus"
      ]
    },
    {
      id: "promo-3",
      name: "Promo Code Sharing",
      description: "Identifies sharing of single-use promotional codes",
      status: "testing",
      type: "promotional",
      triggers: 43,
      accuracy: 82,
      lastTriggered: "7 hours ago",
      conditions: [
        "Attempts to use same promo code multiple times",
        "Different accounts from same network",
        "Accounts with minimal activity except promo redemption"
      ]
    }
  ]
};

export function FraudRulesets() {
  const [activeTab, setActiveTab] = useState<FraudType>("payment");
  const [expandedRules, setExpandedRules] = useState<Record<string, boolean>>({});

  const toggleRuleExpand = (ruleId: string) => {
    setExpandedRules(prev => ({
      ...prev,
      [ruleId]: !prev[ruleId]
    }));
  };

  const getStatusBadge = (status: RuleStatus) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle className="mr-1 h-3 w-3" /> Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge variant="outline" className="bg-slate-500/10 text-slate-500 border-slate-500/20">
            Inactive
          </Badge>
        );
      case "testing":
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            Testing
          </Badge>
        );
    }
  };

  const getTypeIcon = (type: FraudType) => {
    switch (type) {
      case "identity": return <User className="h-4 w-4" />;
      case "payment": return <CreditCard className="h-4 w-4" />;
      case "account": return <Shield className="h-4 w-4" />;
      case "chargeback": return <Eye className="h-4 w-4" />;
      case "promotional": return <Gift className="h-4 w-4" />;
    }
  };

  const toggleRuleStatus = (ruleId: string, currentStatus: RuleStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    toast.success(`Rule status changed to ${newStatus}`);
  };

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader>
        <CardTitle>Fraud Rule Engine</CardTitle>
        <CardDescription>Detection rules by fraud category</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as FraudType)}>
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="identity" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Identity</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payment</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger value="chargeback" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Chargeback</span>
            </TabsTrigger>
            <TabsTrigger value="promotional" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              <span className="hidden sm:inline">Promotional</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4">
            {fraudRules[activeTab].map((rule) => (
              <div 
                key={rule.id} 
                className="border rounded-lg overflow-hidden bg-background/20 transition-all duration-200"
              >
                <div 
                  className="p-4 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleRuleExpand(rule.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-md">
                      {getTypeIcon(rule.type)}
                    </div>
                    <div>
                      <h3 className="font-medium">{rule.name}</h3>
                      <p className="text-xs text-muted-foreground">{rule.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(rule.status)}
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      {expandedRules[rule.id] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                {expandedRules[rule.id] && (
                  <div className="p-4 pt-0 border-t mt-2 animate-in fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Triggers</span>
                        <span className="font-semibold">{rule.triggers} times</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Accuracy</span>
                        <span className="font-semibold">{rule.accuracy}%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Last Triggered</span>
                        <span className="font-semibold">{rule.lastTriggered || "Never"}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <h4 className="text-sm font-medium mb-2">Conditions:</h4>
                      <ul className="space-y-1">
                        {rule.conditions.map((condition, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <AlertCircle className="h-3 w-3 text-primary" />
                            {condition}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm" 
                        variant={rule.status === 'active' ? "destructive" : "default"}
                        onClick={() => toggleRuleStatus(rule.id, rule.status)}
                      >
                        {rule.status === 'active' ? 'Disable Rule' : 'Enable Rule'}
                      </Button>
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
                )}
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
