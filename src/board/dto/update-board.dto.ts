import { IsBoolean, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateBoardDto {
  @IsNotEmpty()
  @IsString()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  readonly description: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly isPublic: boolean;
}