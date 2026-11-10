import { getLogger } from '@ouestware/node-logger';
import { render } from 'emailmd';
import nodemailer, { type Mail } from 'nodemailer';
import { singleton } from 'tsyringe';

import config from '../config';
import { UserDto } from '../types';

@singleton()
export class Mailer {
  /**
   * Logger.
   */
  private log = getLogger('Mailer');

  /**
   * Mailer.
   */
  private mailer: Mail;

  /**
   * Constructor.
   */
  constructor() {
    this.log.info('initialized', config.mailer);
    this.mailer = nodemailer.createTransport(config.mailer.transport);
  }

  /**
   * Send forgot password email.
   */
  userForgotPassword(user: UserDto, url: string): Promise<void> {
    this.log.debug('Sending forgot password', { user, url });
    const markdown = `
---
preheader: 'Forgot your password?'
---
::: header 
![Letterbox](${config.server.baseUrl}/favicon.svg) 
:::

# Forgot your password?

Hi ${user.name},

You told us you forgot your password. Click below to choose a new one

[Reset my password](<%= url %>){button}

::: footer :::
    `;
    return this.send(user.email, markdown);
  }

  /**
   * Send account confirmation email.
   */
  userConfirmation(user: UserDto, url: string): Promise<void> {
    this.log.debug('Sending email verification', { user, url });
    const markdown = `
---
preheader: 'Confirm your email address'
---
::: header 
![Letterbox](${config.server.baseUrl}/favicon.svg) 
:::

# Welcome to letterbox

Thank you for joining, please click on the link below (valid for 4 hours) to verify your email and activate your
account. Notice, until you do, your account will have limited privileges.

[Confirm my account](${url}){button}

You may copy & paste this confirmation link into your browser

:::callout center compact 
${url}
:::

::: footer 
:::`;
    return this.send(user.email, markdown);
  }

  /**
   * Generic method to send an email via a template.
   */
  private async send(email: string, markdown: string): Promise<void> {
    try {
      const { html, text } = await render(markdown);
      await this.mailer.sendMail({
        from: config.mailer.noReply,
        to: email,
        html,
        text,
      });
    } catch (e) {
      this.log.error(`Failed to send email`, e);
    }
  }
}
