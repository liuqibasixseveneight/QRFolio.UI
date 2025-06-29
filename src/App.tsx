import { ResumeQRCard } from './POC';

const App = () => {
  return (
    <>
      <main className='flex min-h-screen items-center justify-center p-4'>
        <ResumeQRCard
          link='https://www.twitch.tv/rzji_'
          labels={{ displayName: 'Riz Layton' }}
        />
      </main>
    </>
  );
};

export default App;
