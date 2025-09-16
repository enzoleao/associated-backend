import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import * as hbs from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

interface SendMailOptions {
  templateName: string;
  to: string;
  subject: string;
  context: Record<string, any>;
}

export class NodemailerAdapter {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true para SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendMail({ templateName, to, subject, context }: SendMailOptions): Promise<void> {
    try {
      const templatePath = path.resolve(__dirname, '..', 'templates', `${templateName}.hbs`);

      if (!fs.existsSync(templatePath)) {
        throw new Error(`Template "${templateName}.hbs" não encontrado em ${templatePath}`);
      }
      const date = new Date()

      const templateFile = fs.readFileSync(templatePath, 'utf-8');
      const template = hbs.compile(templateFile);
      const year = date.getFullYear()
      const html = template({...context, reset_link: `${process.env.FRONTEND_URL}/auth/reset-password/${context.token}`, year});


      await this.transporter.sendMail({
        from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
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
