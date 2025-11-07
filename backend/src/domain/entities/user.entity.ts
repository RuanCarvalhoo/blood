import { BloodType, Gender, ID } from "@/domain/enums/enums";
import { UserBadgeEntity } from "@/domain/entities/user-badge.entity";
import { DonationEntity } from "@/domain/entities/donation.entity";

export class UserEntity {
  id!: ID;
  name!: string;
  email!: string;
  telephone!: string;
  password!: string;
  bloodType!: BloodType;
  gender!: Gender;
  level!: number;
  points!: number;
  totalDonations!: number;
  lastDonationDate?: Date | null;
  nextDonationDate?: Date | null;
  badges?: UserBadgeEntity[];
  donations?: DonationEntity[];
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}
