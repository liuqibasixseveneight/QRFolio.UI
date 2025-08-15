const LytnIconV1 = () => (
  <svg
    width='100%'
    height='100%'
    viewBox='20 25 80 75'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    role='img'
    aria-label='LYTN logo'
  >
    <defs>
      <linearGradient id='highlightGradient' x1='0' y1='0' x2='1' y2='1'>
        {/* indigo-600 */}
        <stop offset='0%' stopColor='#4f46e5' stopOpacity='1' />
        {/* indigo-500 */}
        <stop offset='50%' stopColor='#6366f1' stopOpacity='0.8' />
        {/* purple-500 */}
        <stop offset='100%' stopColor='#a855f7' stopOpacity='0.6' />
      </linearGradient>
    </defs>

    <path
      d='M30 85 L60 35 L90 85'
      stroke='url(#highlightGradient)'
      strokeWidth='12'
      strokeLinejoin='round'
    />
    <circle cx='60' cy='80' r='10' fill='url(#highlightGradient)' />
  </svg>
);

export default LytnIconV1;
