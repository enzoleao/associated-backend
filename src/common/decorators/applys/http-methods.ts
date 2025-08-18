import {
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Options,
  Head,
  HttpCode,
} from '@nestjs/common';
import { HttpMethod, MethodMetadata } from '../@types/endpoint-types';

/**
 * Mapper between custom HttpMethod type and Nest decorators
 */

export type MethodDecoratorFactory = (path?: string) => MethodDecorator;

const METHOD_MAP: Record<HttpMethod, MethodDecoratorFactory> = {
  GET: Get,
  POST: Post,
  PATCH: Patch,
  PUT: Put,
  DELETE: Delete,
  OPTIONS: Options,
  HEAD: Head,
};

/**
 * Retrieves the corresponding NestJS HTTP method decorator (e.g., Get, Post).
 *
 * @param method - The HTTP method (e.g., GET, POST, DELETE).
 * @returns The appropriate NestJS method decorator.
 * @throws If the HTTP method is unsupported.
 */
export function getMethodDecorator(method: HttpMethod): MethodDecoratorFactory {
  const decorator = METHOD_MAP[method];
  if (!decorator) {
    throw new Error(`Unsupported HTTP method: ${method}`);
  }
  return decorator;
}

/**
 * Applies the HTTP method decorator (e.g., Get, Post) to a method.
 *
 * @param methodDecorator - The NestJS HTTP method decorator.
 * @param route - The route path for the endpoint.
 * @param metadata - The metadata of the method to which the decorator is applied.
 */
export function applyMethodDecorator(
  methodDecorator: any,
  route: string | undefined,
  metadata: MethodMetadata,
): void {
  methodDecorator(route ?? '')(
    metadata.target,
    metadata.key,
    metadata.descriptor,
  );
}

/**
 * Applies the HTTP status code decorator to the method.
 *
 * @param status - The HTTP status code for the successful response.
 * @param metadata - The metadata of the method to which the decorator is applied.
 */
export function applyHttpCode(status: number, metadata: MethodMetadata): void {
  HttpCode(status)(metadata.target, metadata.key, metadata.descriptor);
}
