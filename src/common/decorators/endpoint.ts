import {
  applyCreateFileInterceptor,
  applyHttpCode,
  applyMethodDecorator,
  getMethodDecorator,
  getSuccessfulResponse,
  applyApiOperation,
  applyApiResponses,
  applyGlobalApiResponses,
  applyPaginationResponse,
  applyAuthGuard,
} from './applys';
import { EndpointParams, MethodMetadata } from './@types/endpoint-types';
import { MethodDecoratorFactory } from './applys/http-methods';

/**
 * A decorator factory to define an HTTP endpoint with API documentation and validation @Endpoin.
 *
 * @param params - Configuration for the endpoint, including HTTP method, route, summary, and responses.
 * @returns A method decorator for the specified endpoint.
 */
export function Endpoint(params: EndpointParams): MethodDecorator {
  return function (
    target: any,
    key: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const metadata: MethodMetadata = { target, key, descriptor };
    const methodDecorator: MethodDecoratorFactory = getMethodDecorator(
      params.method,
    );

    const successResponse =
      params.responses && getSuccessfulResponse(params.responses);

    if (successResponse) {
      applyHttpCode(successResponse.status, metadata);
    }

    applyMethodDecorator(methodDecorator, params.route, metadata);
    if (params.summary) {
      applyApiOperation(params.summary, metadata);
    }
    if (params.responses) {
      applyApiResponses(params.responses, metadata);
    }
    applyGlobalApiResponses(metadata);
    if (params.isProtectedRoute) applyAuthGuard(metadata);
    if (params.paginationDto)
      applyPaginationResponse(params.paginationDto, metadata);

    if (params.uploadDir) {
      applyCreateFileInterceptor(params.uploadDir)(
        metadata.target,
        metadata.key,
        metadata.descriptor,
      );
    }

    return descriptor;
  };
}
