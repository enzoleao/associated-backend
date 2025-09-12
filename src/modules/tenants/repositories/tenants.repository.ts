import { Tenant } from '@prisma/client';

export interface ITenantsRepository {
  getTenantInformations(): Promise<Partial<Tenant> | null>;
}
