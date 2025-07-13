import { createElement, isValidElement } from 'react';
import type { ContactItemProps } from './types';

const ContactItem = ({ icon, label, value, href }: ContactItemProps) => (
  <a
    href={href ?? undefined}
    target={href ? '_blank' : undefined}
    rel={href ? 'noopener noreferrer' : undefined}
    className='flex items-center space-x-4 group transition-colors duration-200 hover:text-indigo-600'
  >
    <div
      className='p-2 rounded-md bg-indigo-50 group-hover:bg-indigo-100 transition'
      style={{ color: '#8ca6db' }}
    >
      {isValidElement(icon) ? createElement(icon.type, { size: 20 }) : icon}
    </div>
    <div className='flex flex-col'>
      <span className='text-xs font-semibold uppercase tracking-wide text-gray-500'>
        {label}
      </span>
      <span className='text-sm font-medium truncate max-w-xs'>{value}</span>
    </div>
  </a>
);

export default ContactItem;
