import { UploadRepository } from './upload.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MinioClientService } from '../minio/minio-client.service';
import { MinioBuckets, StoreFilePayload } from '@lib/common';

@Injectable()
export class UploadService {
  private readonly logger: Logger;

  constructor(
    private readonly minioClientService: MinioClientService,
    private readonly uploadRepository: UploadRepository,
  ) {
    this.logger = new Logger('UploadService');
  }

  async deleteFile(id: string, basket: MinioBuckets): Promise<boolean> {
    const file = await this.uploadRepository.findOne({ id });

    if (!file) {
      throw new NotFoundException(`File by id: ${id} didn't found`);
    }

    await this.minioClientService.delete(file.filename, basket);
    await this.uploadRepository.remove({ id });

    return true;
  }

  async deleteFileInStore(filename: string, basket: MinioBuckets) {
    return this.minioClientService.delete(filename, basket);
  }

  async storeFile({ file, ...data }: StoreFilePayload) {
    const filePayload = {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      buffer: file.buffer,
    };

    const uploadedFile = await this.minioClientService.upload(
      filePayload,
      data.baseBucket,
    );

    return uploadedFile;
  }
}
