import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UploadService {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger('UploadService');
  }

  async uploadAvatar() {}
}
