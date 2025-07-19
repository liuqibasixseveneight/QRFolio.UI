import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardContent } from '@/components/ui';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <main className='relative flex flex-col items-center justify-center w-full min-h-screen bg-white text-neutral-900 overflow-hidden'>
      <div
        className='absolute inset-0 animate-gradient-move opacity-30'
        style={{
          background:
            'linear-gradient(270deg, #a5b4fc, #c084fc, #f472b6, #a5b4fc)',
        }}
      ></div>

      <div className='relative w-full max-w-5xl text-center space-y-16 p-6'>
        <header className='space-y-8 mt-12'>
          <h1 className='text-5xl md:text-7xl font-semibold tracking-tight'>
            LYTN
          </h1>
          <p className='text-neutral-600 text-lg md:text-2xl max-w-3xl mx-auto'>
            Create stunning, shareable resumes with a clean, focused builder
            that puts your achievements in the best light—fast, elegant, and
            ready to share instantly.
          </p>
          <Button
            size='lg'
            className='flex gap-2 mx-auto bg-black text-white hover:bg-neutral-800 transition'
            onClick={() => navigate('/sign-in')}
          >
            Get Started with LYTN
            <ArrowRight className='w-5 h-5' />
          </Button>
        </header>

        <section className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-16'>
          <Card className='bg-white border border-neutral-200 rounded-2xl hover:shadow-xl transition-shadow'>
            <CardContent className='p-8'>
              <h3 className='text-xl font-semibold mb-4 text-neutral-900'>
                What is LYTN?
              </h3>
              <p className='text-neutral-600 text-base'>
                LYTN helps you create a modern, curated resume effortlessly with
                a design that feels as premium as your work deserves.
              </p>
            </CardContent>
          </Card>
          <Card className='bg-white border border-neutral-200 rounded-2xl hover:shadow-xl transition-shadow'>
            <CardContent className='p-8'>
              <h3 className='text-xl font-semibold mb-4 text-neutral-900'>
                Fast & Shareable
              </h3>
              <p className='text-neutral-600 text-base'>
                Generate a structured resume ready to share via link or QR
                instantly—perfect for interviews, networking, or personal
                branding.
              </p>
            </CardContent>
          </Card>
          <Card className='bg-white border border-neutral-200 rounded-2xl hover:shadow-xl transition-shadow'>
            <CardContent className='p-8'>
              <h3 className='text-xl font-semibold mb-4 text-neutral-900'>
                Minimal & Powerful
              </h3>
              <p className='text-neutral-600 text-base'>
                LYTN’s minimalist design puts your story in focus, ensuring your
                resume looks beautiful and professional without extra effort.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default Landing;
