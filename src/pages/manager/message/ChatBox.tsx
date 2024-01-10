import { getFullUserName } from '@/models';
import { MessageEntity } from '@/models/Messge.entity';
import { newSocket } from '@/plugins/socketio';
import { useAppSelector } from '@/store/hooks';
import { Avatar, Button, Empty, Form, Input, Space } from 'antd';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { FaPhoneAlt, FaVideo } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { Socket } from 'socket.io-client';
import { getUniqueRoomName } from '@/shared/utils';

export default function ChatBox() {
  const [form] = Form.useForm();
  const currentPartner = useAppSelector((state) => state.message.partner);
  const currentUser = useAppSelector((state) => state.auth.user);
  const [error, setError] = useState<Error | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<MessageEntity[]>([]);

  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onConnect = () => {
      setSocket(sock);
    };
    const onDisconnect = () => {
      setSocket(null);
    };
    const onConnectError = (error: Error) => {
      setError(error);
      console.error(error);
    };

    const sock = newSocket();
    sock.connect();
    sock.on('connect', onConnect);
    sock.on('disconnect', onDisconnect);
    sock.on('connect_error', onConnectError);

    return () => {
      // cleanup: remove all listeners
      sock.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !currentPartner || !currentUser) return;
    const fetchMessages = async () => {
      const response = await socket.emitWithAck('getMessages', {
        partnerId: currentPartner.id,
        limit: 100,
        offset: 0,
      });

      setMessages(response.data);
    };

    const roomName = getUniqueRoomName(currentPartner.id, currentUser.id);
    socket.on(`createMessage_to_${roomName}`, (data) => {
      setMessages((prev) => [...prev, data]);
      form.resetFields();
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    fetchMessages();
  }, [currentPartner, socket]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSendMessage = async (values: any) => {
    if (!socket || !currentPartner) return;
    const { message } = values;
    try {
      await socket.emitWithAck(`createMessage`, {
        content: message,
        receiverId: currentPartner.id,
        // contentType: 'TEXT',
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!currentPartner) {
    return (
      <div className="h-full border-x flex justify-center items-center">
        <Empty />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center p-12">
        {error.message}
      </div>
    );
  }

  return (
    <div className="h-full p-2 flex flex-col border-x">
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
      <div className="flex-1 overflow-y-scroll scrollbar">
        <div className="space-y-1 m-2">
          {messages.map((message) => (
            <div
              key={`message-${message.id}-${message.receiverId}`}
              className={cn(
                'flex gap-1',
                message.senderId !== currentPartner.id && 'justify-end',
              )}
            >
              {message.senderId === currentPartner.id && (
                <Avatar src={currentPartner.avatarUrl} size={32} />
              )}
              <p className="bg-primary-container px-2 py-1 rounded-lg max-w-xl flex-wrap overflow-hidden">
                {message.content}
              </p>
            </div>
          ))}
          <div ref={lastMessageRef} />
        </div>
      </div>
      {/* Input message area */}
      <Form form={form} onFinish={handleSendMessage}>
        <Form.Item name="message" className="m-0">
          <Space.Compact className="w-full">
            <Input className="h-10" />
            <Button type="primary" htmlType="submit" className="h-10">
              <IoSend size={20} />
            </Button>
          </Space.Compact>
        </Form.Item>
      </Form>
    </div>
  );
}
