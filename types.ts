
export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface VideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard?: Thumbnail;
    maxres?: Thumbnail;
  };
  channelTitle: string;
}

export interface Video {
  kind: 'youtube#video';
  id: string;
  snippet: VideoSnippet;
}

export interface VideoListResponse {
  items: Video[];
}

export interface ChannelContentDetails {
  relatedPlaylists: {
    uploads: string;
  };
}

export interface Channel {
  kind: 'youtube#channel';
  id: string;
  contentDetails: ChannelContentDetails;
}

export interface ChannelListResponse {
  items: Channel[];
}


export interface PlaylistItemSnippet extends VideoSnippet {
  playlistId: string;
  position: number;
  resourceId: {
    kind: 'youtube#video';
    videoId: string;
  };
}

export interface PlaylistItem {
  kind: 'youtube#playlistItem';
  id: string;
  snippet: PlaylistItemSnippet;
}

export interface PlaylistItemListResponse {
  items: PlaylistItem[];
  nextPageToken?: string;
}
