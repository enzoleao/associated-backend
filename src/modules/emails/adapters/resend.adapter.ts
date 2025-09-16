import { Resend } from 'resend';
import * as hbs from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

interface SendMailOptions {
  templateName: string;
  to: string;
  subject: string;
  context: Record<string, any>;
}

export class ResendAdapter {
  private resend: Resend;

  constructor() {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY não configurada');
    }

    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendMail({ templateName, to, subject, context }: SendMailOptions): Promise<void> {
    try {
      const templatePath = path.resolve(__dirname, '..', 'templates', `${templateName}.hbs`);

      if (!fs.existsSync(templatePath)) {
        throw new Error(`Template "${templateName}.hbs" não encontrado em ${templatePath}`);
      }

      const date = new Date();
      const templateFile = fs.readFileSync(templatePath, 'utf-8');
      const template = hbs.compile(templateFile);
      const year = date.getFullYear();

      const html = template({
        ...context,
        reset_link: `${process.env.FRONTEND_URL}/auth/reset-password/${context.token}`,
        year,
      });

      const response = await this.resend.emails.send({
        from: process.env.SMTP_FROM as string,
        to,
        subject,
        html,
      });
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw error;
    }
  }
}
