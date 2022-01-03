interface IRoom {
  id: string;
  title: string;
  message: number;
  people: number;
  speaker: {username: string, avatar: string}[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type { IRoom };