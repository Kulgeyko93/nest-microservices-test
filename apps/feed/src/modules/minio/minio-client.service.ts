import { ConfigService } from '@nestjs/config';
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';

import * as crypto from 'crypto';
import { BufferedFile } from './helpers/interfaces';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;

  public get client() {
    return this.minio.client;
  }

  constructor(
    private readonly configService: ConfigService,
    private readonly minio: MinioService,
  ) {
    this.logger = new Logger('MinioStorageService');
  }

  public async upload(file: BufferedFile, baseBucket: string) {
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }

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
    const fileName: string = `${filename}`;
    const fileBuffer = file.buffer;
    this.client.putObject(baseBucket, fileName, fileBuffer);

    return {
      url: `${this.configService.get('MINIO_ENDPOINT')}:${this.configService.get('MINIO_PORT')}/${this.configService.get('MINIO_BUCKET')}/${filename}`,
    };
  }

  async delete(objetName: string, baseBucket: string) {
    try {
      const result = await this.client.removeObject(baseBucket, objetName);
      return result;
    } catch (error) {
      throw new HttpException(error?.message, error.status);
    }
  }
}
