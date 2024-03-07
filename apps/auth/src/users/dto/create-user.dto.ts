import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}

export type TCreateUser = z.infer<typeof CreateUserSchema>;
