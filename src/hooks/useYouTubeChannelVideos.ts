import { useState, useEffect } from 'react';

export interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: { url: string };
      high: { url: string };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

interface UseYouTubeChannelVideosResult {
  videos: YouTubeVideo[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook to fetch videos from a YouTube channel using YouTube Data API v3
 * 
 * @param channelId - YouTube channel ID (e.g., 'UCDVYQ4Zhbm3S2dlz7P1GBDg' for NFL)
 * @param apiKey - YouTube Data API v3 key (from environment variable)
 * @param maxResults - Maximum number of videos to fetch (default: 50)
 * @returns Object with videos array, loading state, error state, and refetch function
 */
export function useYouTubeChannelVideos(
  channelId: string,
  apiKey: string | undefined,
  maxResults: number = 50
): UseYouTubeChannelVideosResult {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async () => {
    if (!apiKey) {
      setError('YouTube API key not configured. Add VITE_YOUTUBE_API_KEY to .env');
      setLoading(false);
      return;
    }

    if (!channelId) {
      setError('Channel ID is required');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
        `part=snippet&` +
        `channelId=${channelId}&` +
        `maxResults=${maxResults}&` +
        `order=date&` +
        `type=video&` +
        `key=${apiKey}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || 
          `Failed to fetch videos: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setVideos(data.items || []);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to fetch videos from YouTube';
      setError(errorMessage);
      console.error('YouTube API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [channelId, apiKey, maxResults]);

  return {
    videos,
    loading,
    error,
    refetch: fetchVideos,
  };
}

