import {
  CreatePostUser,
  FeedDeleteFile,
  SagaStep,
  UploadSinglePostFile,
} from '@lib/common';

export abstract class UploadFileStepSaga extends SagaStep<
  UploadSinglePostFile.Request,
  UploadSinglePostFile.Response,
  string,
  FeedDeleteFile.Response
> {}

export abstract class CreatePostStepSaga extends SagaStep<
  CreatePostUser.Request,
  CreatePostUser.Response,
  string,
  any
> {}
