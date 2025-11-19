import { FC, useState, useMemo } from 'react';
import { YouTubePlayer } from '@/components/video/YouTubePlayer';
import { VideoCard } from '@/components/video/VideoCard';
import { useYouTubeChannelVideos, YouTubeVideo } from '@/hooks/useYouTubeChannelVideos';
import { YOUTUBE_CHANNELS, ChannelKey } from '@/data/youtubeChannels';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const YouTubeVideos: FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<ChannelKey>('NFL');
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  const channelId = YOUTUBE_CHANNELS[selectedChannel].id;

  const { videos, loading, error, refetch } = useYouTubeChannelVideos(
    channelId,
    apiKey,
    50
  );

  // Filter videos by search query
  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videos;
    
    const query = searchQuery.toLowerCase();
    return videos.filter(
      (video) =>
        video.snippet.title.toLowerCase().includes(query) ||
        video.snippet.description.toLowerCase().includes(query)
    );
  }, [videos, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Sports Videos
          </h1>

          {/* Channel Selector */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(Object.keys(YOUTUBE_CHANNELS) as ChannelKey[]).map((key) => (
              <Button
                key={key}
                variant={selectedChannel === key ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedChannel(key);
                  setSelectedVideo(null);
                }}
                className="capitalize"
              >
                {YOUTUBE_CHANNELS[key].name}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Button
              variant="outline"
              onClick={refetch}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error State */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            <span className="ml-3 text-gray-600 dark:text-gray-400">
              Loading videos from {YOUTUBE_CHANNELS[selectedChannel].name}...
            </span>
          </div>
        )}

        {/* Video Player */}
        {selectedVideo && !loading && (
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {selectedVideo.snippet.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedVideo.snippet.channelTitle} •{' '}
                {new Date(selectedVideo.snippet.publishedAt).toLocaleDateString()}
              </p>
            </div>
            <YouTubePlayer videoId={selectedVideo.id.videoId} />
          </div>
        )}

        {/* Video Grid */}
        {!loading && !error && (
          <>
            <div className="mb-4 text-gray-600 dark:text-gray-400">
              {filteredVideos.length > 0 ? (
                <p>
                  Showing {filteredVideos.length} of {videos.length} videos
                </p>
              ) : (
                <p>No videos found matching your search.</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard
                  key={video.id.videoId}
                  video={video}
                  onClick={setSelectedVideo}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default YouTubeVideos;

