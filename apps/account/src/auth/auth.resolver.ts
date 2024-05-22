import { CurrentGqlUser, IUserEntityContract } from '@lib/common';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from '../user/entities/user.model';
import { AuthService } from './auth.service';
import { JwtTokens } from './core/object-types/jwt.object-type';
import { GqlAuthAccessTokenGuard } from './guards/gql-auth-access-token.guard';
import { GqlAuthRefreshTokenGuard } from './guards/gql-auth-refresh-token.guard';
import { LoginInput } from './inputs/login.input';
import { RegisterUserInput } from './inputs/register-user.input';

@Resolver('auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => JwtTokens)
  async signUp(@Args('input') input: RegisterUserInput) {
    return this.authService.register(input);
  }

  @Mutation(() => JwtTokens)
  async signIn(@Args('input') input: LoginInput) {
    return this.authService.signIn(input);
  }

  @UseGuards(GqlAuthAccessTokenGuard)
  @Query(() => UserEntity)
  async logout(@CurrentGqlUser() user: IUserEntityContract) {
    this.authService.logout(user.id);
    return user;
  }

  @UseGuards(GqlAuthRefreshTokenGuard)
  @Query(() => JwtTokens)
  async refreshTokens(
    @CurrentGqlUser() user: Pick<IUserEntityContract, 'email' | 'refreshToken'>,
  ) {
    const { email, refreshToken } = user;

    return this.authService.refreshTokens(email, refreshToken);
  }
}
