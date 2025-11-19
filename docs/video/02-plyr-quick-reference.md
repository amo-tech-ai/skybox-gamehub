# Plyr Quick Reference Card

> **Quick lookup for common Plyr commands and configurations**

---

## 🚀 Installation

```bash
pnpm add plyr
```

```typescript
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';
```

---

## 📝 Basic Setup

```typescript
// React component
const videoRef = useRef<HTMLVideoElement>(null);
const playerRef = useRef<Plyr | null>(null);

useEffect(() => {
  if (videoRef.current) {
    playerRef.current = new Plyr(videoRef.current);
    return () => playerRef.current?.destroy();
  }
}, []);
```

---

## 🎮 Essential Commands

### Playback Control
```typescript
player.play()              // Start playback
player.pause()             // Pause
player.togglePlay()        // Toggle play/pause
player.stop()              // Stop and reset
player.restart()           // Restart from beginning
```

### Seeking
```typescript
player.rewind(10)          // Rewind 10 seconds
player.forward(10)         // Forward 10 seconds
player.currentTime = 30    // Seek to 30 seconds
```

### Volume
```typescript
player.volume = 0.5        // Set volume (0-1)
player.muted = true        // Mute
player.increaseVolume(0.1) // Increase
player.decreaseVolume(0.1) // Decrease
```

### Fullscreen
```typescript
player.fullscreen.enter()  // Enter fullscreen
player.fullscreen.exit()   // Exit
player.fullscreen.toggle() // Toggle
```

### Captions
```typescript
player.toggleCaptions()    // Toggle on/off
player.currentTrack = 0    // Set track index
player.language = 'en'     // Set language
```

### Speed
```typescript
player.speed = 1.5         // Set speed (0.5-4)
```

### Picture-in-Picture
```typescript
player.pip = true          // Enter PiP
player.pip = false         // Exit PiP
```

---

## 📊 Properties (Getters)

```typescript
player.playing             // Boolean
player.paused              // Boolean
player.ended               // Boolean
player.duration            // Number (seconds)
player.currentTime         // Number (seconds)
player.volume              // Number (0-1)
player.muted               // Boolean
player.speed               // Number
player.fullscreen.active   // Boolean
player.isHTML5             // Boolean
player.isEmbed             // Boolean
```

---

## ⚙️ Common Options

```typescript
const options = {
  controls: [
    'play-large', 'play', 'progress', 
    'current-time', 'mute', 'volume', 'fullscreen'
  ],
  settings: ['captions', 'quality', 'speed'],
  autoplay: false,
  autopause: true,
  playsinline: true,
  seekTime: 10,
  volume: 1,
  muted: false,
  clickToPlay: true,
  hideControls: true,
  keyboard: { focused: true, global: false },
  captions: { active: false, language: 'auto' },
  fullscreen: { enabled: true, fallback: true },
};
```

---

## 🎯 Events

```typescript
player.on('ready', () => { /* Ready */ });
player.on('play', () => { /* Playing */ });
player.on('pause', () => { /* Paused */ });
player.on('ended', () => { /* Ended */ });
player.on('timeupdate', () => { /* Time changed */ });
player.on('volumechange', () => { /* Volume changed */ });
player.on('enterfullscreen', () => { /* Fullscreen */ });
player.on('exitfullscreen', () => { /* Exit fullscreen */ });
player.on('error', () => { /* Error occurred */ });
```

---

## 🎨 Styling (CSS Variables)

```css
:root {
  --plyr-color-main: #F97316;              /* Primary color */
  --plyr-video-control-color: #ffffff;     /* Control color */
  --plyr-video-control-background-hover: #F97316;
  --plyr-menu-background: rgba(255, 255, 255, 0.95);
  --plyr-menu-color: #4a5464;
}
```

---

## 📱 HTML5 Video

```html
<video id="player" playsinline data-poster="/poster.jpg">
  <source src="/video.mp4" type="video/mp4" />
  <track kind="captions" label="English" srcLang="en" src="/captions.vtt" default />
</video>
```

---

## 📺 YouTube

```html
<div id="player" data-plyr-provider="youtube" data-plyr-embed-id="VIDEO_ID"></div>
```

```typescript
const player = new Plyr('#player', {
  youtube: { noCookie: true, rel: 0 }
});
```

---

## 🔧 React Hook Pattern

```typescript
function usePlyr(options?: Options) {
  const containerRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      playerRef.current = new Plyr(containerRef.current, options);
      return () => playerRef.current?.destroy();
    }
  }, []);

  return { containerRef, player: playerRef.current };
}
```

---

## ⚠️ Common Issues

**Player not showing**: Check CSS import
**Controls missing**: Verify controls array
**YouTube not loading**: Check video ID and API
**Fullscreen broken**: Enable fallback option
**Captions not showing**: Check VTT file and CORS

---

## 📚 Full Documentation

See [01-plyr-setup-guide.md](01-plyr-setup-guide.md) for complete guide.

---

**Quick Reference v1.0** | **Last Updated**: January 2025

