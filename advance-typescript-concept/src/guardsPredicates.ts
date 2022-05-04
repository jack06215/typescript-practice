export type LineItem = {
  productId: number;
  quantity: number;
  discounted?: boolean;
  unitPrice: number;
};

export type FinalInvoice = {
  __typename: "FinalInvoice";
  insertedAt: string;
  invoiceNumber: string;
  customerId: number;
  lineItems: Array<LineItem>;
};

export type DrafeInvoice = {
  __typename: "DraftInvoice";
  insertedAt: string;
  invoiceNumber?: string;
  customerId?: number;
  approvedBy?: number;
  lineItems: Array<LineItem>;
};

export type StatusLevelCreateManyInput = {
  id?: number
  name: string
};

export type Invoice = FinalInvoice | DrafeInvoice;

export const isFinalInvoice = (invoice: Invoice): invoice is FinalInvoice => {
  return invoice.__typename === "FinalInvoice";
};

export const isDrafeInvoice = (invoice: Invoice): invoice is DrafeInvoice => {
  return invoice.__typename === "DraftInvoice";
};

const new_invoice: Invoice = {
  __typename: "DraftInvoice",
  insertedAt: "2021-05-01",
  lineItems: [],
};

const another_new_invoice: Invoice = {
  __typename: "FinalInvoice",
  insertedAt: "2021-05-01",
  invoiceNumber: "1234567",
  customerId: 719,
  lineItems: [],
};

const status: { [key: string]: StatusLevelCreateManyInput } = {
  revoked: {
    id: -1,
    name: 'Revoked',
  },
  invited: {
    id: 0,
    name: 'Invited',
  },
  active: {
    id: 1,
    name: 'Active',
  },
};

// false
isFinalInvoice(new_invoice);

// true
isDrafeInvoice(new_invoice);

// true
isFinalInvoice(another_new_invoice);
