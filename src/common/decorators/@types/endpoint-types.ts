/**
 * Represents the list of available HTTP methods
 */
export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PATCH'
  | 'PUT'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD';

/**
 * Represents the metadata required to decorate a class method.
 */
export interface MethodMetadata {
  target: object;
  key: string;
  descriptor: PropertyDescriptor;
}

/**
 * Represents the proproperties of each OpenAPI (Swagger) response
 */
export interface ResponseDefinition {
  status: number;
  description: string;
  type: any;
  isArray?: boolean;
}

export type EndpointParams = {
  method: HttpMethod;
  summary?: string;
  isProtectedRoute?: boolean;
  paginationDto?: any;
  route?: string;
  responses?: ResponseDefinition[];
  uploadDir?: string;
};
