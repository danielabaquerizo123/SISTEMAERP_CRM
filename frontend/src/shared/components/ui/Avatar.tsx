import React from 'react';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  name: string;
  src?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<AvatarSize, { dimensions: string; text: string }> = {
  sm: { dimensions: 'w-8 h-8', text: 'text-xs' },
  md: { dimensions: 'w-10 h-10', text: 'text-sm' },
  lg: { dimensions: 'w-12 h-12', text: 'text-base' },
};

const avatarColors = [
  'bg-[#8B5CF6]',
  'bg-[#3B82F6]',
  'bg-[#10B981]',
  'bg-[#F59E0B]',
  'bg-[#EF4444]',
  'bg-[#EC4899]',
  'bg-[#8B5CF6]',
  'bg-[#14B8A6]',
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  className = '',
}) => {
  const { dimensions, text } = sizeStyles[size];
  const colorIndex = hashName(name) % avatarColors.length;
  const bgColor = avatarColors[colorIndex];

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`rounded-full object-cover ${dimensions} ${className}`}
      />
    );
  }

  return (
    <div
      className={`
        rounded-full flex items-center justify-center text-white font-medium
        ${dimensions} ${text} ${bgColor} ${className}
      `.trim()}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
