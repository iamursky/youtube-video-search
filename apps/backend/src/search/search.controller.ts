import { Controller, Get, Query } from "@nestjs/common";

import { SearchVideosDto } from "./dto/seach-videos.dto";
import { SearchService } from "./search.service";

@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get("video")
  searchVideo(@Query() searchVideosDto: SearchVideosDto) {
    return this.searchService.searchVideos(searchVideosDto);
  }
}
