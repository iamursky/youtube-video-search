import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

import { SearchVideosDto } from "./dto/seach-videos-query.dto";
import { SearchVideosResponseDto } from "./dto/search-videos-response.dto";
import { Video } from "./entities/video.entity";
import {
  YouTubeSearchResponse,
  YouTubeVideoResource,
  YouTubeVideosResponse,
} from "./interfaces/youtube";

@Injectable()
export class SearchService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async searchVideos(searchVideosDto: SearchVideosDto): Promise<SearchVideosResponseDto> {
    const searchResponse = await this.searchYouTubeVideos(searchVideosDto);
    const videoIds = searchResponse.items.map((item) => item.id.videoId);

    const listResponse = await this.listYouTubeVideos(videoIds);
    const videos = listResponse.items.map(this.transformResourceToVideo);

    return {
      videos,
      nextPageToken: searchResponse.nextPageToken,
      prevPageToken: searchResponse.prevPageToken,
    };
  }

  private async searchYouTubeVideos(
    searchVideosDto: SearchVideosDto,
  ): Promise<YouTubeSearchResponse> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append("key", this.configService.get("GOOGLE_API_KEY"));
    urlSearchParams.append("q", searchVideosDto.q);
    urlSearchParams.append("part", "id,snippet");
    urlSearchParams.append("type", "video");

    if (searchVideosDto.pageToken) {
      urlSearchParams.append("pageToken", searchVideosDto.pageToken);
    }

    return firstValueFrom(
      this.httpService.get<YouTubeSearchResponse>(
        `https://www.googleapis.com/youtube/v3/search?${urlSearchParams.toString()}`,
        { headers: { "Content-Type": "application/json; charset=utf-8" } },
      ),
    ).then((res) => res.data);
  }

  private async listYouTubeVideos(videoIds: string[]): Promise<YouTubeVideosResponse> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append("key", this.configService.get("GOOGLE_API_KEY"));
    urlSearchParams.append("part", "id,snippet,contentDetails,statistics");
    urlSearchParams.append("id", videoIds.join(","));

    return firstValueFrom(
      this.httpService.get<YouTubeVideosResponse>(
        `https://www.googleapis.com/youtube/v3/videos?${urlSearchParams.toString()}`,
        { headers: { "Content-Type": "application/json; charset=utf-8" } },
      ),
    ).then((res) => res.data);
  }

  private transformResourceToVideo(resource: YouTubeVideoResource): Video {
    return {
      id: resource.id,
      title: resource.snippet.title,
      duration: resource.contentDetails.duration,
      viewCount: resource.statistics.viewCount,
      channelId: resource.snippet.channelId,
      channelTitle: resource.snippet.channelTitle,
      thumbnails: resource.snippet.thumbnails,
    };
  }
}
