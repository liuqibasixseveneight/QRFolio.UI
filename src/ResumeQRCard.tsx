import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './components/ui/molecules/Card/Card';
import { Button } from './components/ui';

type ResumeQRCardProps = {
  link: string;
  labels: {
    displayName: string;
  };
};

export const ResumeQRCard = ({ link, labels }: ResumeQRCardProps) => {
  const { displayName } = labels;

  // Extract the path part of the URL
  // e.g. from "http://localhost:3000/profile/uuid" get "/profile/uuid"
  const url = new URL(link);
  const path = url.pathname;

  return (
    <Card className='w-full max-w-sm p-6 text-center'>
      <CardHeader>
        <CardTitle className='text-xl font-bold'>Your QRFolio</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center gap-2'>
        {/* NO STYLES */}
        {/* <QRCodeSVG
          value={link}
          size={200}
          bgColor='#ffffff'
          fgColor='#000000'
          level='H'
        /> */}

        {/* COLORED WITH IMAGE */}
        <div
          style={{
            position: 'relative',
            width: 248, // 200 QR + 2 * 24 padding (12 for border + 12 for white spacing)
            height: 248,
            borderRadius: 28, // slightly larger radius for outer border
            padding: 12, // gradient border thickness
            background: 'linear-gradient(135deg, #4f46e5, #3b82f6)',
            boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
            display: 'inline-block',
          }}
        >
          <div
            style={{
              width: 224, // 200 QR + 2 * 12 white spacing
              height: 224,
              borderRadius: 20, // rounded white spacing layer
              backgroundColor: 'white', // white spacing between border and QR
              padding: 12, // spacing between white layer and QR code
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
