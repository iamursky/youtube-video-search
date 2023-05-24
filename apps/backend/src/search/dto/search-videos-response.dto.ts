import { Video } from "../entities/video.entity";

export class SearchVideosResponseDto {
  nextPageToken?: string | undefined;
  prevPageToken?: string | undefined;
  videos: Video[];
}
