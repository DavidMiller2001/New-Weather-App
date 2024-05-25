import { Sun } from 'lucide-react';
import WeatherForm from './WeatherForm';
import { useState } from 'react';

function WeatherDisplay() {
  type Units = 'standard' | 'imperial' | 'metric';
  const [location, setLocation] = useState('Detroit');
  const [temperature, setTemperature] = useState(69);
  const [units, setUnits] = useState<Units>('imperial');
  return (
    <>
      <div className='flex flex-col items-center p-4'>
        <div className='flex w-full justify-center gap-2 items-center'>
          <Sun size={50} />
          <h3 className='text-4xl'>
            {temperature}°{units === 'imperial' ? 'F' : 'C'}
          </h3>
        </div>
        <h1>{location}</h1>
      </div>
      <WeatherForm setLocation={setLocation} setTemperature={setTemperature} />
    </>
  );
}

export default WeatherDisplay;
