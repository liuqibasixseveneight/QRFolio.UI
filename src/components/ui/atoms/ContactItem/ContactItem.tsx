import { ExternalLink } from 'lucide-react';
import { Ellipsis } from '../Ellipsis';
import type { ContactItemProps } from './types';

const ContactItem = ({ icon, label, value, href }: ContactItemProps) => {
  const isExternal = href && href.startsWith('http');

  const handleClick = () => {
    if (href) {
      if (isExternal) {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = href;
      }
    }
  };

  // Render value with proper truncation
  const renderValue = () => {
    if (typeof value === 'string') {
      return (
        <Ellipsis
          text={value}
          maxLength={40}
          className='text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors duration-500 leading-tight'
        />
      );
    }

    // If value is a React element, render it directly
    return value;
  };

  return (
    <div
      className={`group relative flex items-center gap-4 p-4 rounded-2xl hover:bg-white/90 transition-all duration-500 cursor-pointer border border-transparent hover:border-blue-200/60 hover:shadow-xl hover:shadow-blue-100/50 ${
        href ? 'hover:scale-[1.02]' : ''
      }`}
      onClick={handleClick}
    >
      {/* Enhanced Icon Container with techzen aesthetic */}
      <div className='flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100/80 via-indigo-100/80 to-purple-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-blue-200/60 transition-all duration-500 group-hover:from-blue-200/90 group-hover:via-indigo-200/90 group-hover:to-purple-200/90 group-hover:scale-110 group-hover:shadow-xl shadow-lg'>
        <div className='text-blue-600 group-hover:text-blue-700 transition-colors duration-500'>
          {icon}
        </div>
      </div>

      {/* Enhanced Content with techzen aesthetic */}
      <div className='flex-1 min-w-0'>
        <p className='text-xs font-semibold text-gray-500 uppercase tracking-wider group-hover:text-blue-600 transition-colors duration-500 mb-1'>
          {label}
        </p>
        {renderValue()}
      </div>

      {/* Enhanced External Link Indicator with techzen aesthetic */}
      {isExternal && (
        <div className='flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-50/80 via-indigo-50/80 to-purple-50/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-blue-200/60 group-hover:from-blue-100/90 group-hover:via-indigo-100/90 group-hover:to-purple-100/90 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg'>
          <ExternalLink className='w-4 h-4 text-blue-500 group-hover:text-blue-600 transition-colors duration-500' />
        </div>
      )}

      {/* Enhanced hover effect with techzen aesthetic */}
      <div className='absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-200/30 transition-all duration-500 pointer-events-none'></div>
    </div>
  );
};

export default ContactItem;
