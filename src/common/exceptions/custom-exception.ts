import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ErrorMessages } from '@/common/messages';

type HttpStatusType =
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND';

export class CustomBadRequestException extends BadRequestException {
  constructor(
    fields: string[],
    message: string,
    status: HttpStatusType = 'BAD_REQUEST',
  ) {
    const httpStatus =
      HttpStatus[status.toUpperCase() as keyof typeof HttpStatus] ||
      HttpStatus.BAD_REQUEST;

    const mappedMessages = fields.reduce(
      (acc, field) => {
        acc[field] = [message];
        return acc;
      },
      {} as Record<string, string[]>,
    );

    super({
      statusCode: httpStatus,
      error: ErrorMessages.badRequest,
      messages: mappedMessages,
    });
  }
}
