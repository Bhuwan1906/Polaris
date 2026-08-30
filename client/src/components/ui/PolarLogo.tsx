import { Link } from 'react-router-dom';

interface PolarLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showSubtitle?: boolean;
}

export default function PolarLogo({ size = 'md', showText = true, showSubtitle = false }: PolarLogoProps) {
  const iconSizes = { sm: 32, md: 40, lg: 56 };
  const iconSize = iconSizes[size];
  
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="relative" style={{ width: iconSize, height: iconSize }}>
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-aurora-400 via-polar-400 to-ice-400 opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300" />
        
        {/* Main logo SVG */}
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" 
          className="relative z-10 drop-shadow-lg" 
          style={{ width: iconSize, height: iconSize }}>
          <defs>
            <linearGradient id="aurora-grad" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06D6A0" />
              <stop offset="50%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
            <linearGradient id="inner-grad" x1="14" y1="14" x2="42" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#06D6A0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background rounded square */}
          <rect x="2" y="2" width="52" height="52" rx="12" fill="url(#aurora-grad)" />
          
          {/* Inner dark overlay for depth */}
          <rect x="4" y="4" width="48" height="48" rx="10" fill="#0A1628" opacity="0.3" />
          
          {/* Snowflake/star pattern - 6 points */}
          <g filter="url(#glow)" stroke="url(#inner-grad)" strokeWidth="1.5" strokeLinecap="round">
            {/* Vertical line */}
            <line x1="28" y1="12" x2="28" y2="44" />
            {/* Diagonal lines */}
            <line x1="13" y1="19.5" x2="43" y2="36.5" />
            <line x1="43" y1="19.5" x2="13" y2="36.5" />
            {/* Small branches */}
            <line x1="28" y1="12" x2="24" y2="16" />
            <line x1="28" y1="12" x2="32" y2="16" />
            <line x1="28" y1="44" x2="24" y2="40" />
            <line x1="28" y1="44" x2="32" y2="40" />
            <line x1="13" y1="19.5" x2="17" y2="19.5" />
            <line x1="13" y1="19.5" x2="15" y2="23" />
            <line x1="43" y1="36.5" x2="39" y2="36.5" />
            <line x1="43" y1="36.5" x2="41" y2="33" />
            <line x1="43" y1="19.5" x2="39" y2="19.5" />
            <line x1="43" y1="19.5" x2="41" y2="23" />
            <line x1="13" y1="36.5" x2="17" y2="36.5" />
            <line x1="13" y1="36.5" x2="15" y2="33" />
          </g>
          
          {/* Center P letter */}
          <text x="28" y="33" textAnchor="middle" fill="white" fontSize="20" fontWeight="900" fontFamily="Inter, system-ui, sans-serif" filter="url(#glow)">
            P
          </text>
        </svg>
      </div>
      
      {showText && (
        <div className="hidden sm:block whitespace-nowrap">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold tracking-tight text-white">POLARIS</span>
            <span className="text-[10px] font-medium text-aurora-400 tracking-widest uppercase">SIH 2026</span>
          </div>
          {showSubtitle && (
            <span className="hidden lg:inline text-[11px] text-surface-400 leading-none whitespace-nowrap">Polar Research & Information System</span>
          )}
        </div>
      )}
    </Link>
  );
}
