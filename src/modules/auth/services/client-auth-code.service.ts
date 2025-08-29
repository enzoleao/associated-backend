import { SendAuthCodeQueueService } from '@/modules/queue/services/send-auth-code-queue.service';
import { Inject, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { randomInt, createHmac } from 'crypto';
import { Redis } from 'ioredis';

@Injectable()
export class ClientCodeAuthService {
  private ttlSeconds = Number(process.env.AUTH_CODE_TTL_SECONDS || 300);
  private attemptsLimit = Number(process.env.AUTH_CODE_ATTEMPTS || 3);
  private hmacSecret = process.env.AUTH_CODE_SECRET || 'fallback_secret';

  constructor(
    @Inject('REDIS') private readonly redisClient: Redis,
    private readonly sendAuthCodeQueueService: SendAuthCodeQueueService,
  ) {}

  private hmac(code: string, phone: string) {
    return createHmac('sha256', this.hmacSecret).update(`${phone}:${code}`).digest('hex');
  }

  private generateNumericCode(digits = 6) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return String(randomInt(min, max + 1));
  }

  private codeKey(phone: string) {
    return `auth:code:${phone}`;
  }

  private attemptsKey(phone: string) {
    return `auth:attempts:${phone}`;
  }


  async sendCode(phone: string) {

    const code = this.generateNumericCode(6);
    const hash = this.hmac(code, phone);

    await this.redisClient.setex(this.codeKey(phone), this.ttlSeconds, hash);

    await this.redisClient.del(this.attemptsKey(phone));
    this.sendAuthCodeQueueService.send({code, phone})

 
    return { message: 'Código enviado ao seu Whatsapp com sucesso !' };
  }

  async verifyCode({ phone, codeInput }) {
    const key = this.codeKey(phone);
    const storedHash = await this.redisClient.get(key);
    if (!storedHash) {
      throw new BadRequestException('Código inválido ou expirado.');
    }

    const attemptsKey = this.attemptsKey(phone);
    const attempts = Number((await this.redisClient.get(attemptsKey)) || '0');
    if (attempts >= this.attemptsLimit) {
      await this.redisClient.del(key);
      await this.redisClient.del(attemptsKey);
      throw new ForbiddenException('Número de tentativas excedido. Gere um novo código.');
    }

    const incomingHash = this.hmac(codeInput, phone);
    if (incomingHash === storedHash) {
      await this.redisClient.del(key);
      await this.redisClient.del(attemptsKey);
      return { success: true };
    }

    const newAttempts = await this.redisClient.incr(attemptsKey);
    if (newAttempts === 1) {
      await this.redisClient.expire(attemptsKey, this.ttlSeconds + 60);
    }

    if (newAttempts >= this.attemptsLimit) {
      await this.redisClient.del(key);
      await this.redisClient.del(attemptsKey);
      throw new ForbiddenException('Número de tentativas excedido. Gere um novo código.');
    }

    throw new BadRequestException(`Código incorreto. Você tem ${this.attemptsLimit - newAttempts} tentativas restantes.`);
  }
}
