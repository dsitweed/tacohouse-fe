import { Row, Col, Typography, Rate, Card, Avatar } from 'antd';
import { BsFacebook } from 'react-icons/bs';

import avatar from '@/assets/images/avatar.jpg';

const listComments = [
  {
    rate: 4.6,
    comment:
      'Pharetra ut commodo dui at consequat, vitae imperdiet id quisque faucibus erat erat nulla a amet.',
    user: {
      name: 'MORGAN JONATHAN',
      avatar: avatar,
    },
  },
  {
    rate: 5,
    comment:
      'Proin nulla mauris et volutpat adipiscing suspendisse vehicula blandit sagittis orci etiam morbi elit etiam semper eu blandit sagittis orci etiam morbi elit etiam semper eu lacus pretium hac nisl leo amet ullamcorper.',
    user: {
      name: 'EMILY HUNT',
      avatar: avatar,
    },
  },
  {
    rate: 5,
    comment:
      'Proin nulla mauris et volutpat adipiscing suspendisse vehicula blandit sagittis orci etiam morbi elit etiam semper eu blandit sagittis orci etiam morbi elit etiam semper eu lacus pretium hac nisl leo amet ullamcorper.',
    user: {
      name: 'EMILY HUNT',
      avatar: avatar,
    },
  },
  {
    rate: 5,
    comment:
      'Proin nulla mauris et volutpat adipiscing suspendisse vehicula blandit sagittis orci etiam morbi elit etiam semper eu blandit sagittis orci etiam morbi elit etiam semper eu lacus pretium hac nisl leo amet ullamcorper.\
      Proin nulla mauris et volutpat adipiscing suspendisse vehicula blandit sagittis      Proin nulla mauris et volutpat adipiscing suspendisse vehicula blandit sagittis orci etiam morbi elit etiam semper eu blandit sagittis orci etiam morbi elit etiam semper eu lacus pretium hac nisl leo amet ullamcorper. orci etiam morbi elit etiam semper eu blandit sagittis orci etiam morbi elit etiam semper eu lacus pretium hac nisl leo amet ullamcorper.',
    user: {
      name: 'EMILY HUNT',
      avatar: avatar,
    },
  },
  {
    rate: 3.5,
    comment:
      'Proin nulla mauris et volutpat adipiscing suspendisse vehicula blandit sagittis orci etiam morbi elit etiam semper eu blandit sagittis orci etiam morbi elit etiam semper eu lacus pretium hac nisl leo amet ullamcorper.',
    user: {
      name: 'EMILY HUNT',
      avatar: avatar,
    },
  },
];

export default function Review() {
  return (
    <Row gutter={[24, 24]}>
      <Col xl={12} md={24}>
        <Typography className="text-4xl">What Our Guests Say</Typography>
      </Col>
      <Col xl={12} md={24}>
        <div className="flex">
          <div className="mr-20">
            <Typography className="text-4xl font-bold">{4.6}</Typography>
            <Typography>Out of 5</Typography>
            <Rate disabled allowHalf defaultValue={4.5} />
          </div>
          <div className="pt-2">
            <Typography className="flex gap-3">
              <BsFacebook size={18} />
              <span>1500 Likes</span>
            </Typography>
          </div>
        </div>
      </Col>
      {/* LIST COMMENTS */}
      {listComments.map((item) => (
        <Col sm={24} lg={12}>
          <Card title={<Rate disabled allowHalf defaultValue={item.rate} />}>
            <Typography.Paragraph>{item.comment}</Typography.Paragraph>
            <span>
              <Avatar src={item.user.avatar} className="mr-2" />{' '}
              {item.user.name}
            </span>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
