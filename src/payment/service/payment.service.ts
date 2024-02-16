import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../payment.entity';
import { Repository } from 'typeorm';
import { OrderService } from 'src/order/service/order.service';
import axios from 'axios';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment) private paymentService: Repository<Payment>,
        private orederService: OrderService
    ){}

    async createPayment(orderId: number): Promise<any> {
        const order = await this.orederService.findById(orderId)
        const purchaseUnits = order.products.map(product => ({
          description: product.name, 
          amount: {
            currency_code: 'USD',
            value: product.price.toFixed(2), 
          },
          quantity: 1, 
        }));
    
        const totalPrice = order.products.reduce(
          (total, product) => total + product.price,
          0,
        );
    
        const paymentData = {
          intent: 'CAPTURE',
          purchase_units: purchaseUnits,
          application_context: {
            brand_name: 'techZone',
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            // return_url: 'https://example.com/capture-order', esto cuando este el front lo avanzamos
            // cancel_url: 'https://example.com/cancel-payment', 
          },
        };
    
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');
    
        try {
          const { data: { access_token } } = await axios.post(
            'https://api-m.sandbox.paypal.com/v1/oauth2/token',
            params,
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(process.env.PAYPAL_API_CLIENT + ':' + process.env.PAYPAL_API_SECRET).toString('base64')}`,
              },
            },
          );
    
          const response = await axios.post(
            'https://api-m.sandbox.paypal.com/v2/checkout/orders',
            paymentData,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
              },
            },
          );
    
          const payment = new Payment();
          payment.payment = order;
          payment.orderId = response.data.id;
          payment.amount = totalPrice;
          await this.paymentService.save(payment);
    
          return response.data;
        } catch (error) {
          throw new Error('Error al generar el pago con PayPal');
        }
      }
    }
