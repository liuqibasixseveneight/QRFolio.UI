import { Star } from 'lucide-react';
import type { LanguageSectionProps } from './types';

const LanguageSection = ({ languages = [] }: LanguageSectionProps) => {
  if (!languages?.length) return null;

  return (
    <div className='space-y-12'>
      {languages?.map((language, index) => (
        <div
          key={`${language?.language}-${index}`}
          className='group relative p-0 bg-transparent border-0'
        >
          {/* Language Details */}
          <div className='mb-6'>
            <h3 className='text-2xl font-light text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300'>
              {language?.language}
            </h3>

            {/* Fluency Level */}
            <div className='flex items-center gap-4 mb-6'>
              <span className='text-xl font-medium text-gray-700'>
                {language?.fluencyLevel}
              </span>
              <div className='flex items-center gap-1'>
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
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
                        ? 'bg-gray-400'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Language Skills */}
            <div className='flex flex-wrap gap-3 pt-6 border-t border-gray-100'>
              <span className='px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-200'>
                Business
              </span>
              <span className='px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-200'>
                Technical
              </span>
              <span className='px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-200'>
                Conversational
              </span>
              <span className='px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-md border border-gray-200'>
                Writing
              </span>
            </div>

            {/* Proficiency Details */}
            <div className='mt-6 pt-6 border-t border-gray-100'>
              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100'>
                  <span className='text-gray-600'>Speaking</span>
                  <div className='flex items-center gap-1'>
                    <Star className='w-4 h-4 text-gray-400 fill-current' />
                    <span className='font-medium text-gray-800'>5.0</span>
                  </div>
                </div>
                <div className='flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100'>
                  <span className='text-gray-600'>Writing</span>
                  <div className='flex items-center gap-1'>
                    <Star className='w-4 h-4 text-gray-400 fill-current' />
                    <span className='font-medium text-gray-800'>4.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Separator line */}
          {index < languages.length - 1 && (
            <div className='w-full h-px bg-gray-100 my-8'></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LanguageSection;
