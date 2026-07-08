import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RequirePermissions } from "../../common/security/permissions.decorator.js";
import { RbacGuard } from "../../common/security/rbac.guard.js";
import { CreateLabOrderDto, CreateLabTestDto, EnterLabResultDto, LabTenantQueryDto, UpdateSampleStatusDto } from "./dto/laboratory.dto.js";
import { LaboratoryService } from "./laboratory.service.js";

@ApiTags("laboratory")
@Controller("laboratory")
@UseGuards(RbacGuard)
export class LaboratoryController {
  constructor(private readonly laboratory: LaboratoryService) {}

  @Get("tests")
  @RequirePermissions("LAB_ORDER_MANAGE")
  listTests(@Query() query: LabTenantQueryDto) {
    return this.laboratory.listTests(query);
  }

  @Post("tests")
  @RequirePermissions("LAB_ORDER_MANAGE")
  createTest(@Body() dto: CreateLabTestDto) {
    return this.laboratory.createTest(dto);
  }

  @Get("orders")
  @RequirePermissions("LAB_ORDER_MANAGE")
  listOrders(@Query() query: LabTenantQueryDto) {
    return this.laboratory.listOrders(query);
  }

  @Post("orders")
  @RequirePermissions("LAB_ORDER_MANAGE")
  createOrder(@Body() dto: CreateLabOrderDto) {
    return this.laboratory.createOrder(dto);
  }

  @Patch("samples/:sampleId/status")
  @RequirePermissions("LAB_ORDER_MANAGE")
  updateSampleStatus(@Param("sampleId") sampleId: string, @Body() dto: UpdateSampleStatusDto) {
    return this.laboratory.updateSampleStatus(sampleId, dto);
  }

  @Post("orders/:orderId/results")
  @RequirePermissions("LAB_ORDER_MANAGE")
  enterResult(@Param("orderId") orderId: string, @Body() dto: EnterLabResultDto) {
    return this.laboratory.enterResult(orderId, dto);
  }
}
