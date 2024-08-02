import { GqlAuthAccessTokenGuard } from '@lib/common/auth-common';
import { Controller, UseGuards } from '@nestjs/common';
import { UploadRepository } from './upload.repository';
import { UploadService } from './upload.service';

@Controller('upload')
@UseGuards(GqlAuthAccessTokenGuard)
export class UploadResolver {
  constructor(
    private readonly uploadService: UploadService,
    private readonly uploadRepository: UploadRepository,
  ) {}
}
