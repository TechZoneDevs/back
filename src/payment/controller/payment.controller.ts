import { Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { PaymentService } from '../service/payment.service';
import { Response as ExpressResponse } from 'express';
import { Payment } from '../payment.entity';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post(':orderId/create')
  async createPayment(@Param('orderId') orderId: string): Promise<Payment> {
    return await this.paymentService.createPayment(+orderId);
  }

  @Post('capture')
  async captureOrder(
    @Query('token') token: string,
    @Res() res: ExpressResponse,
  ) {
    const redirectionUrl = await this.paymentService.capturePayment(token);
    return res.redirect(redirectionUrl);
  }
  @Get('cancel')
  async cancelOrder(@Res() res: ExpressResponse) {
    const redirectionUrl = await this.paymentService.cancelPayment();
    return res.redirect(redirectionUrl);
  }
}
