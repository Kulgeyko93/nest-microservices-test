import { Args, Mutation, Resolver } from '@nestjs/graphql';

import GraphQLUpload = require('graphql-upload/GraphQLUpload.js');
import Upload = require('graphql-upload/Upload.js');

@Resolver()
export class UploadResolver {
  @Mutation(() => Boolean)
  async singleFileUpload(
    @Args('avatar', { type: () => GraphQLUpload })
    dto: GraphQLUpload,
  ) {
    console.log('filename');
    return true;
  }
}
