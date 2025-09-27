import { useState, type KeyboardEvent } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui';
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

  return (
    <div className='space-y-6'>
      {skillCategories.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className='bg-gray-50 rounded-xl p-6 border border-gray-200'
        >
          <div className='flex items-center justify-between mb-4'>
            <div className='flex-1 mr-4'>
              <input
                type='text'
                value={category.title}
                onChange={(e) =>
                  updateCategoryTitle(categoryIndex, e.target.value)
                }
                placeholder='Category title (e.g., Frontend, Backend, Tools)'
                className='w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-200 font-medium'
              />
            </div>
            {skillCategories.length > 1 && (
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={() => removeCategory(categoryIndex)}
                className='text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 cursor-pointer'
              >
                <Trash2 className='w-4 h-4' />
              </Button>
            )}
          </div>

          {/* Skills Display */}
          {category.skills.length > 0 && (
            <div className='flex flex-wrap gap-2 mb-4'>
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={`${skill.skill}-${skillIndex}`}
                  className='inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-700 text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-200'
                >
                  <span className='tracking-wide'>{skill.skill}</span>
                  <button
                    type='button'
                    onClick={() => removeSkill(categoryIndex, skillIndex)}
                    className='flex items-center justify-center w-4 h-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200 cursor-pointer'
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
              onChange={(e) => handleInputChange(categoryIndex, e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, categoryIndex)}
              placeholder={placeholder}
              rows={3}
              className='w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent resize-none transition-all duration-200'
            />
            <div className='absolute bottom-3 right-3 text-xs text-gray-400'>
              Press Enter to add
            </div>
          </div>
        </div>
      ))}

      {/* Add Category Button */}
      <Button
        type='button'
        variant='outline'
        onClick={addCategory}
        className='w-full border-dashed border-2 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700 hover:bg-gray-50 cursor-pointer'
      >
        <Plus className='w-4 h-4 mr-2' />
        Add Skills Category
      </Button>
    </div>
  );
};

export default CategorizedSkillsInput;

