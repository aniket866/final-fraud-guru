
export type TransactionStatus = 'completed' | 'pending' | 'failed';
export type FraudSource = 'rule' | 'model';
export type TransactionChannel = 'web' | 'mobile' | 'api';
export type PaymentMode = 'card' | 'UPI' | 'NEFT' | 'wallet';
export type Gateway = 'bank_a' | 'bank_b' | 'bank_c';

export interface Transaction {
  transaction_id: string;
  transaction_date: string;
  transaction_amount: number;
  transaction_channel: TransactionChannel;
  transaction_payment_mode: PaymentMode;
  payment_gateway_bank: Gateway;
  payer_email: string;
  payer_mobile: string;
  payer_card: string;
  device_id: string;
  browser: string;
  payee_id: string;
  status: TransactionStatus;
  is_fraud_predicted: boolean;
  fraud_source?: FraudSource;
  fraud_reason?: string;
  fraud_score?: number;
  is_fraud_reported: boolean;
  fraud_details?: string;
}

// Generate random transactions
export const generateTransactions = (count: number): Transaction[] => {
  const channels: TransactionChannel[] = ['web', 'mobile', 'api'];
  const paymentModes: PaymentMode[] = ['card', 'UPI', 'NEFT', 'wallet'];
  const gateways: Gateway[] = ['bank_a', 'bank_b', 'bank_c'];
  const statuses: TransactionStatus[] = ['completed', 'pending', 'failed'];
  const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
  const fraudReasons = [
    'Unusual location',
    'Multiple failed attempts',
    'Amount exceeds typical spending',
    'Suspicious IP address',
    'Velocity check failed',
    'Multiple transactions in short time',
    'Known fraud pattern detected',
    'Suspicious device fingerprint'
  ];

  return Array.from({ length: count }, (_, i) => {
    const isFraudPredicted = Math.random() < 0.15; // 15% fraud rate
    const fraudSource: FraudSource = Math.random() > 0.5 ? 'rule' : 'model';
    const fraudScore = isFraudPredicted ? 0.7 + Math.random() * 0.3 : Math.random() * 0.6;
    const isFraudReported = isFraudPredicted && Math.random() < 0.8; // 80% of predicted frauds are reported

    // Generate random date within the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    return {
      transaction_id: `TXN${1000000 + i}`,
      transaction_date: date.toISOString(),
      transaction_amount: Math.floor(Math.random() * 10000) + 100,
      transaction_channel: channels[Math.floor(Math.random() * channels.length)],
      transaction_payment_mode: paymentModes[Math.floor(Math.random() * paymentModes.length)],
      payment_gateway_bank: gateways[Math.floor(Math.random() * gateways.length)],
      payer_email: `user${i}@example.com`,
      payer_mobile: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      payer_card: `**** **** **** ${Math.floor(1000 + Math.random() * 9000)}`,
      device_id: `DEV-${Math.floor(Math.random() * 1000000)}`,
      browser: browsers[Math.floor(Math.random() * browsers.length)],
      payee_id: `PAYEE-${Math.floor(Math.random() * 1000)}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      is_fraud_predicted: isFraudPredicted,
      fraud_source: isFraudPredicted ? fraudSource : undefined,
      fraud_reason: isFraudPredicted ? fraudReasons[Math.floor(Math.random() * fraudReasons.length)] : undefined,
      fraud_score: fraudScore,
      is_fraud_reported: isFraudReported,
      fraud_details: isFraudReported ? 'Customer reported unauthorized transaction' : undefined
    };
  });
};

// Calculate fraud metrics by channel
export const getFraudByChannel = (transactions: Transaction[]) => {
  const channels = ['web', 'mobile', 'api'] as TransactionChannel[];
  return channels.map(channel => {
    const channelTransactions = transactions.filter(t => t.transaction_channel === channel);
    const fraudPredicted = channelTransactions.filter(t => t.is_fraud_predicted).length;
    const fraudReported = channelTransactions.filter(t => t.is_fraud_reported).length;
    return {
      channel,
      total: channelTransactions.length,
      fraudPredicted,
      fraudReported
    };
  });
};

// Calculate fraud metrics by payment mode
export const getFraudByPaymentMode = (transactions: Transaction[]) => {
  const modes = ['card', 'UPI', 'NEFT', 'wallet'] as PaymentMode[];
  return modes.map(mode => {
    const modeTransactions = transactions.filter(t => t.transaction_payment_mode === mode);
    const fraudPredicted = modeTransactions.filter(t => t.is_fraud_predicted).length;
    const fraudReported = modeTransactions.filter(t => t.is_fraud_reported).length;
    return {
      mode,
      total: modeTransactions.length,
      fraudPredicted,
      fraudReported
    };
  });
};

// Calculate fraud metrics by gateway
export const getFraudByGateway = (transactions: Transaction[]) => {
  const gateways = ['bank_a', 'bank_b', 'bank_c'] as Gateway[];
  return gateways.map(gateway => {
    const gatewayTransactions = transactions.filter(t => t.payment_gateway_bank === gateway);
    const fraudPredicted = gatewayTransactions.filter(t => t.is_fraud_predicted).length;
    const fraudReported = gatewayTransactions.filter(t => t.is_fraud_reported).length;
    return {
      gateway,
      total: gatewayTransactions.length,
      fraudPredicted,
      fraudReported
    };
  });
};

// Calculate fraud metrics over time (daily)
export const getFraudTimeSeries = (transactions: Transaction[], days: number = 30) => {
  const result = [];
  const now = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);
    
    const dayTransactions = transactions.filter(t => {
      const txDate = new Date(t.transaction_date);
      return txDate >= date && txDate < nextDate;
    });
    
    const fraudPredicted = dayTransactions.filter(t => t.is_fraud_predicted).length;
    const fraudReported = dayTransactions.filter(t => t.is_fraud_reported).length;
    
    result.unshift({
      date: date.toISOString().split('T')[0],
      fraudPredicted,
      fraudReported,
      total: dayTransactions.length
    });
  }
  
  return result;
};

// Calculate confusion matrix
export const getConfusionMatrix = (transactions: Transaction[]) => {
  const truePositives = transactions.filter(t => t.is_fraud_predicted && t.is_fraud_reported).length;
  const falsePositives = transactions.filter(t => t.is_fraud_predicted && !t.is_fraud_reported).length;
  const trueNegatives = transactions.filter(t => !t.is_fraud_predicted && !t.is_fraud_reported).length;
  const falseNegatives = transactions.filter(t => !t.is_fraud_predicted && t.is_fraud_reported).length;
  
  const precision = truePositives / (truePositives + falsePositives) || 0;
  const recall = truePositives / (truePositives + falseNegatives) || 0;
  const f1Score = 2 * (precision * recall) / (precision + recall) || 0;
  
  return {
    truePositives,
    falsePositives,
    trueNegatives,
    falseNegatives,
    precision,
    recall,
    f1Score
  };
};

// Get mock transactions
export const transactions = generateTransactions(200);
