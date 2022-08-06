import { Test, TestingModule } from '@nestjs/testing';
import { LogController } from './user.controller';
import { LogService } from './userlog.service';

describe('LogController', () => {
  let controller: LogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogController],
      providers: [LogService],
    }).compile();

    controller = module.get<LogController>(LogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
