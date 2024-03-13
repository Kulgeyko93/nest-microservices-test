import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateCharge, NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentsService {
  private readonly stripeClient = new Stripe(this.configService.get('STRIPE_SECRET_KEY') as string, {
    apiVersion: '2023-10-16',
  });

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE) private readonly notificationsService: ClientProxy,
  ) {}

  async createCharge({ amount, email }: CreateCharge) {
    const paymentIntent = await this.stripeClient.paymentIntents.create({
      payment_method: 'pm_card_visa',
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });

    this.notificationsService.emit('notify-email', { email });

    return paymentIntent;
  }
}
