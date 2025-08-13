import { CollapsibleSection, Section, TimelineItem } from '@/components/ui';
import { formatDate } from '../../helpers';
import type { ExperienceSectionProps } from './types';

const ACCENT_COLOR = 'indigo-600';

const ExperienceSection = ({ workExperience = [] }: ExperienceSectionProps) => {
  if (!workExperience?.length) return null;

  return (
    <CollapsibleSection title='Work Experience' count={workExperience?.length}>
      <Section title='' accentColor={ACCENT_COLOR}>
        {workExperience?.map((exp, index) => (
          <TimelineItem
            key={`${exp?.companyName}-${index}`}
            title={`${exp?.jobTitle} @ ${exp?.companyName}`}
            subtitle={exp?.location}
            date={`${formatDate(exp?.dateFrom)} - ${formatDate(exp?.dateTo)}`}
            description={exp?.responsibilities}
            accentColor={ACCENT_COLOR}
          />
        ))}
      </Section>
    </CollapsibleSection>
  );
};

export default ExperienceSection;
