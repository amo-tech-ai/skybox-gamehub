import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
  variant?: "full" | "compact" | "badge";
}

const CountdownTimer = ({ targetDate, variant = "full" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isLive: false,
        });
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isLive: true,
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isLive) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-full font-bold uppercase text-sm animate-pulse">
        <span className="w-2 h-2 bg-white rounded-full animate-ping" />
        LIVE NOW
      </div>
    );
  }

  if (variant === "badge") {
    return (
      <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-full font-bold text-xs uppercase shadow-lg">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex gap-2 text-sm font-bold">
        <span className="text-primary">{timeLeft.days}d</span>
        <span className="text-muted-foreground">·</span>
        <span className="text-primary">{timeLeft.hours}h</span>
        <span className="text-muted-foreground">·</span>
        <span className="text-primary">{timeLeft.minutes}m</span>
      </div>
    );
  }

  return (
    <div className="countdown-scoreboard">
      <div className="flex gap-3 md:gap-6 justify-center items-center">
        <div className="countdown-digit">
          <div className="countdown-value">{String(timeLeft.days).padStart(2, "0")}</div>
          <div className="countdown-label">Days</div>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-digit">
          <div className="countdown-value">{String(timeLeft.hours).padStart(2, "0")}</div>
          <div className="countdown-label">Hours</div>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-digit">
          <div className="countdown-value">{String(timeLeft.minutes).padStart(2, "0")}</div>
          <div className="countdown-label">Min</div>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-digit">
          <div className="countdown-value">{String(timeLeft.seconds).padStart(2, "0")}</div>
          <div className="countdown-label">Sec</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
