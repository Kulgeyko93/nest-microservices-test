import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { CardSchema } from '@app/common';

const CreateReservationSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  placeId: z.string().min(1),
  invoiceId: z.string().min(1),
  charge: z.object({
    card: CardSchema,
    amount: z.number().positive(),
  }),
});

export class CreateReservationDto extends createZodDto(CreateReservationSchema) {}

export type TCreateReservation = z.infer<typeof CreateReservationSchema>;
