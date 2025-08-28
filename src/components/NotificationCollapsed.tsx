import React from "react";

interface NotificationCollapsedProps {
  appName: string;
  category: string;
  timeAgo: string;
  title: string;
  body: string;
  appIconUrl?: string;
  imageUrl?: string;
  className?: string;
  titleLimit?: number; // visual truncation limit; does not affect source text
}

const NotificationCollapsed = ({
  appName,
  category,
  timeAgo,
  title,
  body,
  appIconUrl,
  imageUrl,
  className = "",
  titleLimit,
}: NotificationCollapsedProps) => {
  // Truncate text to specified character limits (excluding emojis for title)
  const truncateText = (text: string, maxLength: number, excludeEmojis = false) => {
    if (excludeEmojis) {
      // Remove emojis for character counting but keep them in display
      const textWithoutEmojis = text.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
      if (textWithoutEmojis.length <= maxLength) {
        return text; // Return original with emojis if under limit
      }
      // If over limit, truncate but preserve emojis at start
      const emojiMatch = text.match(/^[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu);
      const emoji = emojiMatch ? emojiMatch.join('') : '';
      const textPart = text.replace(/^[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
      return emoji + textPart.slice(0, maxLength - emoji.length) + "…";
    }
    return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
  };

  const effectiveTitleLimit = typeof titleLimit === 'number' ? titleLimit : 38;
  const truncatedTitle = truncateText(title, effectiveTitleLimit, true);
  const truncatedBody = truncateText(body, 84);

  return (
    <div 
      className={`w-[340px] h-[146px] bg-[#F8F8F8] border border-gray-200 rounded-lg shadow-sm p-4 ${className}`}
      style={{ fontFamily: 'Roboto, system-ui, -apple-system, sans-serif' }}
    >
      <div className="w-[308px] h-[114px] flex flex-col">
        {/* Header row */}
        <div className="flex items-center gap-1 mb-3">
          {appIconUrl && (
            <img 
              src={appIconUrl} 
              alt={`${appName} icon`} 
              className="w-4 h-4 rounded-sm"
            />
          )}
          <span 
            className={`text-[12px] ${appName === 'Moneyview' ? 'text-[#144835]' : 'text-black'}`}
            style={{ opacity: appName === 'Moneyview' ? 1 : 0.88 }}
          >
            {appName} • {category} • {timeAgo}
          </span>
          <button className="ml-auto">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path 
                d="M8 10.5L4.5 7L5.5 6L8 8.5L10.5 6L11.5 7L8 10.5Z" 
                fill="currentColor" 
                style={{ opacity: 0.88 }}
              />
            </svg>
          </button>
        </div>

        {/* Content row */}
        <div className="flex gap-3">
          {/* Text content */}
          <div className="w-[248px] h-[86px] flex flex-col">
            <h3 className="text-[13px] font-bold text-black leading-tight mb-2">
              {truncatedTitle}
            </h3>
            <p 
              className="text-[13px] text-black leading-tight"
              style={{ opacity: 0.88 }}
            >
              {truncatedBody}
            </p>
          </div>

          {/* Right thumbnail */}
          {imageUrl && (
            <div className="flex-shrink-0">
              <img 
                src={imageUrl} 
                alt="Notification thumbnail" 
                className="w-12 h-12 rounded object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCollapsed;