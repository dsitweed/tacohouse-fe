/* eslint-disable @typescript-eslint/no-explicit-any */
import { BuildingUnitPriceEntity } from '@/models/BuildingUnitPriceEntity';
import { RoomEntity } from '@/models/Room.entity';
import { BUILDING_UNIT_PRICES_PATH, ROOMS_PATH } from '@/routes/routeNames';
import { useApiClient } from '@/shared/hooks/api';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';

interface ListRoomsProps {
  buildingId: number;
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
  const apiRoom = useApiClient(ROOMS_PATH);
  const apiBuildingUnitPrice = useApiClient(BUILDING_UNIT_PRICES_PATH);
  const [rooms, setRooms] = useState<RoomEntity[]>([]);
  const [buildingUnitPrices, setBuildingUnitPrices] =
    useState<BuildingUnitPriceEntity[]>();

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  // GET FIRST TIME DATA
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiRoom.getAll({
        buildingId: props.buildingId,
      });

      if (response && response.status === 200) {
        setRooms(response.data.data);
      }
    };

    const fetchBuildingUnitPrices = async () => {
      const response = await apiBuildingUnitPrice.getAll({
        buildingId: props.buildingId,
      });
      if (response && response.status === 200) {
        setBuildingUnitPrices(response.data.data);
      }
    };

    fetchData();
    fetchBuildingUnitPrices();
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
      const row = (await form.validateFields()) as RoomEntity;

      const newData = [...rooms];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        setRooms(newData);
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

  const roomsTableColumns = [
    {
      title: 'Room',
      dataIndex: 'name',
    },
    {
      title: 'Tenants',
      dataIndex: 'tenantName',
      render: (_: any, record: RoomEntity) => {
        let label = '';
        record.tenants.forEach(
          (item) =>
            (label = label + item.lastName + ' ' + item.firstName + '\n'),
        );
        return label;
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
      dataIndex: 'current_electricity',
      editable: true,
      render: (_: any, record: RoomEntity) => (
        <p>{record.current_electricity?.toLocaleString()}</p>
      ),
    },
    {
      title: (
        <span>
          Previous
          <br />
          electricity
        </span>
      ),
      dataIndex: 'previous_electricity',
      editable: true,
      render: (_: any, record: RoomEntity) => (
        <p>{record.previous_electricity?.toLocaleString()}</p>
      ),
    },
    {
      title: (
        <span>
          Total
          <br />
          electricity
        </span>
      ),
      dataIndex: 'total_electricity',
      render: (_: any, record: RoomEntity) => {
        const consume =
          record.current_electricity - record.previous_electricity;
        return <p>{consume?.toLocaleString()}</p>;
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
      dataIndex: 'electricity_price',
      render: () => (
        <p>
          {buildingUnitPrices
            ?.find((item) => item.name === 'electricity')
            ?.price.toLocaleString()}
        </p>
      ),
    },
    {
      title: (
        <span>
          Electricity
          <br />
          fee
        </span>
      ),
      dataIndex: 'electricity_fee',
      render: (_: any, record: RoomEntity) => {
        const totalCost =
          (record.current_electricity - record.previous_electricity) *
          record.electricity_price;
        return <p>{totalCost?.toLocaleString()}</p>;
      },
    },
    {
      title: (
        <span>
          Water
          <br />
          price
        </span>
      ),
      dataIndex: 'water_price',
      editable: true,
      render: (_: any, record: RoomEntity) => (
        <p>
          {buildingUnitPrices
            ?.find((item) => item.name === 'water')
            ?.price.toLocaleString()}
        </p>
      ),
    },
    {
      title: (
        <span>
          Wifi
          <br />
          price
        </span>
      ),
      dataIndex: 'wifi_price',
      editable: true,
      render: (_: any, record: RoomEntity) => (
        <p>
          {buildingUnitPrices
            ?.find((item) => item.name === 'wifi')
            ?.price.toLocaleString()}
        </p>
      ),
    },
    {
      title: (
        <span>
          Light
          <br />
          price
        </span>
      ),
      dataIndex: 'light_price',
      render: (_: any, record: RoomEntity) => (
        <p>
          {buildingUnitPrices
            ?.find((item) => item.name === 'light')
            ?.price.toLocaleString()}
        </p>
      ),
    },
    {
      title: (
        <span>
          Environ
          <br />
          price
        </span>
      ),
      dataIndex: 'environment_price',
      editable: true,
      render: (_: any, record: RoomEntity) => (
        <p>
          {buildingUnitPrices
            ?.find((item) => item.name === 'environment')
            ?.price.toLocaleString()}
        </p>
      ),
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
      title: 'Total money',
      dataIndex: 'environment_price',
      render: (_) => <p>0</p>,
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      render: (_: any, record: RoomEntity) => (
        <p>{record.paid ? 'Paid' : 'Pending'}</p>
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
          columns={mergedColumns}
          dataSource={rooms}
          className="w-full"
        />
      </Form>
    </div>
  );
}
