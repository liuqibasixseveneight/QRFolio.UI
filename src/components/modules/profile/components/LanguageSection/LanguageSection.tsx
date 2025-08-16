import type { LanguageSectionProps } from './types';
import LanguagesBadgeList from '../LanguageBadgeList/LanguageBadgeList';

const LanguageSection = ({ languages = [] }: LanguageSectionProps) => {
  if (!languages?.length) return null;

  return (
    <div className='space-y-6'>
      {languages?.map((language, index) => (
        <div
          key={`${language?.language}-${index}`}
          className='group relative p-6 bg-gradient-to-br from-purple-50/80 via-white/90 to-pink-50/80 backdrop-blur-xl rounded-2xl border border-white/60 hover:border-purple-200/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-100/50 hover:scale-[1.01]'
        >
          {/* Subtle border glow on hover */}
          <div className='absolute inset-0 rounded-2xl border border-transparent group-hover:border-purple-200/30 transition-all duration-500 pointer-events-none'></div>

          {/* Language Icon Placeholder with techzen aesthetic */}
          <div className='absolute top-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-100/80 via-pink-100/80 to-rose-100/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:shadow-2xl transition-all duration-500 border border-white/60'>
            <div className='w-7 h-7 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-xl'></div>
          </div>

          {/* Language Details */}
          <div className='pr-20'>
            <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-500'>
              {language?.language}
            </h3>

            {/* Fluency Level with techzen aesthetic */}
            <div className='flex items-center gap-3 mb-4'>
              <span className='text-lg font-semibold text-purple-600'>
                {language?.fluencyLevel}
              </span>
              <div className='flex items-center gap-1'>
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      level <=
                      (language?.fluencyLevel === 'Native'
                        ? 5
                        : language?.fluencyLevel === 'Fluent'
                        ? 4
                        : language?.fluencyLevel === 'Advanced'
                        ? 3
                        : language?.fluencyLevel === 'Intermediate'
                        ? 2
                        : 1)
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm'
                        : 'bg-gradient-to-r from-purple-200 to-pink-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Language Skills with techzen aesthetic */}
            <div className='flex flex-wrap gap-2 mt-4 pt-4 border-t border-purple-200/50'>
              <span className='px-3 py-1 bg-gradient-to-r from-purple-50/80 to-pink-50/80 backdrop-blur-sm text-purple-700 text-xs font-medium rounded-xl border border-purple-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105'>
                Business
              </span>
              <span className='px-3 py-1 bg-gradient-to-r from-pink-50/80 to-rose-50/80 backdrop-blur-sm text-pink-700 text-xs font-medium rounded-xl border border-pink-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105'>
                Technical
              </span>
              <span className='px-3 py-1 bg-gradient-to-r from-slate-50/80 to-purple-50/80 backdrop-blur-sm text-slate-700 text-xs font-medium rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105'>
                Conversational
              </span>
            </div>
          </div>

          {/* Enhanced hover effect with techzen aesthetic */}
          <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-purple-50/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none'></div>
        </div>
      ))}
    </div>
  );
};

export default LanguageSection;
