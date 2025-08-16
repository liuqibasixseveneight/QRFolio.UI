import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { EllipsisProps } from './types';

/**
 * Ellipsis Component
 *
 * A flexible component that truncates long text with ellipsis and shows the full text
 * in a tooltip on hover. Perfect for handling long URLs, names, or descriptions
 * in space-constrained areas like sidebars.
 *
 * Features:
 * - Automatic truncation with configurable max length
 * - Custom tooltip with full text on hover
 * - Keyboard accessibility (Escape key closes tooltip)
 * - Click outside to close tooltip
 * - Smooth animations and positioning
 * - Cursor changes to help cursor when text is truncated
 *
 * Usage:
 * <Ellipsis text="Very long text that needs truncation" maxLength={30} />
 *
 * Props:
 * - text: The text to display (required)
 * - maxLength: Maximum characters before truncation (default: 50)
 * - className: Additional CSS classes
 * - tooltipClassName: Custom tooltip styling
 * - showTooltip: Whether to show tooltip (default: true)
 * - children: Alternative content to render instead of text
 */
const Ellipsis: React.FC<EllipsisProps> = ({
  text,
  maxLength = 50,
  className = '',
  tooltipClassName = '',
  showTooltip = true,
  children,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Check if text needs truncation
  const needsTruncation = text.length > maxLength;
  const displayText = needsTruncation ? `${text.slice(0, maxLength)}...` : text;

  // Handle mouse enter
  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!showTooltip || !needsTruncation) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
    setIsTooltipVisible(true);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsTooltipVisible(false);
      }
    };

    if (isTooltipVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTooltipVisible]);

  // Close tooltip on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsTooltipVisible(false);
      }
    };

    if (isTooltipVisible) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isTooltipVisible]);

  return (
    <div className='relative inline-block' ref={containerRef}>
      <div
        className={cn(
          'inline-block',
          needsTruncation && 'cursor-help',
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title={needsTruncation && showTooltip ? text : undefined}
      >
        {children || displayText}
      </div>

      {/* Custom Tooltip */}
      {isTooltipVisible && showTooltip && needsTruncation && (
        <div
          ref={tooltipRef}
          className={cn(
            'fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg max-w-xs break-words',
            'animate-in fade-in-0 zoom-in-95 duration-200',
            tooltipClassName
          )}
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translateX(-50%)',
          }}
        >
          {text}
          {/* Tooltip arrow */}
          <div className='absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900'></div>
        </div>
      )}
    </div>
  );
};

export default Ellipsis;
