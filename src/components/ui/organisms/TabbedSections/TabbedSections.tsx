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
      <TabsList className='w-full justify-start overflow-x-auto'>
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
          className='w-full block'
        >
          {item?.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabbedSections;
