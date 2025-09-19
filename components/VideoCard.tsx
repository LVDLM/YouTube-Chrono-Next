import React from 'react';
import type { PlaylistItem } from '../types';
import { PlayIcon } from './PlayIcon';

interface VideoCardProps {
  video: PlaylistItem;
  isNext?: boolean;
  watchLabel: string;
  byLabel: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, isNext = false, watchLabel, byLabel }) => {
  const videoUrl = `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`;
  const cardBorder = isNext ? 'border-teal-400' : 'border-gray-700';
  const buttonBg = isNext ? 'bg-teal-500 hover:bg-teal-600' : 'bg-red-600 hover:bg-red-700';
  const buttonRing = isNext ? 'focus:ring-teal-400' : 'focus:ring-red-500';

  return (
    <div className={`bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 ${cardBorder} transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}>
      <div className="relative">
        <img
          src={video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 h-14 overflow-hidden">
          {video.snippet.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          {byLabel} {video.snippet.channelTitle}
        </p>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full flex items-center justify-center px-4 py-2 ${buttonBg} text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${buttonRing} transition-colors duration-300`}
        >
          <PlayIcon className="h-5 w-5 mr-2" />
          {watchLabel}
        </a>
      </div>
    </div>
  );
};
