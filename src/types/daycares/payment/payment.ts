export interface PaymentWithQRIS {
  transaction_id: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  currency: string;
  payment_type: string;
  transaction_time: Date;
  transaction_status: string;
  fraud_status: string;
}
