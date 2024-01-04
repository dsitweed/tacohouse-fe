import { getFullUserName } from '@/models';
import { useAppSelector } from '@/store/hooks';
import { Avatar, Empty, Input } from 'antd';
import cn from 'classnames';
import { FaPhoneAlt, FaVideo } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';

const listMessage = [
  {
    id: 1,
    content: 'Hello',
    createdAt: 1,
    senderId: 1,
    receiverId: 2,
  },
  {
    id: 2,
    content: 'Hello',
    createdAt: 3,
    senderId: 2,
    receiverId: 3,
  },
  {
    id: 3,
    content:
      'Hello12333333333333333333333333 333333333333333333333333333333333333333333 33333333333333333333333 3333333333333333333',
    createdAt: 2,
    senderId: 1,
    receiverId: 2,
  },
  {
    id: 4,
    content: 'Hello',
    createdAt: 4,
    senderId: 1,
    receiverId: 2,
  },
];

export default function ChatBox() {
  const currentPartner = useAppSelector((state) => state.message.partner);

  if (!currentPartner) {
    return (
      <div className="h-full border-x flex justify-center items-center">
        <Empty />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col justify-between p-2 border-x">
      <div>
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Avatar src={currentPartner.avatarUrl} size={50} />
            <span>
              <p className="font-bold text-base">
                {getFullUserName(currentPartner)}
              </p>
              <p className="text-gray-700">Đang họat động</p>
            </span>
          </div>
          <div className="flex gap-3 ">
            <FaPhoneAlt size={20} className="hover:cursor-pointer" />
            <FaVideo size={20} className="hover:cursor-pointer" />
          </div>
        </div>
        {/* Chat area */}
        <div className="space-y-1">
          {listMessage.map((message) => (
            <div
              key={`message-${message.id}-${message.receiverId}`}
              className={cn(
                'flex gap-1',
                message.senderId === 1 && 'justify-end',
              )}
            >
              {message.senderId !== 1 && (
                <Avatar src={currentPartner.avatarUrl} size={32} />
              )}
              <p className="bg-primary-container px-2 py-1 rounded-lg max-w-xl flex-wrap">
                {message.content}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Input message area */}
      <Input suffix={<IoSend size={18} />} className="h-10" />
    </div>
  );
}
