import { Args, Mutation, Resolver } from '@nestjs/graphql';

import GraphQLUpload = require('graphql-upload/GraphQLUpload.js');
import Upload = require('graphql-upload/Upload.js');

@Resolver()
export class UploadResolver {
  @Mutation(() => Boolean)
  async singleFileUpload(
    @Args('file', { type: () => GraphQLUpload })
    { createReadStream, filename, mimetype }: GraphQLUpload,
  ) {
    console.log(filename);
    console.log(filename);
    console.log(filename);
    return true;
  }
}
