import { IsNotEmpty, IsString } from "class-validator";

export class SearchVideosDto {
  @IsString()
  @IsNotEmpty()
  q: string;
}
