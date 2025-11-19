import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

interface YouTubePlayerProps {
  videoId: string;
  noCookie?: boolean;
  className?: string;
}

export function YouTubePlayer({ 
  videoId, 
  noCookie = false,
  className = ''
}: YouTubePlayerProps) {
  // Official supported formats from Vidstack docs:
  // - youtube/{videoId} (short format)
  // - https://www.youtube.com/watch?v={videoId}
  // - https://www.youtube-nocookie.com/watch?v={videoId} (GDPR-friendly)
  
  const sourceUrl = noCookie
    ? `https://www.youtube-nocookie.com/watch?v=${videoId}`
    : `youtube/${videoId}`;

  return (
    <div className={className}>
      <MediaPlayer
        src={sourceUrl}
        aspectRatio="16/9"
        load="visible"
        className="w-full"
      >
        <MediaProvider />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </div>
  );
}

