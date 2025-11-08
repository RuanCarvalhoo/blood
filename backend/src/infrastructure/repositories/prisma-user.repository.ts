import { Injectable } from "@nestjs/common";
import { User as PrismaUser } from "@prisma/client";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import {
  IUserRepository,
  CreateUserDTO,
  UpdateUserDTO,
} from "@/domain/repositories/user.repository";
import { ID } from "@/domain/enums/enums";
import { UserEntity } from "@/domain/entities/user.entity";
import { EnumMapper } from "@/infrastructure/mappers/enum.mapper";

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(prismaUser: PrismaUser): UserEntity {
    const entity = new UserEntity();
    entity.id = prismaUser.id;
    entity.name = prismaUser.name;
    entity.email = prismaUser.email;
    entity.telephone = prismaUser.telephone;
    entity.password = prismaUser.password;
    entity.bloodType = EnumMapper.toDomainBloodType(prismaUser.bloodType);
    entity.gender = EnumMapper.toDomainGender(prismaUser.gender);
    entity.level = prismaUser.level;
    entity.points = prismaUser.points;
    entity.totalDonations = prismaUser.totalDonations;
    entity.lastDonationDate = prismaUser.lastDonationDate;
    entity.nextDonationDate = prismaUser.nextDonationDate;
    entity.createdAt = prismaUser.createdAt;
    entity.updatedAt = prismaUser.updatedAt;
    return entity;
  }

  private toSafeDomain(prismaUser: PrismaUser): Omit<UserEntity, "password"> {
    const entity = this.toDomain(prismaUser);
    const { password, ...safe } = entity;
    return safe;
  }

  async create(data: CreateUserDTO): Promise<UserEntity> {
    const created = await this.prisma.user.create({
      data: {
        name: data.name,
        telephone: data.telephone,
        email: data.email,
        password: data.password,
        bloodType: EnumMapper.toPrismaBloodType(data.bloodType),
        gender: EnumMapper.toPrismaGender(data.gender),
        level: data.level ?? 1,
        points: data.points ?? 0,
        totalDonations: data.totalDonations ?? 0,
        lastDonationDate: data.lastDonationDate ?? null,
        nextDonationDate: data.nextDonationDate ?? null,
      },
    });
    return this.toDomain(created);
  }

  async findAll(): Promise<Array<Omit<UserEntity, "password">>> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.toSafeDomain(user));
  }

  async findActive(): Promise<Array<Omit<UserEntity, "password">>> {
    return this.findAll();
  }

  async findById(id: ID): Promise<Omit<UserEntity, "password"> | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? this.toSafeDomain(user) : null;
  }

  async update(
    id: ID,
    data: UpdateUserDTO
  ): Promise<Omit<UserEntity, "password">> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        telephone: data.telephone,
        email: data.email,
        bloodType: data.bloodType
          ? EnumMapper.toPrismaBloodType(data.bloodType)
          : undefined,
        gender: data.gender
          ? EnumMapper.toPrismaGender(data.gender)
          : undefined,
        level: data.level,
        points: data.points,
        totalDonations: data.totalDonations,
        lastDonationDate: data.lastDonationDate,
        nextDonationDate: data.nextDonationDate,
        password: data.password,
      },
    });
    return this.toSafeDomain(updated);
  }

  async softDelete(id: ID): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? this.toDomain(user) : null;
  }

  async incrementDonationStats(
    id: ID,
    pointsEarned: number,
    nextDonationDate: Date | null
  ): Promise<Omit<UserEntity, "password">> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("User not found");

    const newPoints = user.points + pointsEarned;
    const newLevel = this.calculateLevel(newPoints);

    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        points: newPoints,
        level: newLevel,
        totalDonations: { increment: 1 },
        nextDonationDate,
      },
    });
    return this.toSafeDomain(updated);
  }

  private calculateLevel(points: number): number {
    if (points >= 32000) return 10;
    if (points >= 16000) return 9;
    if (points >= 8000) return 8;
    if (points >= 4000) return 7;
    if (points >= 2000) return 6;
    if (points >= 1000) return 5;
    if (points >= 600) return 4;
    if (points >= 300) return 3;
    if (points >= 100) return 2;
    return 1;
  }

  async attachBadge(userId: ID, badgeId: ID): Promise<void> {
    await this.prisma.userBadge.create({ data: { userId, badgeId } });
  }
}
