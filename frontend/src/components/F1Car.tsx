interface F1CarProps {
  className?: string;
}

export default function F1Car({ className = '' }: F1CarProps) {
  return (
    <svg
      viewBox="0 0 200 80"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Car Body - Main Chassis */}
      <path
        d="M 30 45 L 45 35 L 80 30 L 120 30 L 155 35 L 170 45 L 165 55 L 30 55 Z"
        fill="#DC2626"
        stroke="#991B1B"
        strokeWidth="1.5"
      />
      
      {/* Front Wing */}
      <path
        d="M 165 45 L 180 42 L 190 43 L 192 48 L 188 52 L 170 50 Z"
        fill="#EF4444"
        stroke="#991B1B"
        strokeWidth="1"
      />
      
      {/* Rear Wing */}
      <path
        d="M 25 35 L 30 33 L 35 35 L 35 40 L 25 42 Z"
        fill="#EF4444"
        stroke="#991B1B"
        strokeWidth="1"
      />
      
      {/* Cockpit */}
      <ellipse
        cx="100"
        cy="38"
        rx="25"
        ry="12"
        fill="#1E293B"
        stroke="#0F172A"
        strokeWidth="1.5"
      />
      
      {/* Cockpit Glass */}
      <ellipse
        cx="100"
        cy="38"
        rx="20"
        ry="9"
        fill="url(#glassGradient)"
        opacity="0.6"
      />
      
      {/* Engine Air Intake */}
      <rect
        x="85"
        y="28"
        width="30"
        height="8"
        rx="2"
        fill="#0F172A"
        stroke="#991B1B"
        strokeWidth="1"
      />
      
      {/* Front Wheel */}
      <g>
        <circle cx="150" cy="55" r="12" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
        <circle cx="150" cy="55" r="8" fill="#374151" />
        <circle cx="150" cy="55" r="4" fill="#6B7280" />
      </g>
      
      {/* Rear Wheel */}
      <g>
        <circle cx="50" cy="55" r="12" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
        <circle cx="50" cy="55" r="8" fill="#374151" />
        <circle cx="50" cy="55" r="4" fill="#6B7280" />
      </g>
      
      {/* Decorative Lines */}
      <path
        d="M 80 38 L 120 38"
        stroke="#FBBF24"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Number */}
      <text
        x="100"
        y="50"
        fontSize="10"
        fill="#FBBF24"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        textAnchor="middle"
      >
        5
      </text>
      
      {/* Speed Lines */}
      <line x1="10" y1="40" x2="25" y2="40" stroke="#EF4444" strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      <line x1="5" y1="47" x2="22" y2="47" stroke="#EF4444" strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      <line x1="8" y1="54" x2="25" y2="54" stroke="#EF4444" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
      
      {/* Gradients */}
      <defs>
        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1E293B" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
}
