import { Room } from '../room/room.entyty';

export class DtoProfile {
  id?: string;
  email?: string;
  password?: string;
  username?: string;
  fullname?: string;
  avatar?: string;
  isActive?: boolean;
  phone?: string;
  code?: string;
  rooms?: Room[];
  created_at?: Date;
  updated_at?: Date;
}
