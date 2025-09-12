import { Injectable } from '@nestjs/common';
import { NodemailerAdapter } from '../adapters/nodemailer.adapter';

@Injectable()
export class EmailService {
  private adapter: NodemailerAdapter;

  constructor() {
    this.adapter = new NodemailerAdapter();
  }

  async sendResetPasswordEmail({ to, token, user_name }: { to: string; token: string; user_name: string }) {
    await this.adapter.sendMail({templateName: 'reset-password', to, subject: 'Redefinir Senha', context: { token, user_name }});
  }
}
