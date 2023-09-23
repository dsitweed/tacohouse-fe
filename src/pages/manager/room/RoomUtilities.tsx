import { List } from 'antd';

export default function RoomUtilities() {
  return (
    <List
      itemLayout="horizontal"
      dataSource={[
        {
          title: 'Fridge',
          status: true,
        },
        {
          title: 'Air conditioner',
          status: true,
        },
        {
          title: 'Electric water heater',
          status: true,
        },
        {
          title: 'Washing machine',
          status: false,
        },
      ]}
      renderItem={(item, index) => (
        <List.Item key={`room-utilities-${index}`}>
          <List.Item.Meta title={item.title} />
          {item.status ? (
            <p className="font-bold text-light-green">Have</p>
          ) : (
            <p className="text-red-400">Not have</p>
          )}
        </List.Item>
      )}
    />
  );
}
