import { Sun } from 'lucide-react';
import WeatherForm from './WeatherForm';
import { useState } from 'react';

function WeatherDisplay() {
  const [location, setLocation] = useState('Detroit');
  const [temperature, setTemperature] = useState(69);
  return (
    <>
      <div className='flex flex-col items-center p-4'>
        <div className='flex w-full justify-center gap-2 items-center'>
          <Sun size={50} />
          <h3 className='text-4xl'>{temperature}°</h3>
        </div>
        <h1>{location}</h1>
      </div>
      <WeatherForm setLocation={setLocation} />
    </>
  );
}

export default WeatherDisplay;
