import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  show?: boolean;
}

const Tooltip = ({
  content,
  children,
  className = '',
  position = 'top',
  show = true,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!show) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = rect.left + rect.width / 2;
    let y = rect.top;

    // Position tooltip based on position prop
    switch (position) {
      case 'top':
        y = rect.top - 10;
        break;
      case 'bottom':
        y = rect.bottom + 10;
        break;
      case 'left':
        x = rect.left - 10;
        y = rect.top + rect.height / 2;
        break;
      case 'right':
        x = rect.right + 10;
        y = rect.top + rect.height / 2;
        break;
    }

    setTooltipPosition({ x, y });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
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
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  // Close tooltip on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible]);

  if (!show) {
    return <>{children}</>;
  }

  return (
    <div className='relative inline-block' ref={containerRef}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </div>

      {/* Tooltip */}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            'fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg max-w-xs break-words',
            'animate-in fade-in-0 zoom-in-95 duration-200'
          )}
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform:
              position === 'top' || position === 'bottom'
                ? 'translateX(-50%)'
                : position === 'left' || position === 'right'
                ? 'translateY(-50%)'
                : 'none',
          }}
        >
          {content}
          {/* Tooltip arrow */}
          <div
            className={cn(
              'absolute w-0 h-0 border-4 border-transparent',
              position === 'top' &&
                'top-full left-1/2 transform -translate-x-1/2 border-t-gray-900',
              position === 'bottom' &&
                'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-900',
              position === 'left' &&
                'left-full top-1/2 transform -translate-y-1/2 border-l-gray-900',
              position === 'right' &&
                'right-full top-1/2 transform -translate-y-1/2 border-r-gray-900'
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
