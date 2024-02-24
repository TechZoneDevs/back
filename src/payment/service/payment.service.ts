import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../payment.entity';
import { Repository } from 'typeorm';
import { OrderService } from 'src/order/service/order.service';
import axios from 'axios';
import { Order } from 'src/order/order.entity';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment) private paymentService: Repository<Payment>,
        private orederService: OrderService
    ){}

    async createPayment() {
    
        const paymentData = {
          intent: 'CAPTURE',
          purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: "1.00",
                },
                shipping: {
                    name: {
                        full_name: "Juan Pérez",
                    },
                    address: {
                        address_line_1: "Av. Principal 123",
                        admin_area_2: "Ciudad Autónoma de Buenos Aires",
                        admin_area_1: "CABA",
                        postal_code: "C1234ABC", // Código postal válido para Argentina
                        country_code: "AR",
                    },
                },
            },
        ],
          application_context: {
            brand_name: 'techZone',
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url:  `http://localhost:3001/payment/capture`, //esto cuando este el front lo avanzamos
            cancel_url: 'http://localhost:3001/cancel-payment', 
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
            


    
          return response.data;
        } catch (error) {
          throw new Error('Error al generar el pago con PayPal' + error.message);
        }
      }

     async capturePayment (token: string) {
      
        try {
          const response = await axios.post(
            `${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`,
            {},
            {
              auth: {
                username: process.env.PAYPAL_API_CLIENT,
                password: process.env.PAYPAL_API_SECRET,
              },
            }
          );
      
          console.log("Status : ",response.data.status,"Productos : ",response.data.links);
          if(response.data.status === "COMPLETED"){
            const payment = new Payment();
            payment.payment = new Order;
            payment.orderId = response.data.id;
            payment.amount = 10;
            await this.paymentService.save(payment);
          }
          return "/payed.html"
        } catch (error) {
          console.log(error.message);
          throw new InternalServerErrorException('Error al capturar la orden de PayPal');
        }
      };

      async cancelPayment () {
        return "/payed.html"
      };


    }

