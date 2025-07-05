import type { SectionProps } from './types';

const Section = ({ title, children, accentColor }: SectionProps) => (
  <section>
    <h2
      className={`text-3xl font-semibold mb-6 border-b-2 border-${accentColor} pb-1 font-poppins`}
    >
      {title}
    </h2>
    <div className='space-y-10'>{children}</div>
  </section>
);

export default Section;
