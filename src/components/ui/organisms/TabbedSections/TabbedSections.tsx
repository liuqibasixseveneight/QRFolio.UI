import { cn } from '@/lib/utils';
import type { TabbedSectionsProps } from './types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../molecules';

const TabbedSections = ({
  tabs,
  contents,
  defaultValue,
  className,
}: TabbedSectionsProps) => {
  return (
    <Tabs
      defaultValue={defaultValue ?? tabs?.[0]?.value}
      className={cn('w-full', className)}
    >
      <TabsList className='w-full justify-start overflow-x-auto bg-gray-100/80 border border-gray-200 rounded-lg p-1 mb-6'>
        {tabs?.map((tab) => (
          <TabsTrigger
            key={tab?.value}
            value={tab?.value}
            className='flex-shrink-0 min-w-fit px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white/80 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm transition-all duration-200'
          >
            {tab?.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {contents?.map((item) => (
        <TabsContent
          key={item?.value}
          value={item?.value}
          className='w-full block data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:animate-in data-[state=active]:fade-in-0 duration-200'
        >
          {item?.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabbedSections;
