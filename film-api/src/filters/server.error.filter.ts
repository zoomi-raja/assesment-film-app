
import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

type ErrorObj = {
  statusCode: number,
  message: string,
  trace?: string
}
@Catch()
export class ServerErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {

    let response = host.switchToHttp().getResponse();
    let status = (error instanceof HttpException) ? error.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      //todo logger 
    console.log(error);
      let errorObj:ErrorObj = {
          statusCode: status,
          message: error.message
        }
        if ( process.env.NODE_ENV !== 'production') {
          errorObj.trace = error.stack
        }
        return response.status(status).json(errorObj); 
    }else if(error instanceof HttpException){
      response.status(status).json(error.getResponse());
    }
  }
}