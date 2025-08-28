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
}: NotificationCollapsedProps) => {
  // Truncate text to specified character limits
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
  };

  const truncatedTitle = truncateText(title, 38);
  const truncatedBody = truncateText(body, 84);

  // Process title to highlight "TODAY!" in red
  const renderTitle = (titleText: string) => {
    const parts = titleText.split(/(TODAY!)/g);
    return parts.map((part, index) => {
      if (part === "TODAY!") {
        return (
          <span key={index} className="text-[#AF1133]">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div 
      className={`w-[340px] h-[146px] bg-white border border-gray-200 rounded-lg shadow-sm p-4 ${className}`}
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
              {renderTitle(truncatedTitle)}
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