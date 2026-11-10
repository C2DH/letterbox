import Boom from '@hapi/boom';
import { getLogger } from '@ouestware/node-logger';
import { type Auth as AuthType, type BetterAuthOptions, betterAuth } from 'better-auth';
import { toNodeHandler } from 'better-auth/node';
import { Request } from 'express';
import { inject, singleton } from 'tsyringe';

import config from '../../config';
import { Mailer } from '../mailer';
import { neo4jAdapter } from './neo4j-adapter';
import { UserDto } from '~/types';

@singleton()
export class Auth {
  /**
   * The logger
   */
  private log = getLogger('Auth');

  /**
   * Better-auth instance
   */
  betterAuth: AuthType;

  /**
   * Default constructor
   */
  constructor(@inject(Mailer) public mailer: Mailer) {
    this.log.info('Auth intialization');
    this.betterAuth = betterAuth<BetterAuthOptions>({
      secret: config.server.secret,
      baseURL: `${config.server.baseUrl}/api/auth`,
      advanced: {
        disableCSRFCheck: process.env.MODE === 'dev',
        useSecureCookies: config.server.ssl,
      },
      database: neo4jAdapter(config.neo4j),
      trustedOrigins: [config.server.baseUrl],
      emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url }) => {
          this.log.debug('Sending forgot password', { user });
          await this.mailer.userForgotPassword(user, url);
        },
      },
      emailVerification: {
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url, token }) => {
          this.log.debug('Sending email verification', { user, url, token });
          await this.mailer.userConfirmation(user, url);
        },
      },
    });
  }

  /**
   * Get the express handler of better-auth
   */
  getExpressHandler() {
    this.log.info('Getting express handler');
    return toNodeHandler(this.betterAuth);
  }

  /**
   * Get the connected user from the request.
   */
  async getUser(request: Request): Promise<UserDto | null> {
    const session = await this.betterAuth.api.getSession({
      headers: new Headers(request.headers as unknown as Headers),
    });

    // We cast the user to prisma user, because the one from better-auth
    // is not dynamic with the extrafields we added, but in runtime it's OK
    return session ? (session.user as UserDto) : null;
  }

  /**
   * Get the connected user from the request.
   */
  async getUserOrThrow(request: Request): Promise<UserDto> {
    // Check for token first
    const user = await this.getUser(request);
    if (!user) throw Boom.unauthorized();
    return user;
  }
  /**
   * Get auth cookie to transfer authorization
   */
  getUserCookie(request: Request): string | undefined {
    const headers = new Headers(request.headers as unknown as Headers);
    const cookies = headers.get('cookie');

    const cookieName = config.server.ssl ? '__Secure-better-auth.session_token' : 'better-auth.session_token';

    let authCookie: string | undefined = undefined;
    cookies?.split('; ').forEach((cookie) => {
      const [name] = cookie.split('=');
      if (name === cookieName) authCookie = cookie;
    });
    return authCookie;
  }
}
