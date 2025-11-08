import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { InfrastructureModule } from "@/infrastructure/infrastructure.module";

@Module({
  imports: [InfrastructureModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
