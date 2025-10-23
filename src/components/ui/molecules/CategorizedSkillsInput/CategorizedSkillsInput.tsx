import { useState, type KeyboardEvent } from 'react';
import { X, Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { Button, Ellipsis } from '@/components/ui';
import type { CategorizedSkillsInputProps } from '../SkillsInput/types';
import type { SkillCategory } from '@/apollo/profile';

const CategorizedSkillsInput = ({
  skillCategories,
  onSkillsChange,
  placeholder = 'Type a skill and press Enter...',
}: CategorizedSkillsInputProps) => {
  const [inputValues, setInputValues] = useState<{
    [categoryIndex: number]: string;
  }>({});
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number | null>(
    null
  );

  const addSkill = (categoryIndex: number) => {
    const inputValue = inputValues[categoryIndex] || '';
    const trimmedValue = inputValue.trim();

    if (trimmedValue) {
      const currentCategory = skillCategories[categoryIndex];
      const skillExists = currentCategory.skills.some(
        (skill) => skill.skill?.toLowerCase() === trimmedValue.toLowerCase()
      );

      if (!skillExists) {
        const newSkillCategories = [...skillCategories];
        newSkillCategories[categoryIndex] = {
          ...currentCategory,
          skills: [...currentCategory.skills, { skill: trimmedValue }],
        };
        onSkillsChange(newSkillCategories);
        setInputValues({ ...inputValues, [categoryIndex]: '' });
      }
    }
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const newSkillCategories = [...skillCategories];
    newSkillCategories[categoryIndex] = {
      ...newSkillCategories[categoryIndex],
      skills: newSkillCategories[categoryIndex].skills.filter(
        (_, index) => index !== skillIndex
      ),
    };
    onSkillsChange(newSkillCategories);
  };

  const addCategory = () => {
    const newCategory: SkillCategory = {
      title: '',
      skills: [],
    };
    onSkillsChange([...skillCategories, newCategory]);
  };

  const removeCategory = (categoryIndex: number) => {
    const newSkillCategories = skillCategories.filter(
      (_, index) => index !== categoryIndex
    );
    onSkillsChange(newSkillCategories);
  };

  const updateCategoryTitle = (categoryIndex: number, title: string) => {
    const newSkillCategories = [...skillCategories];
    newSkillCategories[categoryIndex] = {
      ...newSkillCategories[categoryIndex],
      title,
    };
    onSkillsChange(newSkillCategories);
  };

  const handleKeyPress = (
    e: KeyboardEvent<HTMLTextAreaElement>,
    categoryIndex: number
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addSkill(categoryIndex);
    }
  };

  const handleInputChange = (categoryIndex: number, value: string) => {
    setInputValues({ ...inputValues, [categoryIndex]: value });
  };

  const toggleCategory = (categoryIndex: number) => {
    setActiveCategoryIndex(
      activeCategoryIndex === categoryIndex ? null : categoryIndex
    );
  };

  const handleRemove = (categoryIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    removeCategory(categoryIndex);
    // Adjust active index if needed
    if (activeCategoryIndex === categoryIndex) {
      setActiveCategoryIndex(null);
    } else if (
      activeCategoryIndex !== null &&
      activeCategoryIndex > categoryIndex
    ) {
      setActiveCategoryIndex(activeCategoryIndex - 1);
    }
  };

  return (
    <div className='space-y-8'>
      {skillCategories.map((category, categoryIndex) => {
        const isActive = activeCategoryIndex === categoryIndex;

        // Determine display title
        let displayTitle: React.ReactNode;
        if (category.title && category.title.trim()) {
          displayTitle = (
            <Ellipsis
              text={category.title}
              maxLength={50}
              className='font-medium text-slate-900'
            />
          );
        } else {
          displayTitle = (
            <em className='text-slate-500 italic'>New Skills Category</em>
          );
        }

        // Show skills count as subtitle
        const skillsCount = category.skills?.length || 0;
        const skillsText =
          skillsCount === 1 ? '1 skill' : `${skillsCount} skills`;

        return (
          <div
            key={categoryIndex}
            className='rounded-2xl bg-gradient-to-r from-slate-50/90 via-white to-slate-50/90 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:from-slate-50/95 hover:via-white hover:to-slate-50/95 border border-slate-200/40 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:shadow-slate-200/30'
          >
            <div
              className='p-4 sm:p-6 bg-gradient-to-r from-slate-50/50 via-white to-slate-50/50 cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:from-slate-50/70 hover:via-white hover:to-slate-50/70 transition-all duration-300'
              onClick={() => toggleCategory(categoryIndex)}
            >
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2'>
                  {isActive ? (
                    <ChevronDown className='h-4 w-4 text-slate-600 flex-shrink-0' />
                  ) : (
                    <ChevronRight className='h-4 w-4 text-slate-600 flex-shrink-0' />
                  )}
                  <span className='font-medium text-slate-900 block'>
                    {displayTitle}
                  </span>
                </div>
                <span className='text-sm text-slate-600 block ml-6'>
                  {skillsText}
                </span>
              </div>
              <div className='flex items-center gap-2 flex-shrink-0'>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={(e: React.MouseEvent) =>
                    handleRemove(categoryIndex, e)
                  }
                  className='px-3 py-2 text-xs font-medium transition-all duration-300 hover:bg-red-50 hover:border-red-300/50 hover:text-red-700 hover:shadow-md hover:shadow-red-200/30 border-red-200/50 text-red-600 bg-white/80 backdrop-blur-sm flex items-center gap-1.5 cursor-pointer'
                >
                  <Trash2 className='h-3.5 w-3.5' />
                  Remove
                </Button>
              </div>
            </div>

            {isActive && (
              <div className='p-6 space-y-6 bg-white/90 border-t border-slate-200/40'>
                {/* Category Title Input */}
                <div>
                  <input
                    type='text'
                    value={category.title}
                    onChange={(e) =>
                      updateCategoryTitle(categoryIndex, e.target.value)
                    }
                    placeholder='Category title (e.g., Frontend, Backend, Tools)'
                    className='w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent transition-all duration-200 font-medium bg-white/80 backdrop-blur-sm shadow-sm'
                  />
                </div>

                {/* Skills Display */}
                {category.skills.length > 0 && (
                  <div className='flex flex-wrap gap-2'>
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={`${skill.skill}-${skillIndex}`}
                        className='inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 border border-slate-200 rounded-full text-slate-700 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm'
                      >
                        <span className='tracking-wide'>{skill.skill}</span>
                        <button
                          type='button'
                          onClick={() => removeSkill(categoryIndex, skillIndex)}
                          className='flex items-center justify-center w-4 h-4 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors duration-200 cursor-pointer'
                        >
                          <X className='w-3 h-3' />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Input Textarea */}
                <div className='relative'>
                  <textarea
                    value={inputValues[categoryIndex] || ''}
                    onChange={(e) =>
                      handleInputChange(categoryIndex, e.target.value)
                    }
                    onKeyPress={(e) => handleKeyPress(e, categoryIndex)}
                    placeholder={placeholder}
                    rows={3}
                    className='w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent resize-none transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm'
                  />
                  <div className='absolute bottom-3 right-3 text-xs text-slate-400'>
                    Press Enter to add
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Add Category Button */}
      <Button
        type='button'
        variant='outline'
        onClick={() => {
          addCategory();
          setActiveCategoryIndex(skillCategories.length);
        }}
        className='w-full border-dashed border-2 border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-700 hover:bg-slate-50 cursor-pointer transition-all duration-300 py-4 rounded-xl'
      >
        <Plus className='w-4 h-4 mr-2' />
        Add Skills Category
      </Button>
    </div>
  );
};

export default CategorizedSkillsInput;
