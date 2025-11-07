import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "@/users/users.service";
import { CreateUserDto } from "@/application/dtos/users/create-user.dto";
import { LoginDto } from "@/application/dtos/users/login.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("register")
  register(@Body() dto: CreateUserDto) {
    return this.usersService.register(dto);
  }

  @Post("login")
  login(@Body() body: LoginDto) {
    return this.usersService.login(body.email, body.password);
  }

  @Get(":id")
  getProfile(@Param("id") id: string) {
    return this.usersService.profile(id);
  }
}
