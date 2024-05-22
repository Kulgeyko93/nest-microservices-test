import { IUserEntityContract } from '@lib/common';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput
  implements Pick<IUserEntityContract, 'email' | 'password'>
{
  @Field()
  email: string;
  @Field()
  password: string;
}
