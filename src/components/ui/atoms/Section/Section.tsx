import type { SectionProps } from './types';

const Section = ({ title, children, accentColor = 'indigo' }: SectionProps) => (
  <section>
    {title && (
      <h2
        className={`text-2xl sm:text-3xl font-semibold mb-6 border-b-2 border-${accentColor}-500 pb-2 font-sans bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent`}
      >
        {title}
      </h2>
    )}
    <div className='space-y-8 sm:space-y-10'>{children}</div>
  </section>
);

export default Section;
