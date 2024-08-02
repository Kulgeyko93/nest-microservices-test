import { Upload } from '@lib/common';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UploadFileInput {
  @Field(() => [Upload], { description: 'Input for the profile image files.' })
  file: Upload[];
}
