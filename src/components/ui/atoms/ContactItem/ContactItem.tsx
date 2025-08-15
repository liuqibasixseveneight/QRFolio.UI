import { createElement, isValidElement } from 'react';
import type { ContactItemProps } from './types';

const ContactItem = ({ icon, label, value, href }: ContactItemProps) => (
  <a
    href={href ?? undefined}
    target={href ? '_blank' : undefined}
    rel={href ? 'noopener noreferrer' : undefined}
    className='group flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 hover:bg-gray-50/80 active:scale-[0.98] cursor-pointer'
  >
    {/* Icon Container */}
    <div className='relative'>
      <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100/80 to-purple-100/80 border border-gray-200/50 flex items-center justify-center group-hover:from-indigo-200/90 group-hover:to-purple-200/90 transition-all duration-200 shadow-sm group-hover:shadow-md'>
        {isValidElement(icon)
          ? createElement(icon.type, {
              size: 20,
              className:
                'text-indigo-600 group-hover:text-indigo-700 transition-colors duration-200',
            })
          : icon}
      </div>
      {/* Subtle glow effect */}
      <div className='absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-200/20 to-purple-200/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
    </div>

    {/* Text Content */}
    <div className='flex flex-col flex-1 min-w-0'>
      <span className='text-xs font-bold uppercase tracking-wider text-gray-500 group-hover:text-gray-600 transition-colors duration-200'>
        {label}
      </span>
      <span className='text-sm font-semibold text-gray-900 truncate group-hover:text-gray-700 transition-colors duration-200'>
        {value}
      </span>
    </div>

    {/* Arrow indicator for external links */}
    {href && (
      <div className='w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200'>
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
