import {
  BloodType as DomainBloodType,
  Gender as DomainGender,
} from "@/domain/enums/enums";
import {
  BloodType as PrismaBloodType,
  Gender as PrismaGender,
} from "@prisma/client";

/**
 * Mapper utility for converting between domain enums and Prisma enums.
 * This eliminates unsafe type casting and provides explicit, type-safe conversions.
 */
export class EnumMapper {
  /**
   * Converts domain BloodType to Prisma BloodType
   */
  static toPrismaBloodType(domainBloodType: DomainBloodType): PrismaBloodType {
    const mapping: Record<DomainBloodType, PrismaBloodType> = {
      [DomainBloodType.A_POS]: PrismaBloodType.A_POS,
      [DomainBloodType.A_NEG]: PrismaBloodType.A_NEG,
      [DomainBloodType.B_POS]: PrismaBloodType.B_POS,
      [DomainBloodType.B_NEG]: PrismaBloodType.B_NEG,
      [DomainBloodType.AB_POS]: PrismaBloodType.AB_POS,
      [DomainBloodType.AB_NEG]: PrismaBloodType.AB_NEG,
      [DomainBloodType.O_POS]: PrismaBloodType.O_POS,
      [DomainBloodType.O_NEG]: PrismaBloodType.O_NEG,
    };

    return mapping[domainBloodType];
  }

  /**
   * Converts Prisma BloodType to domain BloodType
   */
  static toDomainBloodType(prismaBloodType: PrismaBloodType): DomainBloodType {
    const mapping: Record<PrismaBloodType, DomainBloodType> = {
      [PrismaBloodType.A_POS]: DomainBloodType.A_POS,
      [PrismaBloodType.A_NEG]: DomainBloodType.A_NEG,
      [PrismaBloodType.B_POS]: DomainBloodType.B_POS,
      [PrismaBloodType.B_NEG]: DomainBloodType.B_NEG,
      [PrismaBloodType.AB_POS]: DomainBloodType.AB_POS,
      [PrismaBloodType.AB_NEG]: DomainBloodType.AB_NEG,
      [PrismaBloodType.O_POS]: DomainBloodType.O_POS,
      [PrismaBloodType.O_NEG]: DomainBloodType.O_NEG,
    };

    return mapping[prismaBloodType];
  }

  /**
   * Converts domain Gender to Prisma Gender
   */
  static toPrismaGender(domainGender: DomainGender): PrismaGender {
    const mapping: Record<DomainGender, PrismaGender> = {
      [DomainGender.MALE]: PrismaGender.MALE,
      [DomainGender.FEMALE]: PrismaGender.FEMALE,
    };

    return mapping[domainGender];
  }

  /**
   * Converts Prisma Gender to domain Gender
   */
  static toDomainGender(prismaGender: PrismaGender): DomainGender {
    const mapping: Record<PrismaGender, DomainGender> = {
      [PrismaGender.MALE]: DomainGender.MALE,
      [PrismaGender.FEMALE]: DomainGender.FEMALE,
    };

    return mapping[prismaGender];
  }
}
