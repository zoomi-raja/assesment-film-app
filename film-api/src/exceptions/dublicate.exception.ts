import { UnprocessableEntityException } from '@nestjs/common';
export type Error = {
  entity: string;
  message?: string;
};
export class DublicateException extends UnprocessableEntityException {
  constructor(public validationErrors: Error[]) {
    super();
  }
  public getResponse(): string | Object {
    let errors = this.validationErrors.map( ( error:Error ):Error => {
      return {
        entity:error.entity,
        message: error.message || `${error.entity} already exists`
      };
    });
    return {
      statusCode: this.getStatus(),
      message: errors,
      error: this.message,
    };
  }
}
