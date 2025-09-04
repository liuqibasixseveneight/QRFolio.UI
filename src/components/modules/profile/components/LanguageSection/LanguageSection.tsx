import type { LanguageSectionProps } from './types';

const LanguageSection = ({ languages = [] }: LanguageSectionProps) => {
  if (!languages?.length) return null;

  return (
    <div className='space-y-12 pb-16'>
      {languages?.map((language, index) => (
        <div
          key={`${language?.language}-${index}`}
          className={`group relative p-0 bg-transparent border-0 ${
            index === languages.length - 1 ? 'pb-4' : ''
          }`}
        >
          <div className='mb-6'>
            <h3 className='text-2xl font-light text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300'>
              {language?.language}
            </h3>

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
          </div>

          {index < languages.length - 1 && (
            <div className='w-full h-px bg-gray-100 my-8'></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LanguageSection;
