import { CardSchema } from '@app/common';

import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateChargeSchema = z.object({
  card: CardSchema,
  amount: z.number(),
});

export class CreateChargeDto extends createZodDto(CreateChargeSchema) {}

export type CreateCharge = z.infer<typeof CreateChargeSchema>;
