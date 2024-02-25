import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../payment.entity';
import { Repository } from 'typeorm';
import { OrderService } from 'src/order/service/order.service';
import axios from 'axios';
import { Order } from 'src/order/order.entity';
import { UUID } from 'crypto';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment) private paymentService: Repository<Payment>,
        private orederService: OrderService
    ){}

    async createPayment(id:UUID) {
    
        const order = await this.orederService.findById(id);

        if(order && !order.products.length){
          throw Error("No tiene ningun producto asignado esta orden")
        }

        const paymentData = {
          intent: 'CAPTURE',
          purchase_units: order.products.map((product) => {

            return {
              reference_id: order.id,
                amount: {
                    currency_code: "USD",
                    value: product.price,
                },
                shipping: {
                    name: {
                        full_name: order.user.name,
                    },
                    address: {
                        address_line_1: "Av. Principal 123",
                        admin_area_2: "Ciudad Autónoma de Buenos Aires",
                        admin_area_1: "CABA",
                        postal_code: "C1234ABC",
                        country_code: "AR",
                    },
                },
            }

          }),
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
          
          order.paymentId = response.data.id;

          await this.orederService.updateOrder({id:order.id,orderContent:{
            paymentId:order.paymentId
          }})

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
          
          if(response.data.status === "COMPLETED"){
            this.orederService.updateOrderStatus(response.data.id)
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

