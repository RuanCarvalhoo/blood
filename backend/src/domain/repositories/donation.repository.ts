import { ID } from "@/domain/enums/enums";
import { DonationEntity } from "@/domain/entities/donation.entity";

export const IDonationRepository = Symbol("IDonationRepository");

export type CreateDonationDTO = Omit<DonationEntity, "id" | "createdAt">;

export interface IDonationRepository {
  create(data: CreateDonationDTO): Promise<DonationEntity>;
  findById(id: ID): Promise<DonationEntity | null>;
  findAllByUserId(userId: ID): Promise<DonationEntity[]>;
  findAll(): Promise<DonationEntity[]>;
}