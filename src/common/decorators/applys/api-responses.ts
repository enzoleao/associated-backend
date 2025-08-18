/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExceptionResponse, ServerExceptionResponse } from '../../exceptions';
import { MethodMetadata, ResponseDefinition } from '../@types/endpoint-types';
import { ApiPaginatedResponse } from '../api-paginated-response';

/**
 * Retrieves the successful response definition from a list of responses.
 *
 * @param responses - An array of response definitions.
 * @returns The successful response definition, or undefined if none exists.
 */
export function getSuccessfulResponse(
  responses: ResponseDefinition[],
): ResponseDefinition | undefined {
  const successResponses = responses.filter(
    (response) => response.status >= 200 && response.status < 300,
  );

  if (successResponses.length !== 1) {
    throw new Error(
      '[EndpointDecorator] Each endpoint requires one successful response (status 2XX).',
    );
  }

  return successResponses[0];
}

/**
 * Applies the API response metadata for each defined response.
 *
 * @param responses - An array of response definitions.
 * @param metadata - The metadata of the method to which the decorator is applied.
 */
export function applyApiResponses(
  responses: ResponseDefinition[],
  metadata: MethodMetadata,
): void {
  responses.forEach((response) =>
    ApiResponse({
      status: response.status,
      description: response.description,
      type: response.type,
      isArray: response.isArray,
    })(metadata.target, metadata.key, metadata.descriptor),
  );
}

/**
 * Applies global API responses for client-side and server-side exceptions.
 *
 * @param metadata - The metadata of the method to which the decorator is applied.
 */
export function applyGlobalApiResponses(metadata: MethodMetadata): void {
  ApiResponse({
    status: 403,
    description: 'Client-side exception',
    type: ExceptionResponse,
  })(metadata.target, metadata.key, metadata.descriptor);

  ApiResponse({
    status: 404,
    description: 'Server-side exception',
    type: ServerExceptionResponse,
  })(metadata.target, metadata.key, metadata.descriptor);
}
export function applyHttpCode(status: number, metadata: MethodMetadata): void {
  HttpCode(status)(metadata.target, metadata.key, metadata.descriptor);
}

export function applyPaginationResponse(
  paginationDto: any,
  metadata: MethodMetadata,
): void {
  ApiPaginatedResponse(paginationDto)(
    metadata.target,
    metadata.key,
    metadata.descriptor,
  );
}

/**
 * Applies the API operation metadata to the method.
 *
 * @param summary - A brief summary of the API operation.
 * @param metadata - The metadata of the method to which the decorator is applied.
 */
export function applyApiOperation(
  summary: string,
  metadata: MethodMetadata,
): void {
  ApiOperation({ summary })(metadata.target, metadata.key, metadata.descriptor);
}
