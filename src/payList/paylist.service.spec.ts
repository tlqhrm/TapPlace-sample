import { Test, TestingModule } from '@nestjs/testing';
import { PaylistService } from './paylist.service';

describe('PaylistService', () => {
  let service: PaylistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaylistService],
    }).compile();

    service = module.get<PaylistService>(PaylistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
