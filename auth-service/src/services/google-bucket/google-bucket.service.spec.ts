import { Test, TestingModule } from '@nestjs/testing';
import { GoogleBucketService } from './google-bucket.service';

describe('GoogleBucketService', () => {
  let service: GoogleBucketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleBucketService],
    }).compile();

    service = module.get<GoogleBucketService>(GoogleBucketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
