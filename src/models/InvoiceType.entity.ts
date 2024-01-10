import { InvoiceEntity } from './Invoice.entity';

export interface InvoiceTypeEntity {
  id: number;
  name: string;
  invoices: InvoiceEntity[];

  createdAt: string;
  updatedAt: string;
}
