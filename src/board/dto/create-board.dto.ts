import {
  IsBoolean,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";
export class CreateBoardDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  readonly title: string;

  @IsString()
  @MinLength(10)
  readonly description: string;

  @IsBoolean()
  readonly isPublic: boolean;
}