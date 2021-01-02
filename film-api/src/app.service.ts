import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  intro(): any {
    return {
      name: 'films api',
      version: 'v1.0',
    };
  }
}
