import { Injectable, Logger } from '@nestjs/common';
import { BufferedFile } from '../minio/helpers/interfaces';
import { MinioClientService } from '../minio/minio-client.service';
import { MinioBuckets } from '../minio/helpers/constants';

@Injectable()
export class UploadService {
  private readonly logger: Logger;

  constructor(private readonly minioClientService: MinioClientService) {
    this.logger = new Logger('UploadService');
  }

  async uploadAvatar(image: BufferedFile) {
    const uploaded_image = await this.minioClientService.upload(
      image,
      MinioBuckets.Avatar,
    );

    return {
      image_url: uploaded_image.url,
      message: 'Image upload successful',
    };
  }
}
