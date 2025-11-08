import {
  BloodType as DomainBloodType,
  Gender as DomainGender,
  HospitalName as DomainHospitalName,
} from "@/domain/enums/enums";
import {
  BloodType as PrismaBloodType,
  Gender as PrismaGender,
  HospitalName as PrismaHospitalName,
} from "@prisma/client";

export class EnumMapper {
  // BloodType mappings
  private static readonly bloodTypeToPrisma: Record<
    DomainBloodType,
    PrismaBloodType
  > = {
    [DomainBloodType.A_POS]: PrismaBloodType.A_POS,
    [DomainBloodType.A_NEG]: PrismaBloodType.A_NEG,
    [DomainBloodType.B_POS]: PrismaBloodType.B_POS,
    [DomainBloodType.B_NEG]: PrismaBloodType.B_NEG,
    [DomainBloodType.AB_POS]: PrismaBloodType.AB_POS,
    [DomainBloodType.AB_NEG]: PrismaBloodType.AB_NEG,
    [DomainBloodType.O_POS]: PrismaBloodType.O_POS,
    [DomainBloodType.O_NEG]: PrismaBloodType.O_NEG,
  };

  private static readonly bloodTypeToDomain: Record<
    PrismaBloodType,
    DomainBloodType
  > = {
    [PrismaBloodType.A_POS]: DomainBloodType.A_POS,
    [PrismaBloodType.A_NEG]: DomainBloodType.A_NEG,
    [PrismaBloodType.B_POS]: DomainBloodType.B_POS,
    [PrismaBloodType.B_NEG]: DomainBloodType.B_NEG,
    [PrismaBloodType.AB_POS]: DomainBloodType.AB_POS,
    [PrismaBloodType.AB_NEG]: DomainBloodType.AB_NEG,
    [PrismaBloodType.O_POS]: DomainBloodType.O_POS,
    [PrismaBloodType.O_NEG]: DomainBloodType.O_NEG,
  };

  // Gender mappings
  private static readonly genderToPrisma: Record<DomainGender, PrismaGender> = {
    [DomainGender.MALE]: PrismaGender.MALE,
    [DomainGender.FEMALE]: PrismaGender.FEMALE,
  };

  private static readonly genderToDomain: Record<PrismaGender, DomainGender> = {
    [PrismaGender.MALE]: DomainGender.MALE,
    [PrismaGender.FEMALE]: DomainGender.FEMALE,
  };

  // HospitalName mappings
  private static readonly hospitalNameToPrisma: Record<
    DomainHospitalName,
    PrismaHospitalName
  > = {
    [DomainHospitalName.HOSPITAL_CENTRAL]: PrismaHospitalName.HOSPITAL_CENTRAL,
    [DomainHospitalName.HOSPITAL_SANTA_FE]:
      PrismaHospitalName.HOSPITAL_SANTA_FE,
    [DomainHospitalName.MATERNIDADE_SAO_JOSE]:
      PrismaHospitalName.MATERNIDADE_SAO_JOSE,
  };

  private static readonly hospitalNameToDomain: Record<
    PrismaHospitalName,
    DomainHospitalName
  > = {
    [PrismaHospitalName.HOSPITAL_CENTRAL]: DomainHospitalName.HOSPITAL_CENTRAL,
    [PrismaHospitalName.HOSPITAL_SANTA_FE]:
      DomainHospitalName.HOSPITAL_SANTA_FE,
    [PrismaHospitalName.MATERNIDADE_SAO_JOSE]:
      DomainHospitalName.MATERNIDADE_SAO_JOSE,
  };

  static toPrismaBloodType(domain: DomainBloodType): PrismaBloodType {
    return this.bloodTypeToPrisma[domain];
  }

  static toDomainBloodType(prisma: PrismaBloodType): DomainBloodType {
    return this.bloodTypeToDomain[prisma];
  }

  static toPrismaGender(domain: DomainGender): PrismaGender {
    return this.genderToPrisma[domain];
  }

  static toDomainGender(prisma: PrismaGender): DomainGender {
    return this.genderToDomain[prisma];
  }

  static toPrismaHospitalName(domain: DomainHospitalName): PrismaHospitalName {
    return this.hospitalNameToPrisma[domain];
  }

  static toDomainHospitalName(prisma: PrismaHospitalName): DomainHospitalName {
    return this.hospitalNameToDomain[prisma];
  }
}
