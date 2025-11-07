import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import {
  BloodType as PrismaBloodType,
  Gender as PrismaGender,
} from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaService } from "@/infrastructure/prisma/prisma.service";
import { env } from "../config/env";
import { CreateUserDto } from "@/application/dtos/users/create-user.dto";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async register(data: CreateUserDto) {
    const emailExists = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (emailExists) throw new ConflictException("Email already registered");
    const hashed = await bcrypt.hash(data.password, 10);
    const created = await this.prisma.user.create({
      data: {
        name: data.name,
        telephone: data.telephone,
        email: data.email,
        password: hashed,
        bloodType: data.bloodType as unknown as PrismaBloodType,
        gender: data.gender as unknown as PrismaGender,
      },
    });
    // Remove password before returning
    const { password, ...safe } = created as any;
    return safe;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException("Invalid credentials");
    const match = await bcrypt.compare(password, (user as any).password);
    if (!match) throw new UnauthorizedException("Invalid credentials");
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { password: _p, ...safe } = user as any;
    return { token, user: safe };
  }

  async profile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        telephone: true,
        email: true,
        bloodType: true,
        gender: true,
        level: true,
        points: true,
        totalDonations: true,
        lastDonationDate: true,
        nextDonationDate: true,
        createdAt: true,
      },
    });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }
}
