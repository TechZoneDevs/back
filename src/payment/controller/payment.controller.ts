import { Body, Controller, Param, Post } from '@nestjs/common';
import { PaymentService } from '../service/payment.service';
import { Payment } from '../payment.entity';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

  @Post(':orderId')
  async createPayment(@Param('orderId') orderId: string): Promise<Payment> {
    return await this.paymentService.createPayment(+orderId);
  }
}
