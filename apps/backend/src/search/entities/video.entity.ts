export class Video {
  id: string;
  title: string;
  duration: string;
  viewCount: string;
  channelId: string;
  channelTitle: string;
  thumbnails: {
    [key: string]: {
      url: string;
      width: number;
      height: number;
    };
  };
}
