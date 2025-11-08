import { ID } from "@/domain/enums/enums";
import { UserBadgeEntity } from "@/domain/entities/user-badge.entity";

export const IUserBadgeRepository = Symbol("IUserBadgeRepository");

export type CreateUserBadgeDTO = Omit<UserBadgeEntity, "id" | "earnedAt">;

export interface IUserBadgeRepository {
  create(data: CreateUserBadgeDTO): Promise<UserBadgeEntity>;
  findByUserId(userId: ID): Promise<UserBadgeEntity[]>;
  findByUserAndBadge(userId: ID, badgeId: ID): Promise<UserBadgeEntity | null>;
  userHasBadge(userId: ID, badgeId: ID): Promise<boolean>;
}
