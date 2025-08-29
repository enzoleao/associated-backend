import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { TokenService } from '../token-service/token-service';
import { formatAuthTemplate } from '../../templates/auth-message.template';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);

  constructor(private readonly tokenService: TokenService) {}

  async sendMessage({ to, message }) {
    try {
      const { token, phone_number_id } = await this.tokenService.getTokenPlataformWhatsappAuth();

      const url = `https://graph.facebook.com/v21.0/${phone_number_id}/messages`;
      const payload = {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: message },
      };

      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      this.logger.log(`Mensagem enviada para ${to}: ${message}`);
      return response.data;
    } catch (error: any) {
      this.logger.error(`Erro ao enviar mensagem: ${error.message}`);
      throw error;
    }
  }
  async sendTemplateMessage({ to, message }) {
    try {
      const { token, phone_number_id } = await this.tokenService.getTokenPlataformWhatsappAuth();

      const url = `https://graph.facebook.com/v21.0/${phone_number_id}/messages`;
      const payload = formatAuthTemplate({phone_number: to, code: message})

      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      this.logger.log(`Mensagem enviada para ${to}: ${message}`);
      return response.data;
    } catch (error: any) {
      this.logger.error(`Erro ao enviar mensagem: ${error.message}`);
      throw error;
    }
  }

}
