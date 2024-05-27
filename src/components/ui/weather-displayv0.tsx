/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/UWIqe3o2j8L
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/

import { useState } from 'react';
import WeatherForm from './WeatherForm';
import { CloudRain, Cloudy, Haze, SunMedium } from 'lucide-react';
import { capitalize } from '@/utils/stringStuff';

export function WeatherDisplayv0() {
  // type Units = 'standard' | 'imperial' | 'metric';
  // const [units, setUnits] = useState<Units>('imperial');
  const [location, setLocation] = useState('Detroit');
  const [temperature, setTemperature] = useState(69);
  const [conditionStr, setConditionStr] = useState('');

  function formatLocationStr(location: string): string {
    let formattedString = '';

    if (location.includes(',')) {
      const strSegments = location.split(',');
      formattedString =
        capitalize(strSegments[0]) + ', ' + strSegments[1].toUpperCase();
    }

    return formattedString;
  }

  return (
    <div
      key='1'
      className='flex items-center justify-center h-screen w-screen bg-gradient-to-br from-sky-400 to-indigo-500'
    >
      <div className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full flex flex-col gap-6'>
        <div className='mb-4'>
          <h2 className='text-5xl font-bold text-center text-gray-900 dark:text-gray-100'>
            {formatLocationStr(location)}
          </h2>
        </div>
        <div className='flex flex-col items-center justify-center gap-6'>
          <div className='flex items-center gap-4'>
            {/* <img src={`https://openweathermap.org/img/wn/${iconUrl}@2x.png`} /> */}
            <WeatherIcon condition={conditionStr} />
            <div>
              <div className='text-8xl font-bold text-gray-900 dark:text-gray-100'>
                {temperature}°
              </div>
              <div className='pl-1 text-gray-600 dark:text-gray-400 text-xl'>
                {conditionStr}
              </div>
            </div>
          </div>
        </div>
        <div className='mt-6'>
          <WeatherForm
            setLocation={setLocation}
            setTemperature={setTemperature}
            setConditionStr={setConditionStr}
          />
        </div>
      </div>
    </div>
  );
}

function WeatherIcon(props: { condition: string }) {
  const ICON_SIZE = 125;
  const { condition } = props;

  const iconProps = {
    size: ICON_SIZE,
  };

  switch (condition.toLowerCase()) {
    case 'clear':
      return <SunMedium {...iconProps} />;
    case 'rain':
      return <CloudRain {...iconProps} />;
    case 'clouds':
      return <Cloudy {...iconProps} />;
    case 'haze':
      return <Haze {...iconProps} />;
    default:
      return <div className='text-3xl'>N/A</div>;
  }
}
