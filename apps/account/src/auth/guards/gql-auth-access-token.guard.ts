import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import { JwtStrategyName } from '../core/constants';

@Injectable()
export class GqlAuthAccessTokenGuard extends AuthGuard(JwtStrategyName.JWT) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  public getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    return req;
  }
}
