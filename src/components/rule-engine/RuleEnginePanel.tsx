
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Code, Plus, Save, Trash2, Play, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export type RuleConditionType = 'amount' | 'location' | 'time' | 'frequency' | 'user' | 'device' | 'custom';

export interface RuleCondition {
  id: string;
  type: RuleConditionType;
  field: string;
  operator: string;
  value: string;
}

export interface Rule {
  id: string;
  name: string;
  description: string;
  conditions: RuleCondition[];
  action: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastTriggered?: Date;
  triggerCount: number;
}

export function RuleConditionBuilder({ 
  condition,
  onUpdate,
  onDelete
}: { 
  condition: RuleCondition; 
  onUpdate: (id: string, updates: Partial<RuleCondition>) => void;
  onDelete: (id: string) => void;
}) {
  const fieldOptions = {
    amount: ['transaction_amount', 'total_daily_amount', 'average_amount'],
    location: ['country', 'ip_address', 'city', 'distance_from_usual'],
    time: ['time_of_day', 'day_of_week', 'hour'],
    frequency: ['transactions_per_hour', 'transactions_per_day', 'login_attempts'],
    user: ['user_age', 'account_age', 'risk_score', 'previous_chargebacks'],
    device: ['device_id', 'browser', 'os', 'is_mobile'],
    custom: ['custom_expression']
  };

  const operatorOptions = {
    default: ['equals', 'not_equals', 'greater_than', 'less_than', 'contains', 'not_contains', 'in_list', 'not_in_list'],
    custom: ['matches_regex', 'evaluates_to_true']
  };

  return (
    <div className="p-4 border rounded-md bg-muted/20 space-y-3">
      <div className="flex items-center justify-between">
        <Badge variant="outline">{condition.type}</Badge>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onDelete(condition.id)}
          className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label htmlFor={`field-${condition.id}`}>Field</Label>
          <select 
            id={`field-${condition.id}`}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            value={condition.field}
            onChange={(e) => onUpdate(condition.id, { field: e.target.value })}
          >
            {condition.type === 'custom' ? (
              <option value="custom_expression">Custom Expression</option>
            ) : (
              fieldOptions[condition.type].map(field => (
                <option key={field} value={field}>{field.replace(/_/g, ' ')}</option>
              ))
            )}
          </select>
        </div>
        
        <div>
          <Label htmlFor={`operator-${condition.id}`}>Operator</Label>
          <select 
            id={`operator-${condition.id}`}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            value={condition.operator}
            onChange={(e) => onUpdate(condition.id, { operator: e.target.value })}
          >
            {(condition.type === 'custom' ? operatorOptions.custom : operatorOptions.default)
              .map(op => (
                <option key={op} value={op}>{op.replace(/_/g, ' ')}</option>
              ))
            }
          </select>
        </div>
        
        <div>
          <Label htmlFor={`value-${condition.id}`}>Value</Label>
          <Input 
            id={`value-${condition.id}`}
            value={condition.value}
            onChange={(e) => onUpdate(condition.id, { value: e.target.value })}
            placeholder={condition.type === 'custom' ? "e.g., amount > 1000 && country != 'US'" : "Value"}
          />
        </div>
      </div>
      
      {condition.type === 'custom' && (
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Code className="h-3 w-3" />
          <span>Use JavaScript-like expressions for complex conditions</span>
        </div>
      )}
    </div>
  );
}

