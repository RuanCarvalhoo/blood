import {
  ConflictException,
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { RegisterDonationDto } from "@/application/dtos/donations/register-donation.dto";
import { IUserRepository } from "@/domain/repositories/user.repository";
import { IDonationRepository } from "@/domain/repositories/donation.repository";
import {
  DONATION_INTERVAL_DAYS,
  DEFAULT_POINTS_EARNED,
} from "@/domain/enums/enums";
import { BadgesService } from "@/badges/badges.service";

@Injectable()
export class DonationsService {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(IDonationRepository)
    private readonly donationRepository: IDonationRepository,
    private readonly badgesService: BadgesService
  ) {}

  async register(data: RegisterDonationDto) {
    const user = await this.userRepository.findById(data.userId);
    if (!user) throw new NotFoundException("Usuário não encontrado");

    if (user.lastDonationDate) {
      const intervalDays = DONATION_INTERVAL_DAYS[user.gender];
      const nextAllowedDate = new Date(user.lastDonationDate);
      nextAllowedDate.setDate(nextAllowedDate.getDate() + intervalDays);

      const donationDate = new Date(data.date);

      if (donationDate < nextAllowedDate) {
        throw new BadRequestException(
          `Você poderá doar novamente apenas após ${nextAllowedDate.toLocaleDateString(
            "pt-BR"
          )}`
        );
      }
    }

    const donation = await this.donationRepository.create({
      userId: data.userId,
      date: new Date(data.date),
      location: data.location,
      pointsEarned: DEFAULT_POINTS_EARNED,
    });

    const nextDonationDate = new Date(data.date);
    const intervalDays = DONATION_INTERVAL_DAYS[user.gender];
    nextDonationDate.setDate(nextDonationDate.getDate() + intervalDays);

    const updatedUser = await this.userRepository.incrementDonationStats(
      data.userId,
      DEFAULT_POINTS_EARNED,
      nextDonationDate
    );

    const newBadges = await this.badgesService.checkAndAwardBadges(
      data.userId,
      updatedUser.totalDonations
    );

    return {
      donation,
      user: updatedUser,
      newBadges,
    };
  }

  async findAllByUser(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException("Usuário não encontrado");

    return this.donationRepository.findAllByUserId(userId);
  }

  async findById(id: string) {
    const donation = await this.donationRepository.findById(id);
    if (!donation) throw new NotFoundException("Doação não encontrada");
    return donation;
  }
}
