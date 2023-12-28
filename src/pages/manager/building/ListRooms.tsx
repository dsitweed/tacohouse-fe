/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFullUserName } from '@/models';
import { InvoiceEntity } from '@/models/Invoice.entity';
import { RoomEntity } from '@/models/Room.entity';
import {
  INVOICES_PATH,
  MANAGERS_PATH,
  ROOM_UNIT_PRICES_PATH,
  routes,
} from '@/routes/routeNames';
import { useApiClient } from '@/shared/hooks/api';
import {
  App,
  Button,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { Excel } from 'antd-table-saveas-excel';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ColumnsType } from 'antd/es/table';
import { FaDownload } from 'react-icons/fa';
import { IoPrint } from 'react-icons/io5';
import { useReactToPrint } from 'react-to-print';

interface ListRoomsProps {
  buildingId: number;
  buildingName: string;
}

interface RoomEntityExtend extends RoomEntity {
  invoice: InvoiceEntity;

  currentElectricity: number;
  beforeElectricity: number;
  electricityPrice: number;
  totalElectricity: number;
  waterPrice: number;
  wifiPrice: number;
  lightPrice: number;
  environmentPrice: number;

  total: number;
  status: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: RoomEntity;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  record,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

/**
 * Return view of list all rooms of specific Building
 */
export default function ListRooms({
  buildingId,
  buildingName,
}: ListRoomsProps) {
  const { notification } = App.useApp();
  const apiManager = useApiClient(MANAGERS_PATH);
  const apiRoomUnitPrice = useApiClient(ROOM_UNIT_PRICES_PATH);
  const apiInvoice = useApiClient(INVOICES_PATH);
  const { t } = useTranslation();

  const [rooms, setRooms] = useState<RoomEntityExtend[]>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const printComponentRef = useRef<HTMLDivElement>(null);

  // GET FIRST TIME DATA
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiManager.getAllExtend('/rooms', {
        buildingId: buildingId,
      });

      if (response && response.status === 200) {
        const rawListRoom = response.data.data;
        rawListRoom.forEach((room: RoomEntityExtend, index) => {
          rawListRoom[index] = calculateRoomCharge(room);
        });

        // Update data -> UI
        setRooms(rawListRoom);
      }
    };

