interface IUser {
  id?: string;
  email: string;
  password?: string;
  username: string;
  fullname: string;
  avatar: string | ArrayBuffer;
  isActive?: boolean;
  phone: string;
  code?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type { IUser };