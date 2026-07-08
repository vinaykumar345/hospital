import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TENANCY_REPOSITORY } from "./tenancy.constants.js";
import { CreateTenantDto, UpdateTenantBrandingDto } from "./dto/tenancy.dto.js";
import { TenancyRepository } from "./tenancy.repository.js";

@Injectable()
export class TenancyService {
  constructor(@Inject(TENANCY_REPOSITORY) private readonly repository: TenancyRepository) {}

  createTenant(dto: CreateTenantDto) {
    return this.repository.createTenant(dto);
  }

  async getTenant(tenantId: string) {
    const tenant = await this.repository.findTenantById(tenantId);
    if (!tenant) {
      throw new NotFoundException("Tenant not found.");
    }
    return tenant;
  }

  async resolveByDomain(domain: string) {
    const tenant = await this.repository.findTenantByDomain(domain);
    if (!tenant) {
      throw new NotFoundException("Tenant domain not found.");
    }
    return tenant;
  }

  async getBranding(tenantId: string) {
    await this.getTenant(tenantId);
    return this.repository.getBranding(tenantId);
  }

  async updateBranding(tenantId: string, dto: UpdateTenantBrandingDto) {
    await this.getTenant(tenantId);
    return this.repository.updateBranding(tenantId, dto);
  }
}
