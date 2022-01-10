export class UserDto {
  id?: string;
  email?: string;
  password: string;
  username: string;
  fullname: string;
  avatar: string;
  isActive: boolean;
  phone?: string;
  code?: string;
  created_at?: Date;
  updated_at?: Date;
}
