import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateCharge } from '@app/common';

@Injectable()
export class PaymentsService {
  private readonly stripeClient = new Stripe(this.configService.get('STRIPE_SECRET_KEY') as string, {
    apiVersion: '2023-10-16',
  });

  constructor(private readonly configService: ConfigService) {}

  async createCharge({ card, amount }: CreateCharge) {
    try {
      const paymentMethod = await this.stripeClient.paymentMethods.create({
        type: 'card',
        card,
      });

      const paymentIntent = await this.stripeClient.paymentIntents.create({
        payment_method: paymentMethod.id,
        amount: amount * 100,
        confirm: true,
        payment_method_types: ['card'],
        currency: 'usd',
      });

      return paymentIntent;
    } catch (error) {
      console.log(error);
    }
  }
}
