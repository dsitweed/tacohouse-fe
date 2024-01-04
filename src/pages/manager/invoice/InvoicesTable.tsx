import Status from '@/components/common/Status';
import { InvoiceEntity } from '@/models/Invoice.entity';
import { InvoiceTypeEntity } from '@/models/InvoiceType.entity';
import { INVOICES_PATH } from '@/routes/routeNames';
import { useApiClient } from '@/shared/hooks/api';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { invoiceActions } from '@/store/slices/invoice.slice';
import { modalActions } from '@/store/slices/modal.slice';
import { TableParams } from '@/types/antd';
import { App, Button, Popconfirm, Space, Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';

export default function InvoicesTable() {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const apiInvoice = useApiClient(INVOICES_PATH);
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal);

  const [isLoading, setIsLoading] = useState(false);
  const [invoices, setInvoices] = useState<InvoiceEntity[]>([]);
  const [invoiceTypes, setInvoiceTypes] = useState<InvoiceTypeEntity[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  useEffect(() => {
    const fetchInvoiceTypes = async () => {
      try {
        const response = await apiInvoice.getAllExtend('/type');
        if (response?.success) {
          setInvoiceTypes(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchInvoiceTypes();
  }, []);

  useEffect(() => {
    const fetchInvoices = async () => {
      if (!tableParams.pagination?.current || !tableParams.pagination.pageSize)
        return;

      try {
        const { current, pageSize } = tableParams.pagination;
        setIsLoading(true);
        const response = await apiInvoice.getAllExtend('/of-manger', {
          offset: (current - 1) * pageSize,
          limit: pageSize,
        });
        if (response?.status) {
          setInvoices(response.data.data);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: response.data.count,
            },
          });
        }
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    };

    fetchInvoices();
  }, [JSON.stringify(tableParams), modal]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
  ) => {
    setTableParams({
      pagination,
      filters,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setInvoices([]);
    }
  };

  const handleDeleteInvoice = async (invoice: InvoiceEntity) => {
    try {
      const response = await apiInvoice.deleteById(invoice.id);
      if (response.success) {
        notification.success({ message: t('invoice.delete.success') });
        // trick for delete invoice in UI but not reFetch data from server
        setInvoices(invoices.filter((item) => item.id !== invoice.id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns: ColumnsType<InvoiceEntity> = [
    {
      dataIndex: 'id',
      title: 'id',
      width: 30,
      render: (_, record) => <p>#{record.id}</p>,
    },
    {
      dataIndex: 'room',
      title: 'room',
      render: (_, record) => <p>{record.room?.name}</p>,
    },
    {
      dataIndex: 'dueDate',
      title: 'Due date',
      render: (_, record) => (
        <p>{dayjs(record.dueDate).format('DD/MM/YYYY')}</p>
      ),
    },
    {
      dataIndex: 'status',
      title: 'Status',
      render: (_, record) => {
        switch (record.status) {
          case 'PENDING':
            return (
              <Status color="yellow" message={t('invoice.status.PENDING')} />
            );
          case 'PAID':
            return <Status color="green" message={t('invoice.status.PAID')} />;
          case 'OVERDUE':
            return <Status color="red" message={t('invoice.status.OVERDUE')} />;
          default:
            return (
              <Status color="green" message={t('invoice.status.OVERDUE')} />
            );
        }
      },
    },
    {
      dataIndex: 'total',
      title: 'Total',
      render: (_, record) => <p>{record.total.toLocaleString()} VND</p>,
    },
    {
      dataIndex: 'type',
      title: 'Invoice type',
      render: (_, render) => (
        <p>
          {invoiceTypes.find((type) => type.id === render.invoiceTypeId)?.name}
        </p>
      ),
    },
    {
      title: t('common.action'),
      dataIndex: 'operation',
      render: (_, record) => (
        <Space>
          <p
            className="hover:cursor-pointer hover:text-green-500"
            onClick={() => {
              dispatch(modalActions.setIsOpen(true));
              dispatch(invoiceActions.selected(record));
            }}
          >
            {t('common.edit')}
          </p>
          <Popconfirm
            title={t('invoice.delete.title')}
            description={t('common.confirmDelete')}
            onConfirm={() => handleDeleteInvoice(record)}
          >
            <p className="hover:cursor-pointer hover:text-red-600">
              {t('common.delete')}
            </p>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end p-2">
        <Button
          type="primary"
          onClick={() => dispatch(modalActions.setIsOpen(true))}
        >
          <FaPlus color={'white'} size={20} />
        </Button>
      </div>
      <Table
        bordered={true}
        rowKey={'id'}
        columns={columns}
        dataSource={invoices}
        loading={isLoading}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </div>
  );
}
