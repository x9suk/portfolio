"use client";

import { useEffect, useState, createElement } from "react";
import { motion } from "framer-motion";
import { FaDiscord, FaSpotify, FaGamepad, FaCode, FaHeadphones } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

interface LanyardData {
  discord_user: {
    id: string;
    username: string;
    display_name: string;
    avatar: string;
    bot: boolean;
    global_name: string;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  activities: {
    id: string;
    name: string;
    type: number;
    state?: string;
    details?: string;
    timestamps?: { start?: number; end?: number };
    assets?: {
      large_image?: string;
      large_text?: string;
      small_image?: string;
      small_text?: string;
    };
    emoji?: { name: string };
  }[];
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  listening_to_spotify: boolean;
  spotify: {
    track_id: string;
    song: string;
    artist: string;
    album_art_url: string;
    timestamps: { start: number; end: number };
  } | null;
}

const statusColors: Record<string, string> = {
  online: "bg-green-500",
  idle: "bg-yellow-500",
  dnd: "bg-red-500",
  offline: "bg-gray-500",
};

const activityIcons: Record<number, React.ElementType> = {
  0: FaGamepad,
  1: FaCode,
  2: FaHeadphones,
  3: FiClock,
  4: FaDiscord,
};

function getActivityIcon(type: number) {
  return activityIcons[type] || FaCode;
}

function getAvatarUrl(user: { id: string; avatar: string }): string {
  if (user.avatar.startsWith("a_")) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=128`;
  }
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`;
}

function SpotifyProgressBar({ start, end }: { start: number; end: number }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calc = () => {
      const pct = Math.min(
        ((Date.now() - start) / (end - start)) * 100,
        100
      );
      setProgress(pct);
    };
    calc();
    const interval = setInterval(calc, 2000);
    return () => clearInterval(interval);
  }, [start, end]);

  return (
    <div className="mt-1.5 w-full h-1 rounded-full bg-white/10 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className="h-full rounded-full bg-green-500"
      />
    </div>
  );
}

function ActivityTimer({ start }: { start: number }) {
  const [elapsed, setElapsed] = useState("");

  useEffect(() => {
    const update = () => {
      const diff = Date.now() - start;
      const total = Math.floor(diff / 1000);
      const h = Math.floor(total / 3600);
      const m = Math.floor((total % 3600) / 60);
      setElapsed(h > 0 ? `${h}h ${m}m` : `${m}m`);
    };
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, [start]);

  return <>{elapsed}</>;
}

function formatTime(ms: number): string {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function DiscordProfile() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.lanyard.rest/v1/users/742415554840887337"
        );
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return <div className="w-full max-w-xs" />;

  if (loading) {
    return (
      <div className="glass rounded-2xl p-5 w-full max-w-xs animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-white/5" />
          <div className="space-y-2 flex-1">
            <div className="h-3 w-24 rounded bg-white/5" />
            <div className="h-2 w-16 rounded bg-white/5" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-full rounded bg-white/5" />
          <div className="h-2 w-3/4 rounded bg-white/5" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  const user = data.discord_user;
  const status = data.discord_status;
  const spotify = data.spotify;
  const topActivity = data.activities?.find((a) => a.type !== 4 && a.name !== "Custom Status");
  const customStatus = data.activities?.find((a) => a.type === 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="w-full"
    >
      <div className="glass rounded-2xl p-5 hover:border-neon-200/20 transition-all duration-500 group">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative shrink-0">
            <img
              src={getAvatarUrl(user)}
              alt={user.display_name || user.username}
              className="w-12 h-12 rounded-xl object-cover"
            />
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-dark-500 ${statusColors[status]}`}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-white truncate">
              {user.display_name || user.global_name || user.username}
            </h3>
            <p className="text-xs text-white/40 capitalize truncate">
              {status === "dnd" ? "Do Not Disturb" : status}
            </p>
          </div>
          <FaDiscord className="text-[#5865F2] shrink-0" size={20} />
        </div>

        {customStatus?.emoji || customStatus?.state ? (
          <div className="mb-3 px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-xs text-white/60 italic">
            {customStatus.emoji?.name && (
              <span className="mr-1">{customStatus.emoji.name}</span>
            )}
            {customStatus.state}
          </div>
        ) : null}

        {spotify ? (
          <div className="mb-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10">
            <div className="flex items-start gap-3">
              <img
                src={spotify.album_art_url}
                alt={spotify.song}
                className="w-10 h-10 rounded-lg object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-white truncate">
                  {spotify.song}
                </p>
                <p className="text-xs text-white/40 truncate">
                  {spotify.artist}
                </p>
                <SpotifyProgressBar start={spotify.timestamps.start} end={spotify.timestamps.end} />
              </div>
              <FaSpotify className="text-green-500 shrink-0" size={14} />
            </div>
          </div>
        ) : topActivity ? (
          <div className="mb-3 p-3 rounded-lg bg-white/5 border border-white/5">
            <div className="flex items-start gap-3">
              {topActivity.assets?.large_image ? (
                <img
                  src={`https://cdn.discordapp.com/app-assets/${topActivity.id}/${topActivity.assets.large_image}.png`}
                  alt=""
                  className="w-10 h-10 rounded-lg object-cover shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  {createElement(getActivityIcon(topActivity.type), {
                    className: "w-4 h-4 text-white/40",
                  })}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-white truncate">
                  {topActivity.name}
                </p>
                {topActivity.details && (
                  <p className="text-xs text-white/40 truncate">
                    {topActivity.details}
                  </p>
                )}
                {topActivity.state && (
                  <p className="text-xs text-white/30 truncate">
                    {topActivity.state}
                  </p>
                )}
                {topActivity.timestamps?.start && (
                  <p className="text-xs text-white/20 mt-0.5">
                    <ActivityTimer start={topActivity.timestamps.start} />
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex items-center justify-between text-xs text-white/20">
          <span>{data.active_on_discord_desktop ? "Desktop" : data.active_on_discord_mobile ? "Mobile" : "Web"}</span>
          <span>ID: {user.id}</span>
        </div>
      </div>
    </motion.div>
  );
}
