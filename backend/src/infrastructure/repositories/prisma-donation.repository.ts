import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import {
  IDonationRepository,
  CreateDonationDTO,
} from "@/domain/repositories/donation.repository";
import { ID } from "@/domain/enums/enums";
import { DonationEntity } from "@/domain/entities/donation.entity";
import { EnumMapper } from "@/infrastructure/mappers/enum.mapper";
import { Donation as PrismaDonation } from "@prisma/client";

@Injectable()
export class PrismaDonationRepository implements IDonationRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(prismaDonation: PrismaDonation): DonationEntity {
    return {
      id: prismaDonation.id,
      userId: prismaDonation.userId,
      date: prismaDonation.date,
      location: EnumMapper.toDomainHospitalName(prismaDonation.location),
      pointsEarned: prismaDonation.pointsEarned,
      createdAt: prismaDonation.createdAt,
    };
  }

  async create(data: CreateDonationDTO): Promise<DonationEntity> {
    const created = await this.prisma.donation.create({
      data: {
        userId: data.userId,
        date: data.date,
        location: EnumMapper.toPrismaHospitalName(data.location),
        pointsEarned: data.pointsEarned,
      },
    });

    return this.toDomain(created);
  }

  async findById(id: ID): Promise<DonationEntity | null> {
    const donation = await this.prisma.donation.findUnique({
      where: { id },
    });

    return donation ? this.toDomain(donation) : null;
  }

  async findAllByUserId(userId: ID): Promise<DonationEntity[]> {
    const donations = await this.prisma.donation.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    return donations.map((d) => this.toDomain(d));
  }

  async findAll(): Promise<DonationEntity[]> {
    const donations = await this.prisma.donation.findMany({
      orderBy: { date: "desc" },
    });

    return donations.map((d) => this.toDomain(d));
  }
}