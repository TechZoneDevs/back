import { Module } from '@nestjs/common';
import { PaymentController } from './controller/payment.controller';
import { PaymentService } from './service/payment.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
