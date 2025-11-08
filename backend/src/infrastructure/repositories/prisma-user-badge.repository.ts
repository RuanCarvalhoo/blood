import { Injectable } from "@nestjs/common";
import { UserBadge as PrismaUserBadge } from "@prisma/client";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import {
  IUserBadgeRepository,
  CreateUserBadgeDTO,
} from "@/domain/repositories/user-badge.repository";
import { ID } from "@/domain/enums/enums";
import { UserBadgeEntity } from "@/domain/entities/user-badge.entity";

@Injectable()
export class PrismaUserBadgeRepository implements IUserBadgeRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(prismaUserBadge: PrismaUserBadge): UserBadgeEntity {
    return {
      id: prismaUserBadge.id,
      userId: prismaUserBadge.userId,
      badgeId: prismaUserBadge.badgeId,
      earnedAt: prismaUserBadge.earnedAt,
    };
  }

  async create(data: CreateUserBadgeDTO): Promise<UserBadgeEntity> {
    const created = await this.prisma.userBadge.create({
      data: {
        userId: data.userId,
        badgeId: data.badgeId,
      },
    });

    return this.toDomain(created);
  }

  async findByUserId(userId: ID): Promise<UserBadgeEntity[]> {
    const userBadges = await this.prisma.userBadge.findMany({
      where: { userId },
      orderBy: { earnedAt: "desc" },
    });

    return userBadges.map((ub) => this.toDomain(ub));
  }

  async findByUserAndBadge(
    userId: ID,
    badgeId: ID
  ): Promise<UserBadgeEntity | null> {
    const userBadge = await this.prisma.userBadge.findFirst({
      where: { userId, badgeId },
    });

    return userBadge ? this.toDomain(userBadge) : null;
  }

  async userHasBadge(userId: ID, badgeId: ID): Promise<boolean> {
    const count = await this.prisma.userBadge.count({
      where: { userId, badgeId },
    });

    return count > 0;
  }
}