    fetchData();
  }, []);

  const isEditing = (record: RoomEntity) => String(record.id) === editingKey;

  const edit = (record: Partial<RoomEntity> & { id: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(String(record.id));
  };

  const cancel = () => {
    setEditingKey('');
  };

  const updateElectricity = async (
    electricityId: number,
    before: number,
    current: number,
  ) => {
    try {
      await apiRoomUnitPrice.update(electricityId, {
        before: before,
        current: current,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as RoomEntityExtend;

      const newData = [...rooms];
      const index = newData.findIndex((item) => key === item.id);
      if (index === -1) {
        newData.push(row);
        setRooms(newData);
        setEditingKey('');
        return;
      }

      const item = newData[index];
      const newRow = {
        ...item, // old data
        ...row, // new data
      };

      const { currentElectricity, beforeElectricity, debt } = row;
      const newRowReCalculate = calculateRoomCharge(
        newRow,
        currentElectricity,
        beforeElectricity,
        debt,
      );

      /* UPDATE DATA TO DATABASE */
      const electricity = newRowReCalculate.roomUnitPrices.find(
        (item) => item.buildingUnitPrice.name === 'electricity',
      );

      if (!electricity) {
        cancel();
        return;
      }

      // UPDATE ELECTRICITY
      await updateElectricity(
        electricity.id,
        beforeElectricity,
        currentElectricity,
      );

      let updatedInvoice;

      // UPDATE INVOICE
      if (newRowReCalculate.invoice === null) {
        updatedInvoice = await apiInvoice.createExtend(
          `/${newRowReCalculate.id}/current-month`,
          {
            total: newRowReCalculate.total,
            tenantIds: newRowReCalculate.tenants.map((tenant) => tenant.id),
            roomId: newRowReCalculate.id,
            buildingId: newRowReCalculate.buildingId,
          },
        );
      } else {
        updatedInvoice = await axios.patch(
          `${INVOICES_PATH}/${newRowReCalculate.id}/current-month`,
          {
            total: newRowReCalculate.total,
          },
        );
      }

      if (updatedInvoice?.success) {
        notification.success({ message: 'Cập nhật thành công' });

        newRowReCalculate.invoice = updatedInvoice.data.data; // update invoice info
        // UPDATE NEWEST DATA
        newData.splice(index, 1, {
          ...newRowReCalculate,
        });
        setRooms(newData);
      }

      setEditingKey('');
    } catch (errInfo) {
      console.error('Validate Failed: ', errInfo);
    }
  };

  const calculateRoomCharge = (
    room: RoomEntityExtend,
    currentElectricity?: number,
    beforeElectricity?: number,
    debt?: number,
  ) => {
    const electricity = room.roomUnitPrices.find(
      (item) => item.buildingUnitPrice.name === 'electricity',
    );

    room.currentElectricity = currentElectricity || electricity?.current || 0;
    room.beforeElectricity = beforeElectricity || electricity?.before || 0;
    room.electricityPrice = electricity?.buildingUnitPrice.price || 0;

    room.totalElectricity =
      (room.currentElectricity - room.beforeElectricity) *
      room.electricityPrice;

    const water = room.roomUnitPrices.find(
      (item) => item.buildingUnitPrice.name === 'water',
    );
    const wifi = room.roomUnitPrices.find(
      (item) => item.buildingUnitPrice.name === 'wifi',
    );
    const light = room.roomUnitPrices.find(
      (item) => item.buildingUnitPrice.name === 'light',
    );
    const environment = room.roomUnitPrices.find(
      (item) => item.buildingUnitPrice.name === 'environment',
    );

    room.waterPrice =
      room.tenants.length * (water?.buildingUnitPrice.price || 0);
    room.wifiPrice = wifi?.buildingUnitPrice.price || 0;
    room.lightPrice = light?.buildingUnitPrice.price || 0;
    room.environmentPrice =
      room.tenants.length * (environment?.buildingUnitPrice.price || 0);
    room.debt = debt || room?.debt || 0;

    room.total =
      room.price +
      room.totalElectricity +
      room.waterPrice +
      room.wifiPrice +
      room.lightPrice +
      room.environmentPrice +
      room.debt;

    return room;
  };

  const roomsTableColumns = [
    {
      title: t('listRooms.table.room'),
      dataIndex: 'name',
      render: (roomName: string, record: RoomEntityExtend) => (
        <Link to={`${routes.managers.rooms.index}/${record.id}`}>
          {roomName}
        </Link>
      ),
    },
    {
      title: t('listRooms.table.tenants'),
      className: 'w-40 text-wrap',
      dataIndex: 'tenantsName',
      render: (_: any, record: RoomEntityExtend) => {
        const list: string[] = [];
        record.tenants.forEach((item) => list.push(getFullUserName(item)));
        return (
          <div className="flex flex-col">
            {list.map((item, index) => (
              <div key={`tenantName-${index}`}>{item}</div>
            ))}
          </div>
        );
      },
    },
    {
      title: t('listRooms.table.roomPrice'),
      dataIndex: 'price',
      render: (_: any, record: RoomEntityExtend) => (
        <p>{record.price?.toLocaleString()}</p>
      ),
    },
    {
      title: t('listRooms.table.currentElectricity'),
      className: 'w-20 text-wrap',
      dataIndex: 'currentElectricity',
      editable: true,
      render: (value: number) => {
        return value.toLocaleString();
      },
    },
    {
      title: t('listRooms.table.beforeElectricity'),
      className: 'w-20 text-wrap',
      dataIndex: 'beforeElectricity',
      editable: true,
      render: (value: number) => {
        return value.toLocaleString();
      },
    },
    {
      title: t('listRooms.table.electricityPrice'),
      className: 'w-20 text-wrap',
      dataIndex: 'electricityPrice',
      render: (value: number) => {
        return `${value.toLocaleString()}`;
      },
    },
    {
      title: t('listRooms.table.totalElectricityFee'),
      className: 'w-45 text-wrap',
      dataIndex: 'totalElectricity',
      render: (_: any, record: RoomEntityExtend) => {
        return `${(
          record.currentElectricity - record.beforeElectricity
        ).toLocaleString()} x ${record.electricityPrice.toLocaleString()} = ${record.totalElectricity.toLocaleString()}`;
      },
    },

    {
      title: t('listRooms.table.waterFee'),
      className: 'w-20 text-wrap',
      dataIndex: 'waterPrice',
      render: (_: any, record: RoomEntityExtend) => {
        return `${record.waterPrice.toLocaleString()}`;
      },
    },
    {
      title: t('listRooms.table.wifiFee'),
      className: 'w-20 text-wrap',
      dataIndex: 'wifiPrice',
      render: (_: any, record: RoomEntityExtend) => {
        return `${record.wifiPrice.toLocaleString()}`;
      },
    },
    {
      title: t('listRooms.table.lightFee'),
      className: 'w-20 text-wrap',
      dataIndex: 'lightPrice',
      render: (_: any, record: RoomEntityExtend) => {
        return `${record.lightPrice.toLocaleString()}`;
      },
    },
    {
      title: t('listRooms.table.environmentFee'),
      className: 'w-20 text-wrap',
      dataIndex: 'environmentPrice',
      render: (_: any, record: RoomEntityExtend) => {
        return `${record.environmentPrice.toLocaleString()}`;
      },
    },
    {
      title: t('listRooms.table.debt'),
      className: 'w-20 text-wrap',
      dataIndex: 'debt',
      editable: true,
      render: (_: any, record: RoomEntityExtend) => (
        <p>{record.debt?.toLocaleString() || 0}</p>
      ),
    },
    {
      title: t('listRooms.table.deposit'),
      className: 'w-20 text-wrap',
      dataIndex: 'deposit',
      render: (_: any, record: RoomEntityExtend) => (
        <p>{record.deposit?.toLocaleString() || 0}</p>
      ),
    },
    {
      title: (
        <Tooltip title={t('listRooms.table.totalMoneyToolTipTitle')}>
          {t('listRooms.table.totalMoney')}
        </Tooltip>
      ),
      __excelTitle__: t('listRooms.table.totalMoney'),
      className: 'w-20 text-wrap',
      dataIndex: 'total',
      render: (_: any, record: RoomEntityExtend) =>
        record.invoice?.total.toLocaleString() ?? (
          <Tooltip title={t('listRooms.table.totalMoneyToolTipTitle')}>
            0
          </Tooltip>
        ),
    },
    {
      title: t('listRooms.table.paid'),
      className: 'w-25 text-wrap',
      dataIndex: 'paid',
      render: (_: any, record: RoomEntityExtend) =>
        record.invoice?.status ?? (
          <Tooltip title={t('listRooms.table.paidToolTipTitle')}>
            {t('listRooms.table.paidToolTip')}
          </Tooltip>
        ),
    },
    {
      title: t('listRooms.table.operation'),
      dataIndex: 'operation',
      render: (_: any, record: RoomEntityExtend) => {
        const editable = isEditing(record);

        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              {t('common.save')}
            </Typography.Link>
            <Popconfirm
              title={t('common.cancelToolTipTitle')}
              onConfirm={cancel}
            >
              <a>{t('common.cancel')}</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            {t('common.edit')}
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = roomsTableColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: RoomEntityExtend) => ({
        record,
        inputType: 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  }) as ColumnsType<RoomEntityExtend>;

  const handleExport = (type: 'fully' | 'brief') => {
    const excel = new Excel();
    let columns = roomsTableColumns; // to add type -> to avoid error when use function addColumns below
    switch (type) {
      case 'fully':
        roomsTableColumns.filter((item) =>
          ['name', 'tenantsName', 'total'].includes(item.dataIndex),
        ),
          (columns = roomsTableColumns.filter(
            (item) => !['operation'].includes(item.dataIndex),
          ));
        break;
      case 'brief':
        columns = roomsTableColumns.filter((item) =>
          ['name', 'tenantsName', 'total'].includes(item.dataIndex),
        );
        break;
      default:
        columns = roomsTableColumns;
        break;
    }

    excel
      .addSheet(buildingName)
      .addColumns(columns)
      .addDataSource(rooms, {
        str2num: true,
        str2Percent: true,
      })
      .saveAs(`${buildingName}-${type}.xlsx`);
  };

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
    documentTitle: `${buildingName}`,
  });

  return (
    <div className="overflow-auto space-y-4">
      <div className="flex justify-end gap-2">
        <Dropdown
          menu={{
            items: [
              {
                label: 'Tải bản rút gọn',
                key: 'excel-brief',
                icon: <FaDownload />,
                onClick: () => handleExport('brief'),
              },
              {
                label: 'Tải đầy đủ',
                key: 'excel-fully',
                icon: <FaDownload />,
                onClick: () => handleExport('fully'),
              },
            ],
          }}
        >
          <Button icon={<FaDownload />} className="text-orange-600">
            Tải file excel
          </Button>
        </Dropdown>
        <Button
          icon={<IoPrint size={18} />}
          type="primary"
          className="flex"
          onClick={handlePrint}
        >
          In bản đầy đủ
        </Button>
      </div>
      <Form form={form} component={false} className="overflow-auto">
        <div ref={printComponentRef}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            size="small"
            rowKey={'id'}
            rowClassName="editable-row"
            columns={mergedColumns}
            dataSource={rooms}
            className="w-full"
          />
        </div>
      </Form>
    </div>
  );
}
