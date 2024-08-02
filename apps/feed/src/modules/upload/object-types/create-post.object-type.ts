import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreatePostResponse {
  @Field(() => String)
  result: string;

  @Field(() => String)
  refreshToken: string;
}
