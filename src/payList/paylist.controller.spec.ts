import { Test, TestingModule } from '@nestjs/testing';
import { PaylistController } from './paylist.controller';
import { PaylistService } from './paylist.service';

describe('PaylistController', () => {
  let controller: PaylistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaylistController],
      providers: [PaylistService],
    }).compile();

    controller = module.get<PaylistController>(PaylistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
