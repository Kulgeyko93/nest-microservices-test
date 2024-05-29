import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { AccountValidateUser, KafkaClients } from '@lib/common';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const authContext = async ({ req }) => {
  try {
    const broker = configService.getOrThrow('KAFKA_BROKER');
    const kafka = new Kafka({
      clientId: KafkaClients.AccountClient,
      brokers: [broker],
    });

    const tokenString = req.headers?.authorization?.split(' ');

    if (!req.headers?.authorization || !tokenString?.length) {
      throw new BadRequestException();
    }

    const producer = kafka.producer();
    await producer.connect();
    const result = await producer.send({
      topic: AccountValidateUser.topic,
      messages: [{ value: JSON.stringify({ token: tokenString[1] }) }],
    });
    await producer.disconnect();

    console.log(result);
  } catch (error) {
    throw new UnauthorizedException('User unauthorize');
  }
};

// export const authContext = async ({ req }) => {
//   try {
//     const xApiKey = process.env.X_API_KEY;
//     if (
//       !req.headers ||
//       !req.headers['x-api-key'] ||
//       req.headers['x-api-key'] !== xApiKey
//     ) {
//       throw new Error();
//     }

//     return true;
//   } catch (error) {
//     throw new UnauthorizedException('User unauthorize');
//   }
// };
