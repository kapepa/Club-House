export class DtoLoginReq {
  field: string;
  login: string;
  password: string;
}

export class DtoLoginRes {
  access_token?: string;
  message: string;
  error: boolean;
}

export class DtoRegistrationRes {
  id?: string | undefined;
  message: string;
  error: boolean;
}
