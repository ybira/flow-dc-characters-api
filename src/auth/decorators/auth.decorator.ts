import { JwtAuthGuard } from '@api/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@api/auth/guards/roles.guard';
import { Role } from '@api/database/entities/user.entity';
import { ApiError } from '@api/shared/models/api-error.model';
import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiUnauthorizedResponse({ description: 'Unauthorized', type: ApiError }),
    ApiForbiddenResponse({ description: 'Insufficient Permission', type: ApiError }),
  );
}
