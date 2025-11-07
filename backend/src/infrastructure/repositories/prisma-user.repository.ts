import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import {
  IUserRepository,
  CreateUserDTO,
  UpdateUserDTO,
} from "@/domain/repositories/user.repository";
import { ID } from "@/domain/enums/enums";
import { UserEntity } from "@/domain/entities/user.entity";

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO): Promise<UserEntity> {
    const created = await this.prisma.user.create({
      data: {
        name: data.name,
        telephone: data.telephone,
        email: data.email,
        password: data.password,
        bloodType: data.bloodType,
        gender: data.gender,
        level: data.level ?? 1,
        points: data.points ?? 0,
        totalDonations: data.totalDonations ?? 0,
        lastDonationDate: data.lastDonationDate ?? null,
        nextDonationDate: data.nextDonationDate ?? null,
      },
    });
    return created as unknown as UserEntity;
  }

  async findAll(): Promise<Array<Omit<UserEntity, "password">>> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        telephone: true,
        bloodType: true,
        gender: true,
        level: true,
        points: true,
        totalDonations: true,
        lastDonationDate: true,
        nextDonationDate: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users as any;
  }

  async findActive(): Promise<Array<Omit<UserEntity, "password">>> {
    // No status column in schema; treat all users as active
    return this.findAll();
  }

  async findById(id: ID): Promise<Omit<UserEntity, "password"> | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        telephone: true,
        bloodType: true,
        gender: true,
        level: true,
        points: true,
        totalDonations: true,
        lastDonationDate: true,
        nextDonationDate: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return (user as any) ?? null;
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
        bloodType: data.bloodType,
        gender: data.gender,
        level: data.level,
        points: data.points,
        totalDonations: data.totalDonations,
        lastDonationDate: data.lastDonationDate,
        nextDonationDate: data.nextDonationDate,
        password: data.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        telephone: true,
        bloodType: true,
        gender: true,
        level: true,
        points: true,
        totalDonations: true,
        lastDonationDate: true,
        nextDonationDate: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return updated as any;
  }

  async softDelete(id: ID): Promise<void> {
    // No status column; perform hard delete
    await this.prisma.user.delete({ where: { id } });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return (user as any) ?? null;
  }

  async incrementDonationStats(
    id: ID,
    pointsEarned: number,
    nextDonationDate: Date | null
  ): Promise<Omit<UserEntity, "password">> {
    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        points: { increment: pointsEarned },
        totalDonations: { increment: 1 },
        nextDonationDate,
      },
      select: {
        id: true,
        name: true,
        email: true,
        telephone: true,
        bloodType: true,
        gender: true,
        level: true,
        points: true,
        totalDonations: true,
        lastDonationDate: true,
        nextDonationDate: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return updated as any;
  }

  async attachBadge(userId: ID, badgeId: ID): Promise<void> {
    await this.prisma.userBadge.create({ data: { userId, badgeId } });
  }
}
