import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const NotifyEmailSchema = z.object({
  email: z.string().email(),
  text: z.string().min(1),
});

export class NotifyEmailDto extends createZodDto(NotifyEmailSchema) {}

export type TNotifyEmail = z.infer<typeof NotifyEmailSchema>;
