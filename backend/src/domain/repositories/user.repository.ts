import { ID } from "@/domain/enums/enums";
import { UserEntity } from "@/domain/entities/user.entity";

export const IUserRepository = Symbol("IUserRepository");
export type CreateUserDTO = Omit<
  UserEntity,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "badges"
  | "donations"
  | "resetToken"
  | "resetTokenExpiry"
> & {
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
};

export type UpdateUserDTO = Partial<
  Omit<
    UserEntity,
    "id" | "createdAt" | "updatedAt" | "badges" | "donations" | "password"
  > & {
    password?: string;
  }
>;

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<UserEntity>;
  findAll(): Promise<Array<Omit<UserEntity, "password">>>;
  findById(id: ID): Promise<Omit<UserEntity, "password"> | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  update(id: ID, data: UpdateUserDTO): Promise<Omit<UserEntity, "password">>;
  softDelete(id: ID): Promise<void>;
  incrementDonationStats(
    id: ID,
    pointsEarned: number,
    nextDonationDate: Date | null
  ): Promise<Omit<UserEntity, "password">>;
  attachBadge(userId: ID, badgeId: ID): Promise<void>;
}
