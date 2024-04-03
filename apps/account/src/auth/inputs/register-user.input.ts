import { IUserModel } from '@lib/common';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput
  implements Pick<IUserModel, 'email' | 'password'>
{
  @Field()
  email: string;
  @Field()
  password: string;
}
