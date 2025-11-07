import { ID } from "@/domain/enums/enums";

export class UserBadgeEntity {
  id!: ID;
  userId!: ID;
  badgeId!: ID;
  earnedAt!: Date;
}
