import { useAuth } from '@/context';
import { useGetProfile } from '@/apollo/profile';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  Briefcase,
  GraduationCap,
  Languages,
  Sparkles,
  ArrowUp,
  User,
} from 'lucide-react';

import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import {
  EducationSection,
  ExperienceSection,
  LanguageSection,
  SkillsSection,
} from '../components';
import { LoadingSpinner } from '@/components/ui';

const Profile = () => {
  const { userId } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    workExperience: true,
    education: true,
    languages: true,
    skills: true,
  });

  // Use the profile ID from URL params, fallback to current user's ID
  const profileId = id || userId || '';
  const isOwner = profileId === userId;

  // @ts-ignore
  const [data, { loading }] = useGetProfile(profileId);
  const profile = data?.profile;

  // Handle scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleEditClick = () => {
    if (isOwner && profileId) {
      navigate(`/profile/${profileId}/edit`);
    }
  };

  if (!profile) {
    return (
      <main className='min-h-screen w-full bg-white flex items-center justify-center p-8 text-center'>
        <div className='max-w-md mx-auto'>
          <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center'>
            <User className='w-10 h-10 text-gray-600' />
          </div>
          <h2 className='text-2xl sm:text-3xl font-light text-gray-900 mb-4'>
            Profile Not Found
          </h2>
          <p className='text-gray-600 text-base sm:text-lg leading-relaxed'>
            The profile you're looking for doesn't exist or has been deleted.
          </p>
        </div>
      </main>
    );
  }

  const {
    fullName,
    professionalSummary,
    email,
    phone,
    linkedin,
    portfolio,
    availability,
    workExperience = [],
    education = [],
    languages = [],
    skills = [],
    updatedAt,
  } = profile;

  // Check if there's any content to display
  const hasContent =
    (workExperience && workExperience.length > 0) ||
    (education && education.length > 0) ||
    (languages && languages.length > 0) ||
    (skills && skills.length > 0);

  // Check if all sections are collapsed
  const allSectionsCollapsed =
    !expandedSections.workExperience &&
    !expandedSections.education &&
    !expandedSections.languages &&
    !expandedSections.skills;

  return (
    <main
      data-profile-page
      className={`${
        allSectionsCollapsed ? '' : 'min-h-screen'
      } w-full bg-gray-50 text-gray-900 font-sans relative overflow-hidden`}
    >
      {loading ? (
        <main className='min-h-screen w-full bg-gray-50 flex items-center justify-center'>
          <div className='text-center'>
            <div className='w-16 h-16 mx-auto mb-6'>
              <LoadingSpinner />
            </div>
            <p className='text-gray-600 text-sm font-medium'>
              Loading profile...
            </p>
          </div>
        </main>
      ) : (
        <div>
          <ProfileHeader
            fullName={fullName}
            summary={professionalSummary}
            email={email}
            phone={phone}
            linkedin={linkedin}
            portfolio={portfolio}
            availability={availability}
            workExperience={workExperience}
            education={education}
            languages={languages}
            skills={skills}
            updatedAt={updatedAt}
            isOwner={isOwner}
            onEditClick={handleEditClick}
          />

          {hasContent ? (
            <div className='relative z-10 px-4 xs:px-6 sm:px-8 lg:px-12 py-8 xs:py-12 sm:py-16 lg:py-20'>
              <div className='max-w-6xl mx-auto w-full'>
                {allSectionsCollapsed ? (
                  // When all sections are collapsed, render without white background
                  <div>
                    <div className='bg-white rounded-t-2xl shadow-sm border border-gray-100 px-4 xs:px-6 sm:px-8 lg:px-12 py-8 xs:py-12 sm:py-16'>
                      <div className='text-center'>
                        <div className='inline-flex items-center gap-2 px-3 xs:px-4 py-2 bg-gray-100 rounded-full mb-4 xs:mb-6'>
                          <div className='w-1.5 xs:w-2 h-1.5 xs:h-2 bg-gray-400 rounded-full'></div>
                          <span className='text-xs font-medium text-gray-600 uppercase tracking-wider'>
                            Experience
                          </span>
                        </div>
                        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 sm:mb-6 leading-tight'>
                          Professional Journey
                        </h2>
                        <p className='text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-4 sm:px-0'>
                          A curated collection of my professional achievements,
                          educational milestones, and language capabilities.
                        </p>
                      </div>
                    </div>

                    {workExperience && workExperience.length > 0 && (
                      <div className='bg-white shadow-sm border border-gray-100 px-6 sm:px-8 lg:px-12 py-12 sm:py-16 -mt-2'>
                        <div className='group'>
                          <button
                            onClick={() => toggleSection('workExperience')}
                            className='w-full text-left p-0 bg-transparent hover:bg-transparent rounded-none border-0 transition-all duration-300 cursor-pointer'
                          >
                            <div className='flex items-center justify-between mb-6 sm:mb-8 gap-4'>
                              <div className='flex items-center gap-4 sm:gap-6 lg:gap-8'>
                                <div className='w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0'>
                                  <Briefcase className='w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-gray-600' />
                                </div>
                                <div className='min-w-0 flex-1'>
                                  <h3 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-2 sm:mb-3'>
                                    Work Experience
                                  </h3>
                                  <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
                                    <span className='text-sm text-gray-900 font-medium'>
                                      {workExperience.length} position
                                      {workExperience.length !== 1 ? 's' : ''}
                                    </span>
                                    <div className='hidden sm:block w-1 h-1 bg-gray-300 rounded-full'></div>
                                    <div className='flex items-center gap-2'>
                                      <span className='text-sm text-gray-400'>
                                        {workExperience.length > 0
                                          ? expandedSections.workExperience
                                            ? 'Click to collapse'
                                            : 'Click to expand'
                                          : 'No positions yet'}
                                      </span>
                                      <div className='text-gray-400 group-hover:text-gray-600 transition-colors duration-300'>
                                        {expandedSections.workExperience ? (
                                          <ChevronDown className='w-4 h-4' />
                                        ) : (
                                          <ChevronRight className='w-4 h-4' />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </button>

                          <div
                            className={`transition-all duration-700 ease-in-out ${
                              expandedSections.workExperience
                                ? 'opacity-100 mt-8'
                                : 'opacity-0 mt-0 max-h-0 overflow-hidden'
                            }`}
                          >
                            <ExperienceSection
                              workExperience={workExperience}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {education && education.length > 0 && (
                      <div className='bg-white shadow-sm border border-gray-100 px-6 sm:px-8 lg:px-12 py-12 sm:py-16 -mt-2'>
                        <div className='group'>
                          <button
                            onClick={() => toggleSection('education')}
                            className='w-full text-left p-0 bg-transparent hover:bg-transparent rounded-none border-0 transition-all duration-300 cursor-pointer'
                          >
                            <div className='flex items-center justify-between mb-6 sm:mb-8 gap-4'>
                              <div className='flex items-center gap-4 sm:gap-6 lg:gap-8'>
                                <div className='w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0'>
                                  <GraduationCap className='w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-gray-600' />
                                </div>
                                <div className='min-w-0 flex-1'>
                                  <h3 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-2 sm:mb-3'>
                                    Education
                                  </h3>
                                  <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
                                    <span className='text-sm text-gray-900 font-medium'>
                                      {education.length} degree
                                      {education.length !== 1 ? 's' : ''}
                                    </span>
                                    <div className='hidden sm:block w-1 h-1 bg-gray-300 rounded-full'></div>
                                    <div className='flex items-center gap-2'>
                                      <span className='text-sm text-gray-400'>
                                        {education.length > 0
                                          ? expandedSections.education
                                            ? 'Click to collapse'
                                            : 'Click to expand'
                                          : 'No degrees yet'}
                                      </span>
                                      <div className='text-gray-400 group-hover:text-gray-600 transition-colors duration-300'>
                                        {expandedSections.education ? (
                                          <ChevronDown className='w-4 h-4' />
                                        ) : (
                                          <ChevronRight className='w-4 h-4' />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </button>

                          <div
                            className={`transition-all duration-700 ease-in-out ${
                              expandedSections.education
                                ? 'opacity-100 mt-8'
                                : 'opacity-0 mt-0 max-h-0 overflow-hidden'
                            }`}
                          >
                            <EducationSection education={education} />
                          </div>
                        </div>
                      </div>
                    )}

                    {languages && languages.length > 0 && (
                      <div className='bg-white shadow-sm border border-gray-100 px-6 sm:px-8 lg:px-12 py-12 sm:py-16 -mt-2'>
                        <div className='group'>
                          <button
                            onClick={() => toggleSection('languages')}
                            className='w-full text-left p-0 bg-transparent hover:bg-transparent rounded-none border-0 transition-all duration-300 cursor-pointer'
                          >
                            <div className='flex items-center justify-between mb-6 sm:mb-8 gap-4'>
                              <div className='flex items-center gap-4 sm:gap-6 lg:gap-8'>
                                <div className='w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0'>
                                  <Languages className='w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-gray-600' />
                                </div>
                                <div className='min-w-0 flex-1'>
                                  <h3 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-2 sm:mb-3'>
                                    Languages
                                  </h3>
                                  <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
                                    <span className='text-sm text-gray-900 font-medium'>
                                      {languages.length} language
                                      {languages.length !== 1 ? 's' : ''}
                                    </span>
                                    <div className='hidden sm:block w-1 h-1 bg-gray-300 rounded-full'></div>
                                    <div className='flex items-center gap-2'>
                                      <span className='text-sm text-gray-400'>
                                        {languages.length > 0
                                          ? expandedSections.languages
                                            ? 'Click to collapse'
                                            : 'Click to expand'
                                          : 'No languages yet'}
                                      </span>
                                      <div className='text-gray-400 group-hover:text-gray-600 transition-colors duration-300'>
                                        {expandedSections.languages ? (
                                          <ChevronDown className='w-4 h-4' />
                                        ) : (
                                          <ChevronRight className='w-4 h-4' />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </button>

                          <div
                            className={`transition-all duration-700 ease-in-out ${
                              expandedSections.languages
                                ? 'opacity-100 mt-8'
                                : 'opacity-0 mt-0 max-h-0 overflow-hidden'
                            }`}
                          >
                            <LanguageSection languages={languages} />
                          </div>
                        </div>
                      </div>
                    )}

                    {skills && skills.length > 0 && (
                      <div className='bg-white shadow-sm border border-gray-100 px-4 xs:px-6 sm:px-8 lg:px-12 py-8 xs:py-12 sm:py-16 -mt-2 rounded-b-2xl'>
                        <div className='group'>
                          <button
                            onClick={() => toggleSection('skills')}
                            className='w-full text-left p-0 bg-transparent hover:bg-transparent rounded-none border-0 transition-all duration-300 cursor-pointer'
                          >
                            <div className='flex items-center justify-between mb-6 sm:mb-8 gap-4'>
                              <div className='flex items-center gap-4 sm:gap-6 lg:gap-8'>
                                <div className='w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0'>
                                  <Sparkles className='w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-gray-600' />
                                </div>
                                <div className='min-w-0 flex-1'>
                                  <h3 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-2 sm:mb-3'>
                                    Skills
                                  </h3>
                                  <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
                                    <span className='text-sm text-gray-900 font-medium'>
                                      {skills.length} skill
                                      {skills.length !== 1 ? 's' : ''}
                                    </span>
                                    <div className='hidden sm:block w-1 h-1 bg-gray-300 rounded-full'></div>
                                    <div className='flex items-center gap-2'>
                                      <span className='text-sm text-gray-400'>
                                        {skills.length > 0
                                          ? expandedSections.skills
                                            ? 'Click to collapse'
                                            : 'Click to expand'
                                          : 'No skills yet'}
                                      </span>
                                      <div className='text-gray-400 group-hover:text-gray-600 transition-colors duration-300'>
                                        {expandedSections.skills ? (
                                          <ChevronDown className='w-4 h-4' />
                                        ) : (
                                          <ChevronRight className='w-4 h-4' />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </button>

                          <div
                            className={`transition-all duration-700 ease-in-out ${
                              expandedSections.skills
                                ? 'opacity-100 mt-8'
                                : 'opacity-0 mt-0 max-h-0 overflow-hidden'
                            }`}
                          >
                            <SkillsSection skills={skills} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // When sections are expanded, use the original white background container
                  <div className='bg-white rounded-2xl shadow-sm border border-gray-100'>
                    <div className='px-4 xs:px-6 sm:px-8 lg:px-12 py-8 xs:py-12 sm:py-16 border-b border-gray-100'>
                      <div className='text-center'>
                        <div className='inline-flex items-center gap-2 px-3 xs:px-4 py-2 bg-gray-100 rounded-full mb-4 xs:mb-6'>
                          <div className='w-1.5 xs:w-2 h-1.5 xs:h-2 bg-gray-400 rounded-full'></div>
                          <span className='text-xs font-medium text-gray-600 uppercase tracking-wider'>
                            Experience
                          </span>
                        </div>
                        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 sm:mb-6 leading-tight'>
                          Professional Journey
                        </h2>
                        <p className='text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-4 sm:px-0'>
                          A curated collection of my professional achievements,
                          educational milestones, and language capabilities.
                        </p>
                      </div>
                    </div>

                    {workExperience && workExperience.length > 0 && (
                      <div className='px-4 xs:px-6 sm:px-8 lg:px-12 py-8 xs:py-12 sm:py-16 border-b border-gray-100'>
                        <div className='group'>
                          <button
                            onClick={() => toggleSection('workExperience')}
                            className='w-full text-left p-0 bg-transparent hover:bg-transparent rounded-none border-0 transition-all duration-300 cursor-pointer'
                          >
                            <div className='flex items-center justify-between mb-6 sm:mb-8 gap-4'>
                              <div className='flex items-center gap-4 sm:gap-6 lg:gap-8'>
                                <div className='w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0'>
                                  <Briefcase className='w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-gray-600' />
                                </div>
                                <div className='min-w-0 flex-1'>
                                  <h3 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-2 sm:mb-3'>
                                    Work Experience
                                  </h3>
                                  <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
                                    <span className='text-sm text-gray-900 font-medium'>
                                      {workExperience.length} position
                                      {workExperience.length !== 1 ? 's' : ''}
                                    </span>
                                    <div className='hidden sm:block w-1 h-1 bg-gray-300 rounded-full'></div>
                                    <div className='flex items-center gap-2'>
                                      <span className='text-sm text-gray-400'>
                                        {workExperience.length > 0
                                          ? expandedSections.workExperience
                                            ? 'Click to collapse'
                                            : 'Click to expand'
                                          : 'No positions yet'}
                                      </span>
                                      <div className='text-gray-400 group-hover:text-gray-600 transition-colors duration-300'>
                                        {expandedSections.workExperience ? (
                                          <ChevronDown className='w-4 h-4' />
                                        ) : (
                                          <ChevronRight className='w-4 h-4' />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </button>

                          <div
                            className={`transition-all duration-700 ease-in-out ${
                              expandedSections.workExperience
                                ? 'opacity-100 mt-8'
                                : 'opacity-0 mt-0 max-h-0 overflow-hidden'
                            }`}
                          >
                            <ExperienceSection
                              workExperience={workExperience}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {education && education.length > 0 && (
                      <div className='px-4 xs:px-6 sm:px-8 lg:px-12 py-8 xs:py-12 sm:py-16 border-b border-gray-100'>
                        <div className='group'>
                          <button
                            onClick={() => toggleSection('education')}
                            className='w-full text-left p-0 bg-transparent hover:bg-transparent rounded-none border-0 transition-all duration-300 cursor-pointer'
                          >
                            <div className='flex items-center justify-between mb-6 sm:mb-8 gap-4'>
                              <div className='flex items-center gap-4 sm:gap-6 lg:gap-8'>
                                <div className='w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0'>
                                  <GraduationCap className='w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-gray-600' />
                                </div>
                                <div className='min-w-0 flex-1'>
                                  <h3 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-2 sm:mb-3'>
                                    Education
                                  </h3>
                                  <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
                                    <span className='text-sm text-gray-900 font-medium'>
                                      {education.length} degree
                                      {education.length !== 1 ? 's' : ''}
                                    </span>
                                    <div className='hidden sm:block w-1 h-1 bg-gray-300 rounded-full'></div>
                                    <div className='flex items-center gap-2'>
                                      <span className='text-sm text-gray-400'>
                                        {education.length > 0
                                          ? expandedSections.education
                                            ? 'Click to collapse'
                                            : 'Click to expand'
                                          : 'No degrees yet'}
                                      </span>
                                      <div className='text-gray-400 group-hover:text-gray-600 transition-colors duration-300'>
                                        {expandedSections.education ? (
                                          <ChevronDown className='w-4 h-4' />
                                        ) : (
                                          <ChevronRight className='w-4 h-4' />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </button>

                          <div
                            className={`transition-all duration-700 ease-in-out ${
                              expandedSections.education
                                ? 'opacity-100 mt-8'
                                : 'opacity-0 mt-0 max-h-0 overflow-hidden'
                            }`}
                          >
                            <EducationSection education={education} />
                          </div>
                        </div>
                      </div>
                    )}

                    {languages && languages.length > 0 && (
                      <div className='px-4 xs:px-6 sm:px-8 lg:px-12 py-8 xs:py-12 sm:py-16 border-b border-gray-100'>
                        <div className='group'>
                          <button
                            onClick={() => toggleSection('languages')}
                            className='w-full text-left p-0 bg-transparent hover:bg-transparent rounded-none border-0 transition-all duration-300 cursor-pointer'
                          >
                            <div className='flex items-center justify-between mb-6 sm:mb-8 gap-4'>
                              <div className='flex items-center gap-4 sm:gap-6 lg:gap-8'>
                                <div className='w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0'>
                                  <Languages className='w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-gray-600' />
                                </div>
                                <div className='min-w-0 flex-1'>
                                  <h3 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-2 sm:mb-3'>
                                    Languages
                                  </h3>
                                  <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
                                    <span className='text-sm text-gray-900 font-medium'>
                                      {languages.length} language
                                      {languages.length !== 1 ? 's' : ''}
                                    </span>
                                    <div className='hidden sm:block w-1 h-1 bg-gray-300 rounded-full'></div>
                                    <div className='flex items-center gap-2'>
                                      <span className='text-sm text-gray-400'>
                                        {languages.length > 0
                                          ? expandedSections.languages
                                            ? 'Click to collapse'
                                            : 'Click to expand'
                                          : 'No languages yet'}
                                      </span>
                                      <div className='text-gray-400 group-hover:text-gray-600 transition-colors duration-300'>
                                        {expandedSections.languages ? (
                                          <ChevronDown className='w-4 h-4' />
                                        ) : (
                                          <ChevronRight className='w-4 h-4' />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </button>

                          <div
                            className={`transition-all duration-700 ease-in-out ${
                              expandedSections.languages
                                ? 'opacity-100 mt-8'
                                : 'opacity-0 mt-0 max-h-0 overflow-hidden'
                            }`}
                          >
                            <LanguageSection languages={languages} />
                          </div>
                        </div>
                      </div>
                    )}

                    {skills && skills.length > 0 && (
                      <div className='px-4 xs:px-6 sm:px-8 lg:px-12 py-8 xs:py-12 sm:py-16 rounded-b-2xl'>
                        <div className='group'>
                          <button
                            onClick={() => toggleSection('skills')}
                            className='w-full text-left p-0 bg-transparent hover:bg-transparent rounded-none border-0 transition-all duration-300 cursor-pointer'
                          >
                            <div className='flex items-center justify-between mb-6 sm:mb-8 gap-4'>
                              <div className='flex items-center gap-4 sm:gap-6 lg:gap-8'>
                                <div className='w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0'>
                                  <Sparkles className='w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-gray-600' />
                                </div>
                                <div className='min-w-0 flex-1'>
                                  <h3 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-2 sm:mb-3'>
                                    Skills
                                  </h3>
                                  <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
                                    <span className='text-sm text-gray-900 font-medium'>
                                      {skills.length} skill
                                      {skills.length !== 1 ? 's' : ''}
                                    </span>
                                    <div className='hidden sm:block w-1 h-1 bg-gray-300 rounded-full'></div>
                                    <div className='flex items-center gap-2'>
                                      <span className='text-sm text-gray-400'>
                                        {skills.length > 0
                                          ? expandedSections.skills
                                            ? 'Click to collapse'
                                            : 'Click to expand'
                                          : 'No skills yet'}
                                      </span>
                                      <div className='text-gray-400 group-hover:text-gray-600 transition-colors duration-300'>
                                        {expandedSections.skills ? (
                                          <ChevronDown className='w-4 h-4' />
                                        ) : (
                                          <ChevronRight className='w-4 h-4' />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </button>

                          <div
                            className={`transition-all duration-700 ease-in-out ${
                              expandedSections.skills
                                ? 'opacity-100 mt-8'
                                : 'opacity-0 mt-0 max-h-0 overflow-hidden'
                            }`}
                          >
                            <SkillsSection skills={skills} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className='relative z-10 px-4 xs:px-6 sm:px-8 lg:px-12 py-8 xs:py-12 sm:py-16 lg:py-20'>
              <div className='max-w-6xl mx-auto w-full text-center'>
                <div className='w-28 h-28 mx-auto mb-10 rounded-full bg-gray-100 flex items-center justify-center'>
                  <Sparkles className='w-14 h-14 text-gray-400' />
                </div>
                <h3 className='text-2xl sm:text-3xl font-light text-gray-900 mb-6'>
                  Ready to build your profile
                </h3>
                <p className='text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed'>
                  Add your work experience, education, and language skills to
                  create a compelling digital resume.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-8 right-8 z-50 w-16 h-16 bg-white text-gray-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
        >
          <ArrowUp className='w-8 h-8 mx-auto' />
        </button>
      )}
    </main>
  );
};

export default Profile;
