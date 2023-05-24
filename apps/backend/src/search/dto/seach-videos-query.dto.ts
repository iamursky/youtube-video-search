import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SearchVideosDto {
  @IsString()
  @IsNotEmpty()
  q: string;

  @IsString()
  @IsOptional()
  pageToken?: string;
}
