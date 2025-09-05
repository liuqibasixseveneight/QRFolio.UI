import { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface Skill {
  skill: string;
}

interface SkillsInputProps {
  skills: Skill[];
  onSkillsChange: (skills: Skill[]) => void;
  placeholder?: string;
}

const SkillsInput = ({
  skills,
  onSkillsChange,
  placeholder = 'Type a skill and press Enter...',
}: SkillsInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addSkill();
    }
  };

  const addSkill = () => {
    const trimmedValue = inputValue.trim();
    if (
      trimmedValue &&
      !skills.some(
        (skill) => skill.skill.toLowerCase() === trimmedValue.toLowerCase()
      )
    ) {
      const newSkills = [...skills, { skill: trimmedValue }];
      onSkillsChange(newSkills);
      setInputValue('');
    }
  };

  const removeSkill = (indexToRemove: number) => {
    const newSkills = skills.filter((_, index) => index !== indexToRemove);
    onSkillsChange(newSkills);
  };

  return (
    <div className='space-y-4'>
      {/* Skills Display */}
      {skills.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {skills.map((skill, index) => (
            <div
              key={`${skill.skill}-${index}`}
              className='inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-gray-700 text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-200'
            >
              <span className='tracking-wide'>{skill.skill}</span>
              <button
                type='button'
                onClick={() => removeSkill(index)}
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          rows={3}
          className='w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent resize-none transition-all duration-200'
        />
        <div className='absolute bottom-3 right-3 text-xs text-gray-400'>
          Press Enter to add
        </div>
      </div>
    </div>
  );
};

export default SkillsInput;
