import { FC } from 'react';
import { YouTubeVideo } from '@/hooks/useYouTubeChannelVideos';
import { formatDistanceToNow } from 'date-fns';

interface VideoCardProps {
  video: YouTubeVideo;
  onClick: (video: YouTubeVideo) => void;
}

export const VideoCard: FC<VideoCardProps> = ({ video, onClick }) => {
  const publishedDate = new Date(video.snippet.publishedAt);
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });

  return (
    <div
      onClick={() => onClick(video)}
      className="group cursor-pointer bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <img
          src={video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
          <div className="w-16 h-16 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              className="w-8 h-8 text-orange-500 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 mb-2 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
          {video.snippet.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span className="truncate">{video.snippet.channelTitle}</span>
          <span className="ml-2 whitespace-nowrap">{timeAgo}</span>
        </div>
      </div>
    </div>
  );
};

