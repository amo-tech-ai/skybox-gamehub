/**
 * YouTube Channel IDs for Sports Leagues
 * 
 * To find a channel ID:
 * 1. Go to the YouTube channel page
 * 2. View page source
 * 3. Search for "channelId" or use YouTube Data API
 */

export const YOUTUBE_CHANNELS = {
  NFL: {
    id: 'UCDVYQ4Zhbm3S2dlz7P1GBDg',
    name: 'NFL',
    url: 'https://www.youtube.com/@NFL',
  },
  NBA: {
    id: 'UCWJ2lWNubArHWmf3FIHbfcQ',
    name: 'NBA',
    url: 'https://www.youtube.com/@NBA',
  },
  MLB: {
    id: 'UCoLrcjPV5PbUrUyXq5mjc_A',
    name: 'MLB',
    url: 'https://www.youtube.com/@MLB',
  },
  NHL: {
    id: 'UCqFMzb-4AUf6WAIbl132QKA',
    name: 'NHL',
    url: 'https://www.youtube.com/@NHL',
  },
  ESPN: {
    id: 'UCiWLfSweyRNmLpgEHekho8w',
    name: 'ESPN',
    url: 'https://www.youtube.com/@ESPN',
  },
  BleacherReport: {
    id: 'UCY6i2rda7gqJ5Y3qJ8VbN3A',
    name: 'Bleacher Report',
    url: 'https://www.youtube.com/@BleacherReport',
  },
} as const;

export type ChannelKey = keyof typeof YOUTUBE_CHANNELS;