export function RuleEditor({
  rule,
  onSave,
  onCancel,
  onTest
}: {
  rule: Rule;
  onSave: (rule: Rule) => void;
  onCancel: () => void;
  onTest: (rule: Rule) => void;
}) {
  const [editedRule, setEditedRule] = useState<Rule>({ ...rule });
  
  const updateRule = (updates: Partial<Rule>) => {
    setEditedRule(prev => ({ ...prev, ...updates }));
  };
  
  const addCondition = (type: RuleConditionType) => {
    const newCondition: RuleCondition = {
      id: Date.now().toString(),
      type,
      field: type === 'custom' ? 'custom_expression' : 
        type === 'amount' ? 'transaction_amount' :
        type === 'location' ? 'country' :
        type === 'time' ? 'time_of_day' :
        type === 'frequency' ? 'transactions_per_hour' :
        type === 'user' ? 'user_age' : 'device_id',
      operator: type === 'custom' ? 'evaluates_to_true' : 'equals',
      value: ''
    };
    
    setEditedRule(prev => ({
      ...prev,
      conditions: [...prev.conditions, newCondition]
    }));
  };
  
  const updateCondition = (id: string, updates: Partial<RuleCondition>) => {
    setEditedRule(prev => ({
      ...prev,
      conditions: prev.conditions.map(c => 
        c.id === id ? { ...c, ...updates } : c
      )
    }));
  };
  
  const deleteCondition = (id: string) => {
    setEditedRule(prev => ({
      ...prev,
      conditions: prev.conditions.filter(c => c.id !== id)
    }));
  };
  
  const handleSave = () => {
    // Validate
    if (!editedRule.name.trim()) {
      toast.error("Rule name is required");
      return;
    }
    
    if (editedRule.conditions.length === 0) {
      toast.error("At least one condition is required");
      return;
    }
    
    for (const condition of editedRule.conditions) {
      if (!condition.value.trim() && condition.type !== 'custom') {
        toast.error("All condition values must be specified");
        return;
      }
    }
    
    // Update dates
    const updatedRule = {
      ...editedRule,
      updatedAt: new Date()
    };
    
    onSave(updatedRule);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="rule-name">Rule Name</Label>
          <Input 
            id="rule-name"
            value={editedRule.name}
            onChange={(e) => updateRule({ name: e.target.value })}
            placeholder="E.g., High Value Transaction Alert"
          />
        </div>
        <div className="flex items-center justify-end space-x-2">
          <div className="flex items-center space-x-2">
            <Switch 
              id="rule-enabled"
              checked={editedRule.enabled}
              onCheckedChange={(checked) => updateRule({ enabled: checked })}
            />
            <Label htmlFor="rule-enabled">Enabled</Label>
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="rule-description">Description</Label>
        <Textarea 
          id="rule-description"
          value={editedRule.description}
          onChange={(e) => updateRule({ description: e.target.value })}
          placeholder="Describe what this rule detects and when it should trigger"
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <Label>Conditions</Label>
          <div className="flex gap-1">
            <select 
              className="h-8 rounded-md border border-input bg-background px-2 py-1 text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) {
                  addCondition(e.target.value as RuleConditionType);
                  e.target.value = "";
                }
              }}
            >
              <option value="" disabled>Add condition...</option>
              <option value="amount">Amount</option>
              <option value="location">Location</option>
              <option value="time">Time</option>
              <option value="frequency">Frequency</option>
              <option value="user">User</option>
              <option value="device">Device</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>
        
        {editedRule.conditions.length === 0 ? (
          <div className="border rounded-md p-8 text-center text-muted-foreground">
            <div className="mb-2 flex justify-center">
              <AlertCircle className="h-6 w-6" />
            </div>
            <p>No conditions defined yet</p>
            <p className="text-sm">Add at least one condition for this rule</p>
          </div>
        ) : (
          <div className="space-y-2">
            {editedRule.conditions.map(condition => (
              <RuleConditionBuilder 
                key={condition.id}
                condition={condition}
                onUpdate={updateCondition}
                onDelete={deleteCondition}
              />
            ))}
          </div>
        )}
      </div>
      
      <div>
        <Label htmlFor="rule-action">Action</Label>
        <select 
          id="rule-action"
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          value={editedRule.action}
          onChange={(e) => updateRule({ action: e.target.value })}
        >
          <option value="flag">Flag for review</option>
          <option value="block">Block transaction</option>
          <option value="notify">Send notification only</option>
          <option value="require_verification">Require additional verification</option>
        </select>
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="outline" onClick={() => onTest(editedRule)}>
          <Play className="h-4 w-4 mr-2" />
          Test Rule
        </Button>
        <Button onClick={handleSave} className="btn-shine btn-glow">
          <Save className="h-4 w-4 mr-2" />
          Save Rule
        </Button>
      </div>
    </div>
  );
}

