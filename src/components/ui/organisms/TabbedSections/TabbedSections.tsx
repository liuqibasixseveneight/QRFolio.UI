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
      <TabsList className='w-full justify-start overflow-x-auto bg-gray-50/90 backdrop-blur-sm border border-gray-200/50 rounded-xl p-1.5 mb-6 shadow-sm'>
        {tabs?.map((tab) => (
          <TabsTrigger
            key={tab?.value}
            value={tab?.value}
            className='flex-shrink-0 min-w-fit px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-800 hover:bg-white/95 hover:shadow-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-lg data-[state=active]:border-gray-200/50 transition-all duration-200 rounded-lg'
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
