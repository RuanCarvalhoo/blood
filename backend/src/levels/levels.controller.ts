import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LevelsService } from "./levels.service";

@ApiTags("levels")
@Controller("levels")
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Get()
  @ApiOperation({ summary: "Listar todos os níveis disponíveis" })
  @ApiResponse({ status: 200, description: "Lista de níveis retornada" })
  findAll() {
    return this.levelsService.findAll();
  }

  @Get(":level")
  @ApiOperation({ summary: "Buscar informações de um nível específico" })
  @ApiResponse({ status: 200, description: "Nível encontrado" })
  @ApiResponse({ status: 404, description: "Nível não encontrado" })
  findByLevel(@Param("level", ParseIntPipe) level: number) {
    return this.levelsService.findByLevel(level);
  }

  @Get("calculate/:points")
  @ApiOperation({ summary: "Calcular nível baseado em pontos" })
  @ApiResponse({ status: 200, description: "Nível calculado" })
  calculateLevel(@Param("points", ParseIntPipe) points: number) {
    return this.levelsService.getUserLevelInfo(points);
  }
}
