import { Module } from "@nestjs/common";
import { PrismaModule } from "@/infrastructure/prisma/prisma.module";
import { PrismaUserRepository } from "@/infrastructure/repositories/prisma-user.repository";
import { IUserRepository } from "@/domain/repositories/user.repository";

@Module({
  imports: [PrismaModule],
  providers: [{ provide: IUserRepository, useClass: PrismaUserRepository }],
  exports: [PrismaModule, IUserRepository],
})
export class InfrastructureModule {}
