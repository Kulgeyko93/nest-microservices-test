import { UserEntity } from '../../database';

export namespace AccountValidateUser {
  export const topic = 'account.validate-user.command';

  export class Request {
    token: string;
  }

  export class Response {
    user: UserEntity;
  }
}
