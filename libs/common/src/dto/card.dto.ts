import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CardSchema = z.object({
  cvc: z.string().min(1, 'Please enter a valid value'),
  exp_month: z.number(),
  exp_year: z.number(),
  number: z.string().min(14, 'Please enter a valid value'),
});

export class CardDto extends createZodDto(CardSchema) {}

export type TCard = z.infer<typeof CardSchema>;
