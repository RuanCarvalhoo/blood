import { HospitalName, ID, DEFAULT_POINTS_EARNED } from "@/domain/enums/enums";

export class DonationEntity {
  id!: ID;
  userId!: ID;
  date!: Date;
  location!: HospitalName;
  pointsEarned: number = DEFAULT_POINTS_EARNED;
  createdAt!: Date;
}
