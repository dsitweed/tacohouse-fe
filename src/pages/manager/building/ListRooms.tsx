/* eslint-disable @typescript-eslint/no-explicit-any */
import { InvoiceEntity } from '@/models/Invoice.entity';
import { RoomEntity } from '@/models/Room.entity';
import {
  INVOICES_PATH,
  MANAGERS_PATH,
  ROOM_UNIT_PRICES_PATH,
} from '@/routes/routeNames';
import { useApiClient } from '@/shared/hooks/api';
import {
  App,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface ListRoomsProps {
  buildingId: number;
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
export default function ListRooms(props: ListRoomsProps) {
  const { notification } = App.useApp();
  const apiManager = useApiClient(MANAGERS_PATH);
  const apiRoomUnitPrice = useApiClient(ROOM_UNIT_PRICES_PATH);
  const apiInvoice = useApiClient(INVOICES_PATH);
  const [rooms, setRooms] = useState<RoomEntityExtend[]>([]);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  // GET FIRST TIME DATA
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiManager.getAllExtend('/rooms', {
        buildingId: props.buildingId,
      });

      if (response && response.status === 200) {
        const rawListRoom = response.data.data;
        for (let index = 0; index < rawListRoom.length; index++) {
          const room = rawListRoom[index] as RoomEntityExtend;
          rawListRoom[index] = calculateRoomCharge(room);
        }

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

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as RoomEntityExtend;

      const newData = [...rooms];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
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
        const thisRoomData = newData[index];

        const electricity = thisRoomData.roomUnitPrices.find(
          (item) => item.buildingUnitPrice.name === 'electricity',
        );

        if (!electricity) {
          cancel();
          return;
        }

        // UPDATE ELECTRICITY
        let response = await apiRoomUnitPrice.update(electricity.id, {
          before: beforeElectricity,
          current: currentElectricity,
        });

        // UPDATE INVOICE
        if (thisRoomData.invoice === null) {
          response = await apiInvoice.createExtend(
            `/${thisRoomData.id}/current-month`,
            {
              total: thisRoomData.total,
              roomId: thisRoomData.id,
              buildingId: thisRoomData.buildingId,
            },
          );
        } else {
          response = await axios.patch(
            `${INVOICES_PATH}/${thisRoomData.id}/current-month`,
            {
              total: thisRoomData.total,
            },
          );
        }

        if (response?.success) {
          notification.success({ message: 'Cập nhật thành công' });

          newRowReCalculate.invoice = response.data.data; // update invoice info
          // UPDATE NEWEST DATA
          newData.splice(index, 1, {
            ...newRowReCalculate,
          });
          setRooms(newData);
        }

        setEditingKey('');
      } else {
        newData.push(row);
        setRooms(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed: ', errInfo);
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

    room.currentElectricity =
      currentElectricity || Number(electricity?.current);
    room.beforeElectricity = beforeElectricity || Number(electricity?.before);
    room.electricityPrice = Number(electricity?.buildingUnitPrice.price);

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
      room.tenants.length * Number(water?.buildingUnitPrice.price);
    room.wifiPrice = Number(wifi?.buildingUnitPrice.price);
    room.lightPrice = Number(light?.buildingUnitPrice.price);
    room.environmentPrice =
      room.tenants.length * Number(environment?.buildingUnitPrice.price);
    room.debt = debt || Number(room.debt);

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
      title: 'Room',
      dataIndex: 'name',
    },
    {
      title: 'Tenants',
      dataIndex: 'tenantsName',
      render: (_: any, record: RoomEntity) => {
        const list: string[] = [];
        record.tenants.forEach((item) =>
          list.push(item.lastName + ' ' + item.firstName),
        );
        return (
          <div>
            {list.map((item, index) => (
              <div key={`tenantName-${index}`}>{item}</div>
            ))}
          </div>
        );
      },
    },
    {
      title: 'Room price',
      dataIndex: 'price',
      render: (_: any, record: RoomEntity) => (
        <p>{record.price?.toLocaleString()}</p>
      ),
    },
    {
      title: (
        <span>
          Current
          <br />
          electricity
        </span>
      ),
      dataIndex: 'currentElectricity',
      editable: true,
      render: (value: number) => {
        return value.toLocaleString();
      },
    },
    {
      title: (
        <span>
          Previous
          <br />
          electricity
        </span>
      ),
      dataIndex: 'beforeElectricity',
      editable: true,
      render: (value: number) => {
        return value.toLocaleString();
      },
    },
    {
      title: (
        <span>
          Electricity
          <br />
          price
        </span>
      ),
      dataIndex: 'electricityPrice',
      render: (value: number) => {
        return `${value.toLocaleString()}`;
      },
    },
    {
      title: <span>Total electricity fee</span>,
      dataIndex: 'totalElectricity',
      render: (_: any, record: RoomEntityExtend) => {
        return `${(
          record.currentElectricity - record.beforeElectricity
        ).toLocaleString()} x ${record.electricityPrice.toLocaleString()} = ${record.totalElectricity.toLocaleString()}`;
      },
    },

    {
      title: (
        <span>
          Water
          <br />
          fee
        </span>
      ),
      dataIndex: 'waterPrice',
      render: (value: number) => {
        return `${value.toLocaleString()}`;
      },
    },
    {
      title: (
        <span>
          Wifi
          <br />
          fee
        </span>
      ),
      dataIndex: 'wifiPrice',
      render: (value: number) => {
        return `${value.toLocaleString()}`;
      },
    },
    {
      title: (
        <span>
          Light
          <br />
          fee
        </span>
      ),
      dataIndex: 'lightPrice',
      render: (value: number) => {
        return `${value.toLocaleString()}`;
      },
    },
    {
      title: (
        <span>
          Environ
          <br />
          price
        </span>
      ),
      dataIndex: 'environmentPrice',
      render: (value: number) => {
        return `${value.toLocaleString()}`;
      },
    },
    {
      title: (
        <span>
          Tenant's <br /> debt
        </span>
      ),
      dataIndex: 'debt',
      editable: true,
      render: (_: any, record: RoomEntity) => (
        <p>{record.debt?.toLocaleString() || 0}</p>
      ),
    },
    {
      title: 'Deposit',
      dataIndex: 'deposit',
      render: (_: any, record: RoomEntity) => (
        <p>{record.deposit?.toLocaleString() || 0}</p>
      ),
    },
    {
      title: (
        <Tooltip title="Nếu tổng tiền hiện 0. Hãy nhập tiền điện mới tháng này và lưu lại">
          Total money
        </Tooltip>
      ),
      dataIndex: 'total',
      render: (value: number) => <p>{value.toLocaleString()}</p>,
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      render: (_: any, record: RoomEntityExtend) => (
        <p>
          {record.invoice?.status || (
            <Tooltip title="Tháng này chưa có hóa đơn thuê phòng">
              Not have
            </Tooltip>
          )}
        </p>
      ),
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: RoomEntity) => {
        const editable = isEditing(record);

        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <br />
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            Edit
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
      onCell: (record: RoomEntity) => ({
        record,
        inputType: 'number',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  }) as ColumnsType<RoomEntity>;

  return (
    <div className=" overflow-auto">
      <Form form={form} component={false} className="overflow-auto">
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
      </Form>
    </div>
  );
}
