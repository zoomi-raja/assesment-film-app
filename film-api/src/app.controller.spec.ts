import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });
  const apiVer = {
    name: 'films api',
    version: 'v1.0',
  };
  describe('root', () => {
    it('should return "API Version!"', () => {
      expect(appController.getHello()).toStrictEqual(apiVer);
    });
  });
});
