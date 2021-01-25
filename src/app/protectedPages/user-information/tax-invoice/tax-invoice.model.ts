export interface TaxInvoice {
    userName?: string;
    projectNumber?: string;
    poNumber?: string;
    poDate?: string;
    fromDate?: string;
    toDate?: string;
    billableAmount?: string;
    InvoiceAmount?: string;
    TaxInvoiceNumber?: string;
    submittedDate?: string;
    InvoiceStatus?: number;
    InvoicePaidAmount?: string;
    tds?: string;
    penalty?: string;
    shortPay?: string;
    paymentStatus?: number;
    remark?: string;
    uploadDocument?: string;
    userEmail?: string;
    totalSMS?: number;
    counts1?: number;
    baseAmount?: number;
    tax?: number;
    invoiceDate?: string; // not available in form
    receiveDate?: string;
    book?: string;
    dateEstimated?: string;
    invoiceAmount2?: number;
    bankReceived?: string;
    receiptDate1?: string;
    month?: string;
    year?: string;
    mrnNumber?: string;
    projectName?: string;
    Estimation?: string; // not available in form
    id?: number;
}
