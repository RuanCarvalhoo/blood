import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { DonationsService } from "./donations.service";
import { RegisterDonationDto } from "@/application/dtos/donations/register-donation.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("donations")
@Controller("donations")
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  @ApiOperation({ summary: "Registrar nova doação" })
  @ApiResponse({ status: 201, description: "Doação registrada com sucesso" })
  @ApiResponse({ status: 400, description: "Intervalo mínimo não respeitado" })
  @ApiResponse({ status: 404, description: "Usuário não encontrado" })
  async register(@Body() dto: RegisterDonationDto) {
    return this.donationsService.register(dto);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Listar doações de um usuário" })
  @ApiResponse({ status: 200, description: "Lista de doações retornada" })
  @ApiResponse({ status: 404, description: "Usuário não encontrado" })
  async findAllByUser(@Param("userId") userId: string) {
    return this.donationsService.findAllByUser(userId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar doação por ID" })
  @ApiResponse({ status: 200, description: "Doação encontrada" })
  @ApiResponse({ status: 404, description: "Doação não encontrada" })
  async findById(@Param("id") id: string) {
    return this.donationsService.findById(id);
  }
}