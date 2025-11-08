import { IsNotEmpty, IsDateString, IsEnum, IsUUID } from "class-validator";
import { HospitalName } from "@/domain/enums/enums";

export class RegisterDonationDto {
  @IsNotEmpty({ message: "O ID do doador é obrigatório." })
  @IsUUID("4", { message: "O ID do doador deve ser um UUID válido." })
  userId!: string;

  @IsNotEmpty({ message: "A data da doação é obrigatória." })
  @IsDateString({}, { message: "A data deve estar no formato ISO 8601." })
  date!: string;

  @IsNotEmpty({ message: "O local da doação é obrigatório." })
  @IsEnum(HospitalName, { message: "Hospital inválido." })
  location!: HospitalName;

}