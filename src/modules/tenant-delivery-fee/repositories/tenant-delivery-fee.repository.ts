import { TenantDeliveryFee } from "@prisma/client";

export interface ITenantDeliveryFeeRepository {
    getDeliveryFee(distance: number): Promise<Partial<TenantDeliveryFee>>;
}
