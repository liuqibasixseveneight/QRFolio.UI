import { ArrowRight, Sparkles, Share2, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardContent } from '@/components/ui';

const features = [
  {
    title: 'What is LYTN?',
    description:
      'A next-gen resume builder designed for clarity and elegance, sharing your story instantly.',
    icon: Sparkles,
  },
  {
    title: 'Fast & Shareable',
    description:
      'Generate structured resumes with a link or QR in seconds, perfect for modern networking.',
    icon: Share2,
  },
  {
    title: 'Minimal & Powerful',
    description:
      'Zero fluff. A clean, intelligent interface that highlights your achievements seamlessly.',
    icon: Wand2,
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className='flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 px-8 py-20 max-w-7xl mx-auto font-sans'>
        <section className='flex flex-col md:flex-row items-center justify-between w-full max-w-5xl gap-20'>
          <div className='max-w-xl text-center md:text-left space-y-6'>
            <h1 className='text-5xl font-extralight leading-[1.1] tracking-tight'>
              Build Resumes That Shine
            </h1>
            <p className='text-gray-500 text-lg leading-relaxed'>
              LYTN helps you create beautiful, instantly shareable resumes that
              highlight your achievements with clarity and style.
            </p>
            <Button
              size='lg'
              className='mt-6 bg-gray-900 text-white rounded-md px-6 py-3 shadow-md hover:bg-gray-800 transition'
              onClick={() => navigate('/sign-in')}
            >
              Get Started <ArrowRight className='inline w-5 h-5 ml-2' />
            </Button>
          </div>

          <div className='flex-shrink-0 w-full max-w-md h-[520px] bg-gray-100 rounded-3xl border border-gray-200 shadow-md flex items-center justify-center text-gray-400 text-lg font-light select-none'>
            LYTN Preview
          </div>
        </section>

        <section className='mt-32 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12 px-4'>
          {features.map(({ title, description, icon: Icon }, idx) => (
            <Card
              key={idx}
              className='border border-gray-200 rounded-3xl p-10 hover:shadow-lg transition-shadow cursor-default bg-white'
            >
              <CardContent className='flex flex-col items-center text-center space-y-5'>
                <Icon className='w-10 h-10 text-gray-700' />
                <h3 className='text-xl font-light text-gray-900'>{title}</h3>
                <p className='text-gray-500 text-base'>{description}</p>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
    </>
  );
};

export default Landing;
