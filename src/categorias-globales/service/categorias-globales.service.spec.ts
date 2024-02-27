import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasGlobalesService } from './categorias-globales.service';

describe('CategoriasGlobalesService', () => {
  let service: CategoriasGlobalesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriasGlobalesService],
    }).compile();

    service = module.get<CategoriasGlobalesService>(CategoriasGlobalesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
