import { UserEntity } from '.';

export type VoteType = 'ROOM' | 'USER';

export interface VoteEntity {
  id: number;
  voterId: number;
  voter: UserEntity;
  type: VoteType;
  targetId: number;
  star: number;
  comment: string;
}