export function RuleEnginePanel() {
  const [rules, setRules] = useState<Rule[]>([
    {
      id: '1',
      name: 'High Value Transactions',
      description: 'Flags transactions above a certain threshold for review',
      conditions: [
        {
          id: '101',
          type: 'amount',
          field: 'transaction_amount',
          operator: 'greater_than',
          value: '1000'
        },
        {
          id: '102',
          type: 'user',
          field: 'account_age',
          operator: 'less_than', 
          value: '30'
        }
      ],
      action: 'flag',
      enabled: true,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      lastTriggered: new Date(Date.now() - 12 * 60 * 60 * 1000),
      triggerCount: 17
    },
    {
      id: '2',
      name: 'Unusual Location',
      description: 'Detects transactions from unusual locations compared to user history',
      conditions: [
        {
          id: '201',
          type: 'location',
          field: 'country',
          operator: 'not_equals',
          value: 'user.usual_country'
        }
      ],
      action: 'require_verification',
      enabled: true,
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      lastTriggered: new Date(Date.now() - 3 * 60 * 60 * 1000),
      triggerCount: 42
    }
  ]);
  
  const [editingRule, setEditingRule] = useState<Rule | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isTestingRule, setIsTestingRule] = useState(false);
  const [testResult, setTestResult] = useState<{ triggered: boolean; reason?: string } | null>(null);
  
  const handleCreateRule = () => {
    const newRule: Rule = {
      id: Date.now().toString(),
      name: '',
      description: '',
      conditions: [],
      action: 'flag',
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      triggerCount: 0
    };
    
    setEditingRule(newRule);
    setIsCreating(true);
  };
  
  const handleEditRule = (rule: Rule) => {
    setEditingRule({ ...rule });
    setIsCreating(false);
  };
  
  const handleSaveRule = (rule: Rule) => {
    if (isCreating) {
      setRules(prev => [...prev, rule]);
      toast.success('Rule created successfully');
    } else {
      setRules(prev => prev.map(r => r.id === rule.id ? rule : r));
      toast.success('Rule updated successfully');
    }
    
    setEditingRule(null);
    setIsCreating(false);
  };
  
  const handleDeleteRule = (id: string) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
    toast.success('Rule deleted successfully');
  };
  
  const handleToggleRule = (id: string, enabled: boolean) => {
    setRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, enabled, updatedAt: new Date() } : rule
    ));
    
    toast.success(`Rule ${enabled ? 'enabled' : 'disabled'}`);
  };
  
  const handleTestRule = (rule: Rule) => {
    setIsTestingRule(true);
    setTestResult(null);
    
    // Simulate a backend test
    setTimeout(() => {
      const triggered = Math.random() > 0.5;
      
      setTestResult({
        triggered,
        reason: triggered 
          ? `Condition matched: ${rule.conditions[0]?.field} ${rule.conditions[0]?.operator} ${rule.conditions[0]?.value}`
          : 'No conditions were matched'
      });
      
      setIsTestingRule(false);
    }, 1500);
  };
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Rule Engine</CardTitle>
            <CardDescription>Define and manage fraud detection rules</CardDescription>
          </div>
          {!editingRule && (
            <Button onClick={handleCreateRule} className="btn-shine">
              <Plus className="h-4 w-4 mr-2" />
              Create Rule
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {editingRule ? (
          <RuleEditor 
            rule={editingRule}
            onSave={handleSaveRule}
            onCancel={() => setEditingRule(null)}
            onTest={handleTestRule}
          />
        ) : (
          <>
            {isTestingRule && (
              <div className="mb-4 p-4 border rounded-md bg-muted animate-pulse">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-muted-foreground animate-bounce" />
                  <p>Testing rule against sample data...</p>
                </div>
              </div>
            )}
            
            {testResult && (
              <div className={`mb-4 p-4 border rounded-md ${
                testResult.triggered 
                  ? 'bg-rose-500/10 border-rose-500/30' 
                  : 'bg-green-500/10 border-green-500/30'
              }`}>
                <div className="flex items-center gap-2">
                  {testResult.triggered ? (
                    <AlertCircle className="h-4 w-4 text-rose-500" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  <p className="font-medium">
                    {testResult.triggered 
                      ? 'Rule triggered' 
                      : 'Rule not triggered'}
                  </p>
                </div>
                {testResult.reason && (
                  <p className="mt-1 text-sm pl-6">{testResult.reason}</p>
                )}
              </div>
            )}
            
            {rules.length === 0 ? (
              <div className="text-center py-12 border rounded-md">
                <div className="mb-3 flex justify-center">
                  <AlertCircle className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No rules defined</h3>
                <p className="text-muted-foreground">Create your first rule to get started</p>
                <Button 
                  onClick={handleCreateRule} 
                  className="mt-4 btn-shine"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Rule
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {rules.map(rule => (
                  <div 
                    key={rule.id} 
                    className={`p-4 border rounded-md hover:bg-muted/10 transition-colors ${
                      rule.enabled ? '' : 'opacity-60'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{rule.name}</h3>
                        <p className="text-sm text-muted-foreground">{rule.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Switch 
                          checked={rule.enabled}
                          onCheckedChange={(checked) => handleToggleRule(rule.id, checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Conditions:</span>
                        <div className="mt-1 space-y-1">
                          {rule.conditions.map(condition => (
                            <Badge key={condition.id} variant="outline" className="block truncate max-w-full">
                              {condition.field} {condition.operator} {condition.value}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-muted-foreground">Action:</span>
                        <Badge variant="secondary" className="mt-1">
                          {rule.action.replace(/_/g, ' ')}
                        </Badge>
                      </div>
                      
                      <div>
                        <span className="text-muted-foreground">Triggered:</span>
                        <div className="mt-1">
                          {rule.triggerCount} times
                          {rule.lastTriggered && (
                            <span className="text-xs text-muted-foreground"> (last: {
                              new Date(rule.lastTriggered).toLocaleString()
                            })</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleTestRule(rule)}
                      >
                        <Play className="h-3.5 w-3.5 mr-1.5" />
                        Test
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditRule(rule)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteRule(rule.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
