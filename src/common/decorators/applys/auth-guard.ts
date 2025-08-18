import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt.guard';
import { MethodMetadata } from '@/common/decorators/@types/endpoint-types';

export function applyAuthGuard(metadata: MethodMetadata): void {
  UseGuards(JwtAuthGuard)(metadata.target, metadata.key, metadata.descriptor);
}
