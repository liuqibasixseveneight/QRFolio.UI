import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';

import type { ProfileQRCardProps } from './types';
import { Card, CardContent, CardHeader } from '../Card';
import { Button } from '../../atoms';

const ProfileQRCard = ({ link, labels }: ProfileQRCardProps) => {
  const { displayName } = labels;

  const url = new URL(link);
  const path = url.pathname;

  return (
    <Card className='w-full max-w-sm p-6 text-center'>
      <CardHeader></CardHeader>
      <CardContent className='flex flex-col items-center gap-2'>
        <div
          style={{
            position: 'relative',
            width: 248,
            height: 248,
            borderRadius: 28,
            padding: 12,
            background:
              'linear-gradient(135deg, #b993d6 0%, #8ca6db 50%, #fbc2eb 100%)',
            boxShadow: '0 8px 20px rgba(185, 147, 214, 0.3)',
            display: 'inline-block',
          }}
        >
          <div
            style={{
              width: 224,
              height: 224,
              borderRadius: 20,
              backgroundColor: 'white',
              padding: 12,
              boxSizing: 'border-box',
              position: 'relative',
            }}
          >
            <QRCodeSVG
              value={link}
              size={200}
              bgColor='#fff'
              fgColor='#0033cc'
              level='H'
              style={{ display: 'block' }}
            />

            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png'
              alt='Company Logo'
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 64,
                height: 64,
                transform: 'translate(-50%, -50%)',
                borderRadius: '50%',
                background: 'white',
                padding: 8,
                boxShadow:
                  '0 4px 8px rgba(0,0,0,0.1), inset 0 0 6px rgba(255,255,255,0.6)',
                border: '3px solid #3b82f6',
              }}
            />
          </div>
        </div>

        <div className='flex flex-col items-center space-y-1 my-4'>
          <h3 className='text-lg font-semibold'>{displayName}</h3>
          <Link to={path} className='text-sm text-blue-600 underline break-all'>
            {link}
          </Link>
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

export default ProfileQRCard;
