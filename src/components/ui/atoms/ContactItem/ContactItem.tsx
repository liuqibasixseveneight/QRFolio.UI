import { ArrowUpRight } from 'lucide-react';
import type { ContactItemProps } from './types';

const ContactItem = ({ icon, label, value, href }: ContactItemProps) => {
  const isExternal = href && href.startsWith('http');

  return (
    <div className='group flex items-center gap-3 p-3 rounded-lg hover:bg-white/60 transition-all duration-200 cursor-pointer'>
      {/* Icon Container */}
      <div className='flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center border border-indigo-200/30 transition-all duration-200 group-hover:from-indigo-200 group-hover:to-purple-200'>
        {icon}
      </div>

      {/* Content */}
      <div className='flex-1 min-w-0'>
        <p className='text-sm font-medium text-gray-600 group-hover:text-indigo-600 transition-colors duration-200'>
          {label}
        </p>
        <p className='text-sm text-gray-900 group-hover:text-indigo-700 transition-colors duration-200 truncate'>
          {value}
        </p>
      </div>

      {/* External Link Arrow */}
      {isExternal && (
        <ArrowUpRight className='w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200 flex-shrink-0' />
      )}
    </div>
  );
};

export default ContactItem;
