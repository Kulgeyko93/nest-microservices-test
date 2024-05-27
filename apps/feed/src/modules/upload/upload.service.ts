import { UploadRepository } from './upload.repository';
import { Injectable, Logger } from '@nestjs/common';
import { BufferedFile } from '../minio/helpers/interfaces';
import { MinioClientService } from '../minio/minio-client.service';
import { MinioBuckets } from '../minio/helpers/constants';

@Injectable()
export class UploadService {
  private readonly logger: Logger;

  constructor(
    private readonly minioClientService: MinioClientService,
    private readonly uploadRepository: UploadRepository,
  ) {
    this.logger = new Logger('UploadService');
  }

  async uploadAvatar(userId: string, image: BufferedFile) {
    const uploaded_image = await this.minioClientService.upload(
      image,
      MinioBuckets.Avatar,
    );

    const file = await this.uploadRepository.createOrUpdate({
      fileUrl: uploaded_image.url,
      userId,
      type: 'avatar', // TODO: fix to common types
    });

    return file;
  }
}
