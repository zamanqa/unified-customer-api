// Request payloads for Invoices module

export function getRefundPayload(invoiceId, orderId) {
  return {
    amount: 0.1,
    cumulated_items: [],
    full_refund: false,
    invoice_id: String(invoiceId),
    items: [],
    message: "",
    order_id: String(orderId),
    products: [
      {
        amount: 0.1,
        product: "Test",
        quantity: 1,
        tax_percent: 0
      }
    ]
  };
}
