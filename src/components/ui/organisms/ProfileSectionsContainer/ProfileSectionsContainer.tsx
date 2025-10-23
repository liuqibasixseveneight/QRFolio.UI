import { memo } from 'react';
import { Briefcase, GraduationCap, Languages, Sparkles } from 'lucide-react';

import {
  ProfileSection,
  ProfileJourneyHeader,
} from '@/components/ui/molecules';
import {
  EducationSection,
  ExperienceSection,
  LanguageSection,
  SkillsSection,
} from '@/components/modules/profile/components';
import type { ProfileSectionsContainerProps } from './types';

const ProfileSectionsContainer = memo<ProfileSectionsContainerProps>(
  ({
    workExperience,
    education,
    languages,
    skills,
    expandedSections,
    onToggleSection,
    className = '',
    showWorkExperience = true,
    showEducation = true,
    showLanguages = true,
    showSkills = true,
  }) => {
    const allSectionsCollapsed =
      !expandedSections.workExperience &&
      !expandedSections.education &&
      !expandedSections.languages &&
      !expandedSections.skills;

    const sections = [
      {
        key: 'workExperience' as const,
        title: 'Work Experience',
        count: workExperience.length,
        icon: (
          <Briefcase className='w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-gray-600' />
        ),
        data: workExperience,
        component: <ExperienceSection workExperience={workExperience} />,
        show: showWorkExperience,
      },
      {
        key: 'education' as const,
        title: 'Education',
        count: education.length,
        icon: (
          <GraduationCap className='w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-gray-600' />
        ),
        data: education,
        component: <EducationSection education={education} />,
        show: showEducation,
      },
      {
        key: 'languages' as const,
        title: 'Languages',
        count: languages.length,
        icon: (
          <Languages className='w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-gray-600' />
        ),
        data: languages,
        component: <LanguageSection languages={languages} />,
        show: showLanguages,
      },
      {
        key: 'skills' as const,
        title: 'Skills',
        count: skills.length,
        icon: (
          <Sparkles className='w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-gray-600' />
        ),
        data: skills,
        component: <SkillsSection skills={skills} />,
        show: showSkills,
      },
    ];

    const sectionsWithData = sections.filter(
      (section) => section.data.length > 0 && section.show
    );

    return (
      <div
        className={`relative z-10 px-4 xs:px-6 sm:px-8 lg:px-12 py-8 xs:py-12 sm:py-16 lg:py-20 ${className}`}
      >
        <div className='max-w-6xl mx-auto w-full'>
          {allSectionsCollapsed ? (
            // Collapsed mode - individual sections with rounded corners
            <div>
              <ProfileJourneyHeader isCollapsedMode={true} />

              {sectionsWithData.map((section, index) => (
                <ProfileSection
                  key={section.key}
                  title={section.title}
                  count={section.count}
                  icon={section.icon}
                  isExpanded={expandedSections[section.key]}
                  onToggle={() => onToggleSection(section.key)}
                  isLast={index === sectionsWithData.length - 1}
                  isCollapsedMode={true}
                >
                  {section.component}
                </ProfileSection>
              ))}
            </div>
          ) : (
            // Expanded mode - single container with borders
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100'>
              <ProfileJourneyHeader />

              {sectionsWithData.map((section, index) => (
                <ProfileSection
                  key={section.key}
                  title={section.title}
                  count={section.count}
                  icon={section.icon}
                  isExpanded={expandedSections[section.key]}
                  onToggle={() => onToggleSection(section.key)}
                  isLast={index === sectionsWithData.length - 1}
                  isCollapsedMode={false}
                >
                  {section.component}
                </ProfileSection>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ProfileSectionsContainer.displayName = 'ProfileSectionsContainer';

export default ProfileSectionsContainer;
