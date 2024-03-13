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

  async createCharge({ amount }: CreateCharge) {
    const paymentIntent = await this.stripeClient.paymentIntents.create({
      payment_method: 'pm_card_visa',
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });

    return paymentIntent;
  }
}
