export class UserDto {
  id?: string;
  email: string;
  username: string;
  fullname: string;
  avatar: string;
  isActive: boolean;
  phone: string;
  created_at?: Date;
  updated_at?: Date;
}
