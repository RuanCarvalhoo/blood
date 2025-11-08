import { Controller, Get, Param } from "@nestjs/common";
import { BadgesService } from "./badges.service";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("badges")
@Controller("badges")
export class BadgesController {
  constructor(private readonly badgesService: BadgesService) {}

  @Get()
  @ApiOperation({ summary: "Listar todos os badges disponíveis" })
  @ApiResponse({ status: 200, description: "Lista de badges retornada" })
  findAll() {
    return this.badgesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar badge por ID" })
  @ApiResponse({ status: 200, description: "Badge encontrado" })
  @ApiResponse({ status: 404, description: "Badge não encontrado" })
  findById(@Param("id") id: string) {
    return this.badgesService.findById(id);
  }

  @Get("user/:userId")
  @ApiOperation({ summary: "Listar badges conquistados por um usuário" })
  @ApiResponse({ status: 200, description: "Lista de badges do usuário" })
  async findUserBadges(@Param("userId") userId: string) {
    return this.badgesService.findUserBadges(userId);
  }
}
