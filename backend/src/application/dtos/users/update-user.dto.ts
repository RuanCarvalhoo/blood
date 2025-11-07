import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
  MinLength,
} from "class-validator";
import { Transform } from "class-transformer";
import { BloodType, Gender } from "@/domain/enums/enums";

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: "O nome deve ser uma string." })
  @Length(3, 255, { message: "O nome deve ter entre 3 e 255 caracteres." })
  name?: string;

  @IsOptional()
  @IsString({ message: "O telefone deve ser uma string." })
  @Matches(/^\+?[0-9\s\-()]{8,20}$/u, {
    message:
      "Telefone inválido. Utilize apenas dígitos e caracteres + - ( ) espaço, entre 8 e 20 caracteres.",
  })
  telephone?: string;

  @IsOptional()
  @IsEmail({}, { message: "O email fornecido não é válido." })
  @Transform(({ value }) => value?.toLowerCase().trim())
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: "A senha deve ter no mínimo 8 caracteres." })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/u,
    {
      message:
        "A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caractere especial (@$!%*?&).",
    }
  )
  password?: string;

  @IsOptional()
  @IsEnum(BloodType, { message: "O tipo sanguíneo fornecido não é válido." })
  bloodType?: BloodType;

  @IsOptional()
  @IsEnum(Gender, { message: "O gênero fornecido não é válido." })
  gender?: Gender;
}
