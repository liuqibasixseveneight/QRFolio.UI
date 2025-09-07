import type { SectionProps } from './types';

const Section = ({
  title,
  children,
  accentColor = 'blue',
  subtitle,
  className,
}: SectionProps) => (
  <section className={className}>
    {title && (
      <div className='mb-8'>
        <h2
          className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-gray-900 leading-tight bg-gradient-to-r from-gray-900 via-${accentColor}-800 to-${accentColor}-600 bg-clip-text text-transparent`}
        >
          {title}
        </h2>
        {subtitle && (
          <p className='text-lg text-gray-600 leading-relaxed mb-4 max-w-3xl'>
            {subtitle}
          </p>
        )}
        <div
          className={`mt-4 w-20 h-1.5 bg-gradient-to-r from-${accentColor}-600 via-${accentColor}-500 to-${accentColor}-400 rounded-full shadow-xl`}
        ></div>
      </div>
    )}
    <div className='space-y-6'>{children}</div>
  </section>
);

export default Section;
