import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { IUserBadgeRepository } from "@/domain/repositories/user-badge.repository";
import {
  BADGES,
  BadgeDefinition,
  getBadgesForDonationCount,
} from "@/domain/constants/badges.constants";

@Injectable()
export class BadgesService {
  constructor(
    @Inject(IUserBadgeRepository)
    private readonly userBadgeRepository: IUserBadgeRepository
  ) {}

  findAll(): BadgeDefinition[] {
    return [...BADGES];
  }


  findById(id: string): BadgeDefinition {
    const badge = BADGES.find((b) => b.id === id);
    if (!badge) throw new NotFoundException("Badge não encontrado");
    return badge;
  }

  async findUserBadges(userId: string) {
    const userBadges = await this.userBadgeRepository.findByUserId(userId);

    const badges = userBadges.map((ub) => {
      const badge = BADGES.find((b) => b.id === ub.badgeId);
      return {
        ...badge,
        earnedAt: ub.earnedAt,
      };
    });

    return badges;
  }

  async checkAndAwardBadges(
    userId: string,
    totalDonations: number
  ): Promise<BadgeDefinition[]> {
    const eligibleBadges = getBadgesForDonationCount(totalDonations);
    const newBadges: BadgeDefinition[] = [];

    for (const badge of eligibleBadges) {
      const hasBadge = await this.userBadgeRepository.userHasBadge(
        userId,
        badge.id
      );

      if (!hasBadge) {
        await this.userBadgeRepository.create({
          userId,
          badgeId: badge.id,
        });
        newBadges.push(badge);
      }
    }

    return newBadges;
  }
}
