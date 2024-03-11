import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const GetUserSchema = z.object({
  _id: z.string(),
});

export class GetUserDto extends createZodDto(GetUserSchema) {}

export type TGetUser = z.infer<typeof GetUserSchema>;
