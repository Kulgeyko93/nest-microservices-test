import { Request } from 'express';

export interface IGetUserAuthInfoRequest extends Request {
  user: IUserSubInfoRequest;
}

export interface IUserSubInfoRequest extends Request {
  sub: string;
}
