export default function SectionDivider() {
  return (
    <div className="relative h-24 sm:h-32 overflow-hidden -mb-1">
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-full h-full"
      >
        <path
          d="M0 60L60 55C120 50 240 40 360 45C480 50 600 70 720 75C840 80 960 70 1080 60C1200 50 1320 40 1380 35L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V60Z"
          fill="url(#dividerGrad)"
          className="opacity-[0.03]"
        />
        <path
          d="M0 80L48 76C96 72 192 64 288 68C384 72 480 88 576 92C672 96 768 88 864 80C960 72 1056 64 1152 60C1248 56 1344 56 1392 56L1440 56V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V80Z"
          fill="url(#dividerGrad2)"
          className="opacity-[0.02]"
        />
        <defs>
          <linearGradient id="dividerGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#cc0000" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff1a1a" />
            <stop offset="100%" stopColor="#cc0000" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="dividerGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff3366" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff6633" />
            <stop offset="100%" stopColor="#ff3366" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
