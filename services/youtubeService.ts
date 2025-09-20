import type { VideoListResponse, ChannelListResponse, PlaylistItemListResponse, PlaylistItem } from '../types';
import { API_BASE_URL, YOUTUBE_API_KEY } from '../constants';

const handleApiError = async (response: Response, defaultMessage: string) => {
  if (response.ok) {
    return; // Request was successful
  }

  let errorMessage = defaultMessage;
  try {
    const errorData = await response.json();
    // Use the specific message from the API error response if available
    if (errorData?.error?.message) {
      errorMessage = `YouTube API Error: ${errorData.error.message}`;
    }
  } catch (jsonError) {
    // If the response is not JSON or another error occurs during parsing
    errorMessage = `${defaultMessage} (Status: ${response.status} ${response.statusText})`;
  }
  throw new Error(errorMessage);
};


const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

const getVideoDetails = async (videoId: string) => {
  const url = `${API_BASE_URL}/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`;
  const response = await fetch(url);
  await handleApiError(response, 'Failed to fetch video details from YouTube API.');
  const data: VideoListResponse = await response.json();
  return data.items[0] ?? null;
};

const getChannelUploadsPlaylistId = async (channelId: string) => {
  const url = `${API_BASE_URL}/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_API_KEY}`;
  const response = await fetch(url);
  await handleApiError(response, 'Failed to fetch channel details from YouTube API.');
  const data: ChannelListResponse = await response.json();
  return data.items[0]?.contentDetails.relatedPlaylists.uploads ?? null;
};

const getAllPlaylistItems = async (playlistId: string): Promise<PlaylistItem[]> => {
  let allItems: PlaylistItem[] = [];
  let nextPageToken: string | undefined = undefined;

  do {
    let url = `${API_BASE_URL}/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${YOUTUBE_API_KEY}`;
    if (nextPageToken) {
      url += `&pageToken=${nextPageToken}`;
    }
    const response = await fetch(url);
    await handleApiError(response, 'Failed to fetch playlist items from YouTube API.');
    const data: PlaylistItemListResponse = await response.json();
    allItems = allItems.concat(data.items);
    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  return allItems;
};

export const youtubeService = {
  extractVideoId,
  getVideoDetails,
  getChannelUploadsPlaylistId,
  getAllPlaylistItems,
};