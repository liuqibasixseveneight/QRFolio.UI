import { createElement, isValidElement } from 'react';
import type { ContactItemProps } from './types';

const ContactItem = ({ icon, label, value, href }: ContactItemProps) => (
  <a
    href={href ?? undefined}
    target={href ? '_blank' : undefined}
    rel={href ? 'noopener noreferrer' : undefined}
    className='group flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 hover:bg-gray-50 active:scale-[0.98] cursor-pointer'
  >
    {/* Icon Container */}
    <div className='relative'>
      <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300'>
        {isValidElement(icon)
          ? createElement(icon.type, {
              size: 20,
              className:
                'text-gray-600 group-hover:text-gray-700 transition-colors duration-300',
            })
          : icon}
      </div>
      {/* Subtle glow effect */}
      <div className='absolute inset-0 rounded-xl bg-gray-200/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
    </div>

    {/* Text Content */}
    <div className='flex flex-col flex-1 min-w-0'>
      <span className='text-xs font-semibold uppercase tracking-wider text-gray-500 group-hover:text-gray-600 transition-colors duration-300'>
        {label}
      </span>
      <span className='text-sm font-medium text-gray-900 truncate group-hover:text-gray-700 transition-colors duration-300'>
        {value}
      </span>
    </div>

    {/* Arrow indicator for external links */}
    {href && (
      <div className='w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300'>
        <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
          />
        </svg>
      </div>
    )}
  </a>
);

export default ContactItem;
