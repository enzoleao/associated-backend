import { Tenant, TenantAddress } from '@prisma/client';

export interface ITenantsRepository {
  getTenantInformations(): Promise<Partial<Tenant> | null>;
  getTenantAddress(): Promise<Partial<TenantAddress> | null> 
}
