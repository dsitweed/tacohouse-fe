import { UserEntity } from '.';

export interface MessageEntity {
  id: number;
  senderId: number;
  sender?: UserEntity;
  receiverId: number;
  receiver?: UserEntity;
  content: string;

  createdAt: string;
  updatedAt: string;
}
