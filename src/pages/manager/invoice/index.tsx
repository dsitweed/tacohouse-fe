import { Card } from 'antd';
import InvoicesTable from './InvoicesTable';
import InvoiceForm from './InvoiceForm';

export default function ManagerInvoice() {
  return (
    <Card className="h-full">
      <InvoicesTable />
      <InvoiceForm />
    </Card>
  );
}
