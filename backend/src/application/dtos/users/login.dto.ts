import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class LoginDto {
  @IsNotEmpty({ message: "O email não pode ser vazio." })
  @IsEmail({}, { message: "O email fornecido não é válido." })
  @Transform(({ value }) => value?.toLowerCase().trim())
  email!: string;

  @IsNotEmpty({ message: "A senha não pode ser vazia." })
  @IsString()
  @MinLength(8, { message: "A senha deve ter no mínimo 8 caracteres." })
  password!: string;
}
