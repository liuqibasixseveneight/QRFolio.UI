import { forwardRef, Fragment } from 'react';
import { ChevronRight, PanelLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { cn } from '@/lib/utils';

export type BreadcrumbItem = {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>(
  ({ items, className }, ref) => {
    const location = useLocation();

    return (
      <nav
        ref={ref}
        className={cn(
          'flex items-center space-x-1 text-sm text-gray-600',
          className
        )}
        aria-label='Breadcrumb'
      >
        <Link
          to='/dashboard'
          className='flex items-center hover:text-gray-900 transition-colors duration-200'
        >
          <PanelLeft className='w-4 h-4' />
          <span className='sr-only'>
            <FormattedMessage id='breadcrumb.home' />
          </span>
        </Link>

        {items.map((item, index) => (
          <Fragment key={index}>
            <ChevronRight className='w-4 h-4 text-gray-400' />
            {item.href && item.href !== location.pathname ? (
              <Link
                to={item.href}
                className='flex items-center gap-1 hover:text-gray-900 transition-colors duration-200'
              >
                {item.icon && <item.icon className='w-4 h-4' />}
                <span>
                  <FormattedMessage id={item.label} />
                </span>
              </Link>
            ) : (
              <span className='flex items-center gap-1 text-gray-900 font-medium'>
                {item.icon && <item.icon className='w-4 h-4' />}
                <span>
                  <FormattedMessage id={item.label} />
                </span>
              </span>
            )}
          </Fragment>
        ))}
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export { Breadcrumb };
