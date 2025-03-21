
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Eye, Shield, CreditCard, User, Gift } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Fraud type data
const fraudTypeData = [
  { name: "Identity Theft", value: 35, color: "#f43f5e", icon: User },
  { name: "Payment Fraud", value: 25, color: "#8b5cf6", icon: CreditCard },
  { name: "Account Takeover", value: 20, color: "#0ea5e9", icon: Shield },
  { name: "Chargeback Fraud", value: 15, color: "#10b981", icon: Eye },
  { name: "Promo Abuse", value: 5, color: "#f97316", icon: Gift },
];

export function FraudTypeAnalysis() {
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>Fraud Type Distribution</CardTitle>
        <CardDescription>Analysis of fraud categories across the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={fraudTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1500}
              >
                {fraudTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.8)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "white",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {fraudTypeData.map((type) => (
            <div key={type.name} className="flex items-center p-3 rounded-lg border bg-background/30">
              <div className="w-8 h-8 rounded-full mr-3 flex items-center justify-center" style={{ backgroundColor: `${type.color}30` }}>
                <type.icon className="h-4 w-4" style={{ color: type.color }} />
              </div>
              <div>
                <p className="text-sm font-medium">{type.name}</p>
                <div className="flex items-center mt-1">
                  <div className="h-1.5 rounded-full" style={{ width: `${type.value * 2}px`, backgroundColor: type.color }}></div>
                  <span className="text-xs text-muted-foreground ml-2">{type.value}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
