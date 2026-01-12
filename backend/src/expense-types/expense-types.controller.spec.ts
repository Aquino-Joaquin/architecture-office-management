import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseTypesController } from './expense-types.controller';

describe('ExpenseTypesController', () => {
  let controller: ExpenseTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseTypesController],
    }).compile();

    controller = module.get<ExpenseTypesController>(ExpenseTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
