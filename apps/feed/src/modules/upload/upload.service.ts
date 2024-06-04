import { UploadRepository } from './upload.repository';
import { Injectable, Logger } from '@nestjs/common';
import { MinioClientService } from '../minio/minio-client.service';
import { StoreFilePayload, UploadFilePayload } from '@lib/common';

@Injectable()
export class UploadService {
  private readonly logger: Logger;

  constructor(
    private readonly minioClientService: MinioClientService,
    private readonly uploadRepository: UploadRepository,
  ) {
    this.logger = new Logger('UploadService');
  }

  async storeFile({ file, ...data }: StoreFilePayload) {
    const filePayload = {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      buffer: file.buffer,
    };
    const result = await this.uploadFile({
      file: filePayload,
      ...data,
    });
  }

  async uploadFile({ file, userId, baseBucket, fileType }: UploadFilePayload) {
    const uploaded_image = await this.minioClientService.upload(
      file,
      baseBucket,
    );

    const fileEntity = await this.uploadRepository.createOrUpdate({
      fileUrl: uploaded_image.url,
      userId,
      type: fileType,
    });

    return fileEntity;
  }
}
