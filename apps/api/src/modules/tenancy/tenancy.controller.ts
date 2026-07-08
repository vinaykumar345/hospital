import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateTenantDto, UpdateTenantBrandingDto } from "./dto/tenancy.dto.js";
import { TenancyService } from "./tenancy.service.js";

@ApiTags("tenancy")
@Controller("tenants")
export class TenancyController {
  constructor(private readonly tenancy: TenancyService) {}

  @Post()
  createTenant(@Body() dto: CreateTenantDto) {
    return this.tenancy.createTenant(dto);
  }

  @Get("domain/:domain")
  resolveByDomain(@Param("domain") domain: string) {
    return this.tenancy.resolveByDomain(domain);
  }

  @Get(":tenantId")
  getTenant(@Param("tenantId") tenantId: string) {
    return this.tenancy.getTenant(tenantId);
  }

  @Get(":tenantId/branding")
  getBranding(@Param("tenantId") tenantId: string) {
    return this.tenancy.getBranding(tenantId);
  }

  @Patch(":tenantId/branding")
  updateBranding(@Param("tenantId") tenantId: string, @Body() dto: UpdateTenantBrandingDto) {
    return this.tenancy.updateBranding(tenantId, dto);
  }
}
