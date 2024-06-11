import {
  AccountValidateUser,
  KafkaClients,
  KafkaConsumerGroups,
  MicroservicesNames,
  ResponseWithUser,
} from '@lib/common';
import {
  BadRequestException,
  Inject,
  Injectable,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { NextFunction, Request } from 'express';
import { Kafka } from 'kafkajs';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    @Inject(MicroservicesNames.ACCOUNT_MS) private authClient: ClientProxy,
  ) {}

  async use(req: Request, res: ResponseWithUser, next: NextFunction) {
    try {
      const tokenString = req.headers?.authorization?.split(' ');

      if (!req.headers?.authorization || !tokenString?.length) {
        throw new BadRequestException();
      }

      const broker = this.configService.getOrThrow('KAFKA_BROKER');
      const kafka = new Kafka({
        clientId: KafkaClients.AccountClient,
        brokers: [broker],
      });

      const producer = kafka.producer({
        allowAutoTopicCreation: true,
        retry: { retries: 1 },
      });
      await producer.connect();

      const user = await producer.send({
        topic: AccountValidateUser.topic,
        messages: [{ value: JSON.stringify({ token: tokenString[1] }) }],
      });

      await producer.disconnect();
      //
      //
      const consumer = kafka.consumer({
        groupId: KafkaConsumerGroups.AccountConsumer,
      });

      const consumerResult = await consumer.subscribe({
        topics: [AccountValidateUser.topicReply, AccountValidateUser.topic],
      });
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log(topic, partition, message);
        },
      });
      await consumer.disconnect();

      // if (!user) {
      throw new UnauthorizedException('User unauthorize');
      // }

      req.user = user;
      throw new BadRequestException();
    } catch (error) {
      throw new NotFoundException('Wrong credentials');
    }

    next();
  }
}
