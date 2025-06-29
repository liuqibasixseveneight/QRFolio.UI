import { QRCodeSVG } from 'qrcode.react';

import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';

type ResumeQRCardProps = {
  link: string;
  labels: {
    displayName: string;
  };
};

export const ResumeQRCard = ({ link, labels }: ResumeQRCardProps) => {
  const { displayName } = labels;

  return (
    <Card className='w-full max-w-sm p-6 text-center'>
      <CardHeader>
        <CardTitle className='text-xl font-bold'>Your QRFolio</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center gap-2'>
        <QRCodeSVG
          value={link}
          size={200}
          bgColor='#ffffff'
          fgColor='#000000'
          level='H'
        />

        <div className='flex flex-col items-center space-y-1 my-4'>
          <h3 className='text-lg font-semibold'>{displayName}</h3>
          <code className='text-sm text-gray-500 break-all'>{link}</code>
        </div>

        <Button
          onClick={() => navigator.clipboard.writeText(link)}
          variant='default'
        >
          Copy Link
        </Button>
      </CardContent>
    </Card>
  );
};
