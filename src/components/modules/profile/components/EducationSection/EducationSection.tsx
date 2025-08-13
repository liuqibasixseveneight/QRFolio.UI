import { CollapsibleSection, Section, TimelineItem } from '@/components/ui';
import { formatDate } from '../../helpers';
import type { EducationSectionProps } from './types';

const ACCENT_COLOR = 'indigo-600';

const EducationSection = ({ education = [] }: EducationSectionProps) => {
  if (!education?.length) return null;

  return (
    <CollapsibleSection title='Education' count={education?.length}>
      <Section title='' accentColor={ACCENT_COLOR}>
        {education?.map((edu, index) => (
          <TimelineItem
            key={`${edu?.degree}-${index}`}
            title={`${edu?.degree} in ${edu?.fieldOfStudy}`}
            subtitle={edu?.schoolName}
            date={`${formatDate(edu?.dateFrom)} - ${formatDate(edu?.dateTo)}`}
            description={edu?.description}
            accentColor={ACCENT_COLOR}
          />
        ))}
      </Section>
    </CollapsibleSection>
  );
};

export default EducationSection;
