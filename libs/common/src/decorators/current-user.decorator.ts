import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IUserModel } from '../contracts';

const getCurrentUserByContext = (
  context: ExecutionContext,
): Pick<IUserModel, 'id' | 'email'> | null => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }

  const user = context.getArgs()[2]?.req.getRequest().user;
  return JSON.parse(user) as Pick<IUserModel, 'id' | 'email'>;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
