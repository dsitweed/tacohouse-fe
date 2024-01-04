import { RoomEntity, getFullUserName } from '@/models';
import { VoteEntity, VoteType } from '@/models/Vote.entity';
import { ROOMS_PATH, VOTES_PATH } from '@/routes/routeNames';
import { useApiClient } from '@/shared/hooks/api';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/auth.slice';
import {
  Card,
  Typography,
  Space,
  Rate,
  Avatar,
  Divider,
  Input,
  Button,
  Form,
  App,
} from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  type: VoteType;
  targetId: number;
}

export default function ReviewPane({ type, targetId }: Props) {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const currentUser = useAppSelector(selectUser);

  const apiVote = useApiClient(VOTES_PATH);
  const apiRoom = useApiClient(ROOMS_PATH);
  const [form] = Form.useForm();
  const [votes, setVotes] = useState<VoteEntity[]>([]);
  const [isHavePermission, setIsHavePermission] = useState(false);

  useEffect(() => {
    const fetchVote = async () => {
      const response = await apiVote.getAll({
        targetId: targetId,
        type: type,
      });
      if (response?.success) {
        setVotes(response.data.data);
      }
    };

    const fetchPermission = async () => {
      if (type === 'ROOM') {
        const response = await apiRoom.getById(targetId);
        const room: RoomEntity = response?.data.data;

        if (room?.building?.ownerId === currentUser?.id) {
          setIsHavePermission(false);
        } else {
          setIsHavePermission(true);
        }
      }
    };

    fetchVote();
    fetchPermission();
  }, []);

  const averageStar = useMemo(() => {
    let sum = 0;
    votes.forEach((vote) => (sum += Number(vote.star)));
    const average = Math.round((sum / votes.length) * 10) / 10;
    return average || 0;
  }, [votes]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreate = async (values: any) => {
    const { star, comment } = values;
    const response = await apiVote.create({
      targetId: targetId,
      type: type,
      star: star,
      comment: comment,
    });

    if (response?.success) {
      notification.success({ message: 'Đã comment thành công' });
      // Add new created vote -> votes
      const newVote: VoteEntity = response.data.data;
      if (currentUser) {
        newVote.voter = currentUser; // add info of voter = currentUser
      }
      const newVotes = [...votes, newVote].sort(
        (a: VoteEntity, b: VoteEntity) => (a.star < b.star ? 1 : -1), // sort desc (default db also desc sort)
      );
      setVotes(newVotes);

      form.resetFields();
    }
  };

  return (
    <Card>
      {/* Overview */}
      <div className="mb-5 flex flex-col gap-2">
        <Typography className="text-2xl font-semibold">
          {votes.length} Reviews
        </Typography>
        <Space>
          <Typography className="text-2xl">{averageStar}</Typography>{' '}
          <Rate disabled allowHalf value={averageStar} />
        </Space>
      </div>
      {/* All comments */}
      <div className="space-y-4">
        {votes.map((vote) => (
          <div key={`vote-room${targetId}-${vote.id}`} className="flex gap-4">
            <div>
              <Avatar size={64} src={vote.voter?.avatarUrl} />
            </div>
            <div>
              <Space>
                <span className="font-bold text-sm">
                  {getFullUserName(vote.voter)}
                </span>
                <Rate disabled allowHalf value={Number(vote.star)} />
              </Space>
              <Typography.Paragraph
                ellipsis={{
                  rows: 3,
                }}
              >
                {vote.comment}
              </Typography.Paragraph>
            </div>
          </div>
        ))}
      </div>
      <Divider className="border" />
      {/* Create new comment */}
      {isHavePermission && (
        <div>
          <Typography.Title level={4}>Write a Review</Typography.Title>
          <Form form={form} layout="vertical" onFinish={handleCreate}>
            <div className="flex items-center mb-4 gap-4">
              <Form.Item
                name="star"
                className="mb-0"
                rules={[
                  {
                    required: true,
                    message: t('common.requiredTrue'),
                  },
                ]}
              >
                <Rate allowHalf />
              </Form.Item>
              <p>Your Rating & Review</p>
            </div>
            <Form.Item
              name="comment"
              rules={[
                {
                  required: true,
                  message: t('common.requiredTrue'),
                },
              ]}
            >
              <Input.TextArea placeholder="Your Review" rows={4} />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className="flex items-center text-base p-5"
            >
              Submit preview
            </Button>
          </Form>
        </div>
      )}
    </Card>
  );
}
