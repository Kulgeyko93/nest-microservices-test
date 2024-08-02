import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JwtTokens {
  @Field(() => String)
  accessToken: string;

  @Field(() => String)
  refreshToken: string;
}
