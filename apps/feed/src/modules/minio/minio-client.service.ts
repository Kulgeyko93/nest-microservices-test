import { ConfigService } from '@nestjs/config';
import {
  Injectable,
  Logger,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';

import * as crypto from 'crypto';
import { BufferedFile } from './helpers/interfaces';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;

  constructor(
    private readonly configService: ConfigService,
    private readonly minio: MinioService,
  ) {
    this.logger = new Logger('MinioStorageService');
  }

  async findOrCreateBucket(bucket: string) {
    const exists = await this.minio.client.bucketExists(bucket);
    if (!exists) {
      return await this.createBucket(bucket);
    }
  }

  async createBucket(bucket: string) {
    await this.minio.client.makeBucket(bucket, 'us-east-1');
  }

  public async upload(file: BufferedFile, baseBucket: string) {
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new BadRequestException('Error uploading file');
    }

    await this.findOrCreateBucket(baseBucket);

    const temp_filename = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );

    const filename = hashedFileName + ext;
    const fileBuffer = file.buffer;
    this.minio.client.putObject(baseBucket, filename, fileBuffer, file.size, {
      'Content-type': 'image',
    });

    return {
      url: `http://${this.configService.get('MINIO_ENDPOINT')}:${this.configService.get('MINIO_PORT')}/${baseBucket}/${filename}`,
    };
  }

  async delete(objetName: string, baseBucket: string) {
    try {
      const result = await this.minio.client.removeObject(
        baseBucket,
        objetName,
      );
      return result;
    } catch (error) {
      throw new HttpException(error?.message, error.status);
    }
  }
}
