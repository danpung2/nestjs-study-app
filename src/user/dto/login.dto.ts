import { IsEmail, IsString, Matches } from "class-validator";

export class LoginDto {
  @IsEmail()
  email: string;
  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/, {
    message: "password format is incorrect"
  })
  password: string;
}