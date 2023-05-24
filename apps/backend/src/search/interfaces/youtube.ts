// https://developers.google.com/youtube/v3/docs/search#resource
export class YouTubeSearchResource {
  id: {
    kind: "youtube#video";
    videoId: string;
  };

  snippet: {
    title: string;
    description: string;
    publishedAt: number;
    channelId: string;
    channelTitle: string;
    thumbnails: {
      [key: string]: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
}

// https://developers.google.com/youtube/v3/docs/search/list#response
export class YouTubeSearchResponse {
  kind: "youtube#searchListResponse";

  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;

  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };

  items: YouTubeSearchResource[];
}

// https://developers.google.com/youtube/v3/docs/videos#resource
export class YouTubeVideoResource {
  id: string;

  snippet: {
    title: string;
    description: string;
    channelId: string;
    channelTitle: string;
    thumbnails: {
      [key: string]: {
        url: string;
        width: number;
        height: number;
      };
    };
  };

  contentDetails: {
    duration: string;
  };

  statistics: {
    viewCount: string;
  };
}

// https://developers.google.com/youtube/v3/docs/videos/list#response
export class YouTubeVideosResponse {
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };

  items: YouTubeVideoResource[];
}
