import {
  ConflictException,
  Injectable,
  Inject,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateUserDto } from "@/application/dtos/users/create-user.dto";
import {
  IUserRepository,
  CreateUserDTO,
} from "@/domain/repositories/user.repository";

@Injectable()
export class UsersService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly configService: ConfigService
  ) {}

  async register(data: CreateUserDto) {
    const emailExists = await this.userRepository.findByEmail(data.email);
    if (emailExists) throw new ConflictException("Email already registered");

    const hashed = await bcrypt.hash(data.password, 10);

    const createData: CreateUserDTO = {
      name: data.name,
      telephone: data.telephone,
      email: data.email,
      password: hashed,
      bloodType: data.bloodType,
      gender: data.gender,
      level: 1,
      points: 0,
      totalDonations: 0,
      lastDonationDate: null,
      nextDonationDate: null,
    };

    const created = await this.userRepository.create(createData);

    // Remove password before returning
    const { password, ...safe } = created;
    return safe;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException("Invalid credentials");

    const jwtSecret = this.configService.get<string>("auth.jwtSecret");
    if (!jwtSecret) throw new Error("JWT_SECRET not configured");

    const token = jwt.sign({ sub: user.id }, jwtSecret, {
      expiresIn: "7d",
    });

    const { password: _p, ...safe } = user;
    return { token, user: safe };
  }

  async profile(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  async listAll() {
    return this.userRepository.findAll();
  }
}
