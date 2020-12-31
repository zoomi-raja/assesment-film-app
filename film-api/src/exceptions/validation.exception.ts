import { ValidationError } from 'class-validator';
import { UnprocessableEntityException } from '@nestjs/common';

type Error = {
  entity: string;
  message: string;
};
export class ValidationException extends UnprocessableEntityException {
  constructor(public validationErrors: ValidationError[]) {
    super();
  }
  public getResponse(): string | Object {
    let errors = this.validationErrors.map( ( error:ValidationError ):Error => {
      return {
        entity: error.property,
        message: Object.values(error.constraints).join(', '),
      }
    });
    return {
      statusCode: this.getStatus(),
      message: errors,
      error: this.message,
    }
  }
}