import { BaseResponse } from "../../../models/response/base.response";
import { PaymentMethodType } from "../../enums/payment-method-type";
import { TransactionType } from "../../enums/transaction-type";

export class BillingResponse extends BaseResponse {
  balance: number;
  paymentSource: BillingSourceResponse;
  invoices: BillingInvoiceResponse[] = [];
  transactions: BillingTransactionResponse[] = [];

  constructor(response: any) {
    super(response);
    this.balance = this.getResponseProperty("Balance");
    const paymentSource = this.getResponseProperty("PaymentSource");
    const transactions = this.getResponseProperty("Transactions");
    const invoices = this.getResponseProperty("Invoices");
    this.paymentSource = paymentSource == null ? null : new BillingSourceResponse(paymentSource);
    if (transactions != null) {
      this.transactions = transactions.map((t: any) => new BillingTransactionResponse(t));
    }
    if (invoices != null) {
      this.invoices = invoices.map((i: any) => new BillingInvoiceResponse(i));
    }
  }

  get hasNoHistory() {
    return this.invoices.length == 0 && this.transactions.length == 0;
  }
}

export class BillingSourceResponse extends BaseResponse {
  type: PaymentMethodType;
  cardBrand: string;
  description: string;
  needsVerification: boolean;

  constructor(response: any) {
    super(response);
    this.type = this.getResponseProperty("Type");
    this.cardBrand = this.getResponseProperty("CardBrand");
    this.description = this.getResponseProperty("Description");
    this.needsVerification = this.getResponseProperty("NeedsVerification");
  }
}

export class BillingInvoiceResponse extends BaseResponse {
  url: string;
  pdfUrl: string;
  number: string;
  paid: boolean;
  date: string;
  amount: number;

  constructor(response: any) {
    super(response);
    this.url = this.getResponseProperty("Url");
    this.pdfUrl = this.getResponseProperty("PdfUrl");
    this.number = this.getResponseProperty("Number");
    this.paid = this.getResponseProperty("Paid");
    this.date = this.getResponseProperty("Date");
    this.amount = this.getResponseProperty("Amount");
  }
}

export class BillingTransactionResponse extends BaseResponse {
  createdDate: string;
  amount: number;
  refunded: boolean;
  partiallyRefunded: boolean;
  refundedAmount: number;
  type: TransactionType;
  paymentMethodType: PaymentMethodType;
  details: string;

  constructor(response: any) {
    super(response);
    this.createdDate = this.getResponseProperty("CreatedDate");
    this.amount = this.getResponseProperty("Amount");
    this.refunded = this.getResponseProperty("Refunded");
    this.partiallyRefunded = this.getResponseProperty("PartiallyRefunded");
    this.refundedAmount = this.getResponseProperty("RefundedAmount");
    this.type = this.getResponseProperty("Type");
    this.paymentMethodType = this.getResponseProperty("PaymentMethodType");
    this.details = this.getResponseProperty("Details");
  }
}
