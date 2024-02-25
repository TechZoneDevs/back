import {  Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { PaymentService } from '../service/payment.service';
import { Response as ExpressResponse } from 'express';
import { Payment } from '../payment.entity';
import { UUID } from 'crypto';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) {}

  @Post('create/:id')
  async createPayment(@Param("id") id:UUID): Promise<Payment> {
    return await this.paymentService.createPayment(id);
  }

  @Get('capture')
  async captureOrder(@Query('token') token: string, @Res() res: ExpressResponse) {
    const redirectionUrl = await this.paymentService.capturePayment(token);
    return res.redirect(redirectionUrl)
}
  @Get('cancel')
  async cancelOrder( @Res() res: ExpressResponse) {
  const redirectionUrl = await this.paymentService.cancelPayment();
  return res.redirect(redirectionUrl)
}

}
