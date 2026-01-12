import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseTypesController } from './expense-types.controller';
import { ExpenseTypesService } from './expense-types.service';
import { ExpenseType } from './expense-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseType])],
  controllers: [ExpenseTypesController],
  providers: [ExpenseTypesService],
})
export class ExpenseTypesModule {}
