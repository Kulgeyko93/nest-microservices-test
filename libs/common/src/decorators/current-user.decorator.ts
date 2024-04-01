import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { IUserModel } from '../contracts';

const getCurrentUserByContext = (
  context: ExecutionContext,
): Pick<IUserModel, 'id' | 'email'> => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
