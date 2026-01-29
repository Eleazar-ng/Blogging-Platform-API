import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World Gang!';
  }

  checkHealth(): string {
    return `Health check passed! (1/1) - ${new Date().toISOString()}`;
  }
}
