import { UnauthorizedException } from '@nestjs/common';

export const authContext = async ({ req }) => {
  try {
    const xApiKey = process.env.X_API_KEY;
    if (
      !req.headers ||
      !req.headers['x-api-key'] ||
      req.headers['x-api-key'] !== xApiKey
    ) {
      throw new Error();
    }

    return true;
  } catch (error) {
    throw new UnauthorizedException('User unauthorize');
  }
};
