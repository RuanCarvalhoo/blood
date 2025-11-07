import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, Length, Matches } from "class-validator";
import { Transform } from "class-transformer";
import { BloodType, Gender } from "@/domain/enums/enums";

export class CreateUserDto {
  @IsNotEmpty({ message: "O nome não pode ser vazio." })
  @IsString({ message: "O nome deve ser uma string." })
  @Length(3, 255, { message: "O nome deve ter entre 3 e 255 caracteres." })
  name!: string;

  @IsNotEmpty({ message: "O telefone não pode ser vazio." })
  @IsString({ message: "O telefone deve ser uma string." })
  @Matches(/^\+?[0-9\s\-()]{8,20}$/, {
    message: "Telefone inválido. Utilize apenas dígitos e caracteres + - ( ) espaço, entre 8 e 20 caracteres.",
  })
  telephone!: string;

  @IsNotEmpty({ message: "O email não pode ser vazio." })
  @IsEmail({}, { message: "O email fornecido não é válido." })
  @Transform(({ value }) => value?.toLowerCase().trim())
  email!: string;

  @IsNotEmpty({ message: "A senha não pode ser vazia." })
  @IsString()
  @MinLength(8, { message: "A senha deve ter no mínimo 8 caracteres." })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: "A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caractere especial (@$!%*?&).",
  })
  password!: string;

  @IsNotEmpty({ message: "O tipo sanguíneo é obrigatório." })
  @IsEnum(BloodType, { message: "O tipo sanguíneo fornecido não é válido." })
  bloodType!: BloodType;

  @IsNotEmpty({ message: "O gênero é obrigatório." })
  @IsEnum(Gender, { message: "O gênero fornecido não é válido." })
  gender!: Gender;
}
