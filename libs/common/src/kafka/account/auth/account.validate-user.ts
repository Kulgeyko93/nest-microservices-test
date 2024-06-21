import { UserEntity } from '../../../database';

export namespace AccountValidateUser {
  export const topic = 'account.validate-user.command';
  export const topicReply = 'account.validate-user.command.reply';

  export class Request {
    token: string;
    replyTopic: string;
  }

  export class Response {
    user: UserEntity;
  }
}
