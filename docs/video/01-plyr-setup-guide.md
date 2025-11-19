# Plyr Media Player - Complete Setup & Usage Guide

> **Reading Time**: 15 minutes  
> **Audience**: Developers integrating Plyr into Skybox GameHub  
> **Prerequisites**: React, TypeScript, Vite knowledge  
> **Last Updated**: January 2025

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Installation & Setup](#installation--setup)
3. [Quick Start](#quick-start)
4. [Core Features & Commands](#core-features--commands)
5. [Advanced Configuration](#advanced-configuration)
6. [React Integration](#react-integration)
7. [API Reference](#api-reference)
8. [Skybox Integration Examples](#skybox-integration-examples)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)

---

## Executive Summary

**TL;DR**: Plyr is a lightweight, accessible HTML5 media player that supports video, audio, YouTube, and Vimeo. This guide provides complete setup instructions, API commands, and integration patterns for Skybox GameHub.

**Key Takeaways**:
- **Installation**: `npm install plyr` + CSS import
- **Initialization**: `new Plyr('#player', options)`
- **React Integration**: Use `useEffect` hook with cleanup
- **Features**: HTML5, YouTube, Vimeo, captions, fullscreen, keyboard shortcuts
- **Customization**: CSS custom properties and extensive configuration options

**Why Plyr for Skybox**:
- Accessible (WCAG compliant)
- Mobile-friendly (responsive design)
- Supports multiple video sources (HTML5, YouTube, Vimeo)
- Customizable to match Skybox design system
- Lightweight (~20KB gzipped)

---

## Installation & Setup

### Step 1: Install Package

```bash
# Install Plyr via npm
npm install plyr

# Or via yarn
yarn add plyr

# Or via pnpm (recommended for Skybox)
pnpm add plyr
```

### Step 2: Import CSS

**Option A: Import in Component** (Recommended for React)
```typescript
// In your component file
import 'plyr/dist/plyr.css';
```

**Option B: Import in Main Entry** (Global)
```typescript
// src/main.tsx or src/index.tsx
import 'plyr/dist/plyr.css';
```

**Option C: CDN** (Quick prototyping)
```html
<!-- In index.html -->
<link rel="stylesheet" href="https://cdn.plyr.io/3.8.3/plyr.css" />
```

### Step 3: Import JavaScript

**ES6 Module** (Recommended for Vite/React):
```typescript
import Plyr from 'plyr';
```

**CDN** (Alternative):
```html
<script src="https://cdn.plyr.io/3.8.3/plyr.js"></script>
```

### Step 4: Verify Installation

```bash
# Check package.json
cat package.json | grep plyr

# Expected output:
# "plyr": "^3.8.3"
```

---

## Quick Start

### Basic HTML5 Video Player

```typescript
// src/components/VideoPlayer.tsx
import { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

export function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Initialize Plyr
      playerRef.current = new Plyr(videoRef.current, {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
      });

      // Cleanup on unmount
      return () => {
        if (playerRef.current) {
          playerRef.current.destroy();
        }
      };
    }
  }, []);

  return (
    <video
      ref={videoRef}
      playsInline
      controls
      data-poster="/path/to/poster.jpg"
    >
      <source src="/path/to/video.mp4" type="video/mp4" />
      <source src="/path/to/video.webm" type="video/webm" />
      
      {/* Optional: Captions */}
      <track
        kind="captions"
        label="English"
        srcLang="en"
        src="/path/to/captions.vtt"
        default
      />
    </video>
  );
}
```

### Basic Audio Player

```typescript
// src/components/AudioPlayer.tsx
import { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

export function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      playerRef.current = new Plyr(audioRef.current);
      
      return () => {
        if (playerRef.current) {
          playerRef.current.destroy();
        }
      };
    }
  }, []);

  return (
    <audio ref={audioRef} controls>
      <source src={src} type="audio/mp3" />
    </audio>
  );
}
```

---

## Core Features & Commands

### Player Initialization

```typescript
// Basic initialization
const player = new Plyr('#player');

// With options
const player = new Plyr('#player', {
  title: 'Skybox GameHub Video',
  controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
});

// Multiple players
const players = Plyr.setup('.js-player', {
  // Options applied to all players
});
```

### Essential Player Methods

```typescript
// Playback control
player.play();              // Start playback (returns Promise)
player.pause();             // Pause playback
player.togglePlay();        // Toggle play/pause
player.stop();              // Stop and reset to start
player.restart();           // Restart from beginning

// Seeking
player.rewind(10);          // Rewind by 10 seconds (or default seekTime)
player.forward(10);          // Forward by 10 seconds
player.currentTime = 30;     // Seek to 30 seconds

// Volume control
player.volume = 0.5;         // Set volume to 50%
player.muted = true;         // Mute player
player.increaseVolume(0.1);  // Increase volume by 0.1
player.decreaseVolume(0.1);  // Decrease volume by 0.1

// Fullscreen
player.fullscreen.enter();   // Enter fullscreen
player.fullscreen.exit();    // Exit fullscreen
player.fullscreen.toggle();  // Toggle fullscreen

// Captions
player.toggleCaptions();     // Toggle captions on/off
player.currentTrack = 0;     // Set caption track by index
player.language = 'en';      // Set caption language

// Picture-in-Picture
player.pip = true;           // Enter PiP mode
player.pip = false;          // Exit PiP mode

// Playback speed
player.speed = 1.5;          // Set playback speed to 1.5x
player.speed = 1;            // Reset to normal speed

// Quality (HTML5 only)
player.quality = 1080;       // Set quality to 1080p

// Source management
player.source = {
  type: 'video',
  title: 'New Video',
  sources: [
    { src: '/new-video.mp4', type: 'video/mp4' }
  ],
  poster: '/new-poster.jpg'
};

// Destroy player
player.destroy();            // Clean up and remove event listeners
```

### Player Properties (Getters)

```typescript
// Playback state
player.playing;              // Boolean: Is playing?
player.paused;               // Boolean: Is paused?
player.stopped;              // Boolean: Is stopped?
player.ended;                // Boolean: Has ended?
player.seeking;                // Boolean: Is seeking?

// Media info
player.duration;             // Number: Total duration in seconds
player.currentTime;          // Number: Current time in seconds
player.buffered;              // Number: Buffered amount (0-1)
player.hasAudio;             // Boolean: Has audio track?

// Player type
player.isHTML5;              // Boolean: Is HTML5 player?
player.isEmbed;              // Boolean: Is YouTube/Vimeo embed?

// Volume
player.volume;               // Number: Current volume (0-1)
player.muted;                 // Boolean: Is muted?

// Settings
player.speed;                 // Number: Current playback speed
player.quality;               // Number: Current quality
player.loop;                 // Boolean: Is looping?
player.fullscreen.active;    // Boolean: Is fullscreen?
player.fullscreen.enabled;   // Boolean: Is fullscreen enabled?
player.pip;                   // Boolean: Is in picture-in-picture?

// Captions
player.currentTrack;          // Number: Current caption track index
player.language;              // String: Current caption language
```

---

## Advanced Configuration

### Complete Options Object

```typescript
const player = new Plyr('#player', {
  // Basic settings
  enabled: true,
  debug: false,
  title: 'Skybox GameHub Video',
  
  // Controls configuration
  controls: [
    'play-large',
    'play',
    'progress',
    'current-time',
    'duration',
    'mute',
    'volume',
    'settings',
    'pip',
    'airplay',
    'fullscreen'
  ],
  
  // Settings menu
  settings: ['captions', 'quality', 'speed', 'loop'],
  
  // Playback options
  autoplay: false,
  autopause: true,
  playsinline: true,
  seekTime: 10,              // Seconds to seek on forward/rewind
  volume: 1,                 // Initial volume (0-1)
  muted: false,
  clickToPlay: true,
  disableContextMenu: true,
  hideControls: true,         // Auto-hide controls after 2s
  resetOnEnd: false,
  
  // Keyboard shortcuts
  keyboard: {
    focused: true,            // Only work when player focused
    global: false              // Work globally (if only one player)
  },
  
  // Tooltips
  tooltips: {
    controls: false,          // Show control labels on hover
    seek: true                // Show seek tooltip on scrubber hover
  },
  
  // Display options
  duration: null,             // Custom duration (null = auto)
  displayDuration: true,
  invertTime: true,           // Show time as countdown
  toggleInvert: true,         // Allow click to toggle countdown
  
  // Captions
  captions: {
    active: false,            // Start with captions on
    language: 'auto',         // Default language ('auto' = browser language)
    update: false              // Update menu on track changes
  },
  
  // Fullscreen
  fullscreen: {
    enabled: true,
    fallback: true,           // Fallback to full-window
    iosNative: false,         // Use native iOS fullscreen
    container: null            // Fullscreen container selector
  },
  
  // Aspect ratio
  ratio: null,                // Force aspect ratio (e.g., '16:9')
  
  // Storage
  storage: {
    enabled: true,            // Store user preferences in localStorage
    key: 'plyr'               // localStorage key
  },
  
  // Speed options
  speed: {
    selected: 1,              // Default speed
    options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4]
  },
  
  // Quality options (HTML5 only)
  quality: {
    default: 1080,
    options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240]
  },
  
  // Loop
  loop: {
    active: false
  },
  
  // Ads (vi.ai integration)
  ads: {
    enabled: false,
    publisherId: '',
    tagUrl: ''
  },
  
  // Preview thumbnails
  previewThumbnails: {
    enabled: false,
    src: '',                  // VTT file URL
    withCredentials: false
  },
  
  // Media metadata (Media Session API)
  mediaMetadata: {
    title: '',
    artist: '',
    album: '',
    artwork: []
  },
  
  // Markers
  markers: {
    enabled: false,
    points: []                // [{ time: 10, label: 'Chapter 1' }]
  },
  
  // YouTube options
  youtube: {
    noCookie: false,          // Use youtube-nocookie.com
    rel: 0,                   // Don't show related videos
    showinfo: 0,
    iv_load_policy: 3,        // Hide annotations
    modestbranding: 1
  },
  
  // Vimeo options
  vimeo: {
    byline: false,
    portrait: false,
    title: false,
    speed: true,
    transparent: false
  },
  
  // Internationalization
  i18n: {
    restart: 'Restart',
    rewind: 'Rewind {seektime}s',
    play: 'Play',
    pause: 'Pause',
    forward: 'Forward {seektime}s',
    // ... see full i18n config in defaults.js
  }
});
```

---

## React Integration

### Custom Hook Pattern

```typescript
// src/hooks/usePlyr.ts
import { useEffect, useRef, useState } from 'react';
import Plyr from 'plyr';
import type { Options } from 'plyr';

export function usePlyr(options?: Options) {
  const playerRef = useRef<Plyr | null>(null);
  const containerRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      // Initialize player
      playerRef.current = new Plyr(containerRef.current, options);

      // Listen for ready event
      playerRef.current.on('ready', () => {
        setIsReady(true);
      });

      // Cleanup
      return () => {
        if (playerRef.current) {
          playerRef.current.destroy();
          playerRef.current = null;
          setIsReady(false);
        }
      };
    }
  }, []);

  return {
    player: playerRef.current,
    containerRef,
    isReady,
  };
}
```

### Usage with Custom Hook

```typescript
// src/components/VideoPlayer.tsx
import { usePlyr } from '@/hooks/usePlyr';

export function VideoPlayer({ src, poster }: { src: string; poster?: string }) {
  const { containerRef, isReady } = usePlyr({
    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
    settings: ['captions', 'quality', 'speed'],
  });

  return (
    <div className="video-container">
      <video
        ref={containerRef as React.RefObject<HTMLVideoElement>}
        playsInline
        data-poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
      {!isReady && <div>Loading player...</div>}
    </div>
  );
}
```

### Event Handling

```typescript
// src/components/VideoPlayerWithEvents.tsx
import { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

export function VideoPlayerWithEvents() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = new Plyr(videoRef.current);

      // Event listeners
      playerRef.current.on('ready', () => {
        console.log('Player ready');
      });

      playerRef.current.on('play', () => {
        console.log('Playing');
        // Analytics: trackPlay()
      });

      playerRef.current.on('pause', () => {
        console.log('Paused');
        // Analytics: trackPause()
      });

      playerRef.current.on('ended', () => {
        console.log('Video ended');
        // Analytics: trackComplete()
      });

      playerRef.current.on('timeupdate', () => {
        const currentTime = playerRef.current?.currentTime;
        const duration = playerRef.current?.duration;
        if (currentTime && duration) {
          const progress = (currentTime / duration) * 100;
          console.log(`Progress: ${progress.toFixed(1)}%`);
        }
      });

      playerRef.current.on('enterfullscreen', () => {
        console.log('Entered fullscreen');
      });

      playerRef.current.on('exitfullscreen', () => {
        console.log('Exited fullscreen');
      });

      return () => {
        if (playerRef.current) {
          playerRef.current.destroy();
        }
      };
    }
  }, []);

  return (
    <video ref={videoRef} playsInline>
      <source src="/video.mp4" type="video/mp4" />
    </video>
  );
}
```

---

## API Reference

### Available Events

```typescript
// Standard media events
player.on('progress', () => { /* Loading progress */ });
player.on('playing', () => { /* Started playing */ });
player.on('play', () => { /* Resumed from pause */ });
player.on('pause', () => { /* Paused */ });
player.on('timeupdate', () => { /* Time changed */ });
player.on('volumechange', () => { /* Volume changed */ });
player.on('seeking', () => { /* Seek started */ });
player.on('seeked', () => { /* Seek completed */ });
player.on('ratechange', () => { /* Speed changed */ });
player.on('ended', () => { /* Playback ended */ });
player.on('enterfullscreen', () => { /* Entered fullscreen */ });
player.on('exitfullscreen', () => { /* Exited fullscreen */ });
player.on('captionsenabled', () => { /* Captions enabled */ });
player.on('captionsdisabled', () => { /* Captions disabled */ });
player.on('languagechange', () => { /* Language changed */ });
player.on('controlshidden', () => { /* Controls hidden */ });
player.on('controlsshown', () => { /* Controls shown */ });
player.on('ready', () => { /* Player ready */ });

// HTML5 only events
player.on('loadstart', () => { /* Loading started */ });
player.on('loadeddata', () => { /* First frame loaded */ });
player.on('loadedmetadata', () => { /* Metadata loaded */ });
player.on('qualitychange', () => { /* Quality changed */ });
player.on('canplay', () => { /* Can start playing */ });
player.on('canplaythrough', () => { /* Can play without buffering */ });
player.on('stalled', () => { /* Buffering stalled */ });
player.on('waiting', () => { /* Waiting for data */ });
player.on('emptied', () => { /* Media emptied */ });
player.on('cuechange', () => { /* Caption cue changed */ });
player.on('error', () => { /* Error occurred */ });

// YouTube only
player.on('statechange', (event) => {
  const code = event.detail.code;
  // -1: Unstarted, 0: Ended, 1: Playing, 2: Paused, 3: Buffering, 5: Cued
});
```

### Event Listener Management

```typescript
// Add listener
player.on('play', handlePlay);

// Add one-time listener
player.once('ready', () => {
  console.log('Player ready (once)');
});

// Remove listener
player.off('play', handlePlay);

// Remove all listeners for event
player.off('play');
```

---

## Skybox Integration Examples

### Event Video Player Component

```typescript
// src/components/EventVideoPlayer.tsx
import { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
import type { Event } from '@/types';

interface EventVideoPlayerProps {
  event: Event;
  className?: string;
}

export function EventVideoPlayer({ event, className }: EventVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = new Plyr(videoRef.current, {
        title: event.title,
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'settings',
          'fullscreen'
        ],
        settings: ['captions', 'quality', 'speed'],
        captions: {
          active: false,
          language: 'auto'
        },
        // Match Skybox design system colors
        loadSprite: true,
      });

      // Analytics tracking
      playerRef.current.on('play', () => {
        // Track video play event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'video_play', {
            event_id: event.id,
            event_title: event.title,
          });
        }
      });

      playerRef.current.on('ended', () => {
        // Track video completion
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'video_complete', {
            event_id: event.id,
            event_title: event.title,
          });
        }
      });

      return () => {
        if (playerRef.current) {
          playerRef.current.destroy();
        }
      };
    }
  }, [event]);

  if (!event.video_url) {
    return null;
  }

  return (
    <div className={`event-video-player ${className || ''}`}>
      <video
        ref={videoRef}
        playsInline
        data-poster={event.image_url}
        className="w-full rounded-lg"
      >
        <source src={event.video_url} type="video/mp4" />
        {event.captions_url && (
          <track
            kind="captions"
            label="English"
            srcLang="en"
            src={event.captions_url}
            default
          />
        )}
      </video>
    </div>
  );
}
```

### YouTube Embed Component

```typescript
// src/components/YouTubePlayer.tsx
import { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

interface YouTubePlayerProps {
  videoId: string;
  title?: string;
}

export function YouTubePlayer({ videoId, title }: YouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      playerRef.current = new Plyr(containerRef.current, {
        title: title || 'YouTube Video',
        youtube: {
          noCookie: true,        // GDPR-friendly (no cookies)
          rel: 0,                // Don't show related videos
          modestbranding: 1,
          iv_load_policy: 3,
        },
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'settings',
          'fullscreen'
        ],
      });

      return () => {
        if (playerRef.current) {
          playerRef.current.destroy();
        }
      };
    }
  }, [videoId, title]);

  return (
    <div className="plyr__video-embed" ref={containerRef}>
      <div data-plyr-provider="youtube" data-plyr-embed-id={videoId}></div>
    </div>
  );
}
```

### Styled with Tailwind CSS

```typescript
// src/components/StyledVideoPlayer.tsx
import { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

export function StyledVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = new Plyr(videoRef.current);

      return () => {
        if (playerRef.current) {
          playerRef.current.destroy();
        }
      };
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <style>{`
        :root {
          --plyr-color-main: #F97316; /* Skybox orange */
          --plyr-audio-control-color: #4a5464;
          --plyr-audio-control-color-hover: #ffffff;
          --plyr-audio-control-background-hover: #F97316;
          --plyr-video-control-color: #ffffff;
          --plyr-video-control-color-hover: #ffffff;
          --plyr-video-control-background-hover: #F97316;
          --plyr-menu-background: rgba(255, 255, 255, 0.95);
          --plyr-menu-color: #4a5464;
        }
      `}</style>
      <video
        ref={videoRef}
        playsInline
        className="rounded-lg shadow-lg"
        data-poster="/poster.jpg"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
```

---

## Troubleshooting

### Common Issues

#### Issue 1: Player Not Initializing

**Symptom**: Player doesn't appear or controls don't work

**Solution**:
```typescript
// Ensure element exists before initialization
useEffect(() => {
  if (videoRef.current) {
    playerRef.current = new Plyr(videoRef.current);
  }
}, []);
```

**Check**:
- CSS is imported: `import 'plyr/dist/plyr.css'`
- Element ref is properly attached
- No console errors

---

#### Issue 2: Controls Not Showing

**Symptom**: Video plays but no controls visible

**Solution**:
```typescript
// Explicitly set controls
const player = new Plyr('#player', {
  controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen']
});
```

**Check**:
- CSS is loaded
- Controls array is not empty
- No CSS conflicts (z-index, display)

---

#### Issue 3: YouTube Video Not Loading

**Symptom**: YouTube embed shows but doesn't play

**Solution**:
```typescript
// Ensure proper YouTube configuration
const player = new Plyr('#player', {
  youtube: {
    noCookie: false,  // Use regular YouTube if nocookie fails
    rel: 0,
  }
});
```

**Check**:
- Video ID is correct
- YouTube API is accessible
- CORS settings if using custom domain

---

#### Issue 4: Fullscreen Not Working

**Symptom**: Fullscreen button doesn't work

**Solution**:
```typescript
// Enable fullscreen with fallback
const player = new Plyr('#player', {
  fullscreen: {
    enabled: true,
    fallback: true,  // Use full-window fallback
    iosNative: false
  }
});
```

**Check**:
- Browser supports fullscreen API
- No conflicting fullscreen handlers
- Container element is correct

---

#### Issue 5: Captions Not Displaying

**Symptom**: Captions track exists but doesn't show

**Solution**:
```typescript
// Enable captions in config
const player = new Plyr('#player', {
  captions: {
    active: true,     // Start with captions on
    language: 'en',
    update: false
  }
});
```

**Check**:
- VTT file is valid and accessible
- CORS headers if VTT is on different domain
- Track element has `default` attribute

---

### Debug Mode

```typescript
// Enable debug logging
const player = new Plyr('#player', {
  debug: true  // Shows console logs
});

// Check player state
console.log('Playing:', player.playing);
console.log('Duration:', player.duration);
console.log('Current time:', player.currentTime);
console.log('Volume:', player.volume);
```

---

## Best Practices

### 1. Always Clean Up

```typescript
useEffect(() => {
  const player = new Plyr('#player');
  
  return () => {
    player.destroy();  // Always destroy on unmount
  };
}, []);
```

### 2. Use TypeScript Types

```typescript
import Plyr from 'plyr';
import type { Options, SourceInfo } from 'plyr';

const options: Options = {
  controls: ['play', 'progress'],
};

const source: SourceInfo = {
  type: 'video',
  sources: [{ src: '/video.mp4', type: 'video/mp4' }]
};
```

### 3. Handle Errors

```typescript
player.on('error', (event) => {
  console.error('Player error:', event);
  // Show user-friendly error message
  toast.error('Video failed to load. Please try again.');
});
```

### 4. Optimize for Mobile

```typescript
const player = new Plyr('#player', {
  playsinline: true,      // iOS inline playback
  hideControls: true,     // Auto-hide on mobile
  clickToPlay: true,      // Tap to play on mobile
});
```

### 5. Accessibility

```typescript
// Always include captions
<track
  kind="captions"
  label="English"
  srcLang="en"
  src="/captions.vtt"
  default
/>

// Use proper ARIA labels
<video
  aria-label="Event video: Skybox GameHub highlights"
  aria-describedby="video-description"
>
```

### 6. Performance

```typescript
// Lazy load player
const { containerRef, isReady } = usePlyr({
  // Options
});

// Show loading state
{!isReady && <LoadingSpinner />}
```

### 7. Custom Styling

```typescript
// Use CSS custom properties for theming
<style>{`
  :root {
    --plyr-color-main: #F97316;  /* Skybox orange */
    --plyr-video-control-color: #ffffff;
    --plyr-menu-background: rgba(255, 255, 255, 0.95);
  }
`}</style>
```

---

## Next Steps

1. **Integrate into Skybox**: Replace Cloudinary iframe with Plyr
2. **Add Event Videos**: Connect to Supabase event video URLs
3. **Customize Styling**: Match Skybox design system
4. **Add Analytics**: Track video engagement
5. **Test Accessibility**: Verify WCAG compliance

---

## Resources

- **Official Docs**: [https://plyr.io](https://plyr.io)
- **GitHub**: [https://github.com/sampotts/plyr](https://github.com/sampotts/plyr)
- **Demo**: [https://plyr.io/#demo](https://plyr.io/#demo)
- **CDN**: [https://cdn.plyr.io](https://cdn.plyr.io)

---

**Last Updated**: January 2025  
**Version**: 3.8.3  
**Status**: ✅ Production Ready

