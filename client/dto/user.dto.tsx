interface IUser {
  id?: string;
  email: string;
  username: string;
  fullname: string;
  avatar: string;
  isActive: boolean;
  phone: string;
  code?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type { IUser };