import { Test, TestingModule } from '@nestjs/testing';
import { CategoriasGlobalesController } from './categorias-globales.controller';

describe('CategoriasGlobalesController', () => {
  let controller: CategoriasGlobalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriasGlobalesController],
    }).compile();

    controller = module.get<CategoriasGlobalesController>(CategoriasGlobalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
