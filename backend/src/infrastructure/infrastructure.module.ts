import { Module, Global } from "@nestjs/common";
import { PrismaModule } from "@/infrastructure/prisma/prisma.module";
import { PrismaUserRepository } from "@/infrastructure/repositories/prisma-user.repository";
import { PrismaDonationRepository } from "@/infrastructure/repositories/prisma-donation.repository";
import { PrismaUserBadgeRepository } from "@/infrastructure/repositories/prisma-user-badge.repository";
import { IUserRepository } from "@/domain/repositories/user.repository";
import { IDonationRepository } from "@/domain/repositories/donation.repository";
import { IUserBadgeRepository } from "@/domain/repositories/user-badge.repository";

@Global()
@Module({
  imports: [PrismaModule],
  providers: [
    { provide: IUserRepository, useClass: PrismaUserRepository },
    { provide: IDonationRepository, useClass: PrismaDonationRepository },
    { provide: IUserBadgeRepository, useClass: PrismaUserBadgeRepository },
  ],
  exports: [
    PrismaModule,
    IUserRepository,
    IDonationRepository,
    IUserBadgeRepository,
  ],
})
export class InfrastructureModule {}
