import { Injectable } from '@nestjs/common';
import { ResendAdapter } from '../adapters/resend.adapter';

@Injectable()
export class EmailService {
  private adapter: ResendAdapter;

  constructor() {
    this.adapter = new ResendAdapter();
  }

  async sendResetPasswordEmail({
    to,
    token,
    user_name,
  }: { to: string; token: string; user_name: string }) {
    await this.adapter.sendMail({
      templateName: 'reset-password',
      to,
      subject: 'Redefinir Senha',
      context: { token, user_name },
    });
  }
}
