import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { TabbedSectionsProps } from './types';

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
      <TabsList className='mb-8'>
        {tabs?.map((tab) => (
          <TabsTrigger key={tab?.value} value={tab?.value}>
            {tab?.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {contents?.map((item) => (
        <TabsContent
          key={item?.value}
          value={item?.value}
          className='w-full block data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=active]:animate-in data-[state=active]:fade-in-0 duration-300'
        >
          {item?.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabbedSections;
