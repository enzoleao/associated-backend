import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ErrorMessages } from '../messages/error-messages';
import { ValidationMessages } from '../messages/validation-messages';
import { FieldNames } from '../messages/field-names';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    });
  }

  createExceptionFactory() {
    return (validationErrors: ValidationError[] = []) => {
      const errors = this.formatErrors(validationErrors);
      throw new BadRequestException({
        error: ErrorMessages.badRequest,
        message: errors,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    };
  }

  private formatErrors(validationErrors: ValidationError[]) {
    const formattedErrors: Record<string, string[]> = {};

    validationErrors.forEach((error) => {
      const constraints = error.constraints
        ? this.translateConstraints(error.constraints, error.property)
        : [];

      if (constraints.length > 0) {
        formattedErrors[error.property] = constraints;
      }

      if (error.children && error.children.length > 0) {
        Object.assign(formattedErrors, this.formatErrors(error.children));
      }
    });

    return formattedErrors;
  }

  private translateConstraints(
    constraints: Record<string, string>,
    property: string,
  ): string[] {
    return Object.entries(constraints).map(([constraint, message]) => {
      const template = ValidationMessages[constraint];
      return template
        ? template
          .replace('$property', FieldNames[property] || property)
          .replace(/\$constraint1/g, this.extractConstraint(message))
        : message;
    });
  }

  private extractConstraint(message: string): string {
    const match = message.match(/(\d+)/);
    return match ? match[0] : '';
  }
}
