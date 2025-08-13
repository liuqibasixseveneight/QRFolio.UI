import { CollapsibleSection } from '@/components/ui';
import type { LanguageSectionProps } from './types';
import LanguagesBadgeList from '../LanguageBadgeList/LanguageBadgeList';

const LanguageSection = ({ languages = [] }: LanguageSectionProps) => {
  if (!languages?.length) return null;

  return (
    <CollapsibleSection title='Languages' count={languages?.length}>
      <LanguagesBadgeList languages={languages} />
    </CollapsibleSection>
  );
};

export default LanguageSection;
