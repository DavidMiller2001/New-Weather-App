import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './form';
import { Input } from './input';
import { useEffect } from 'react';
import { Button } from './button';

const STATES = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'VI',
  'WA',
  'WV',
  'WI',
  'WY',
] as const;

type STATE = (typeof STATES)[number];

function WeatherForm(props: {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setTemperature: React.Dispatch<React.SetStateAction<number>>;
  setConditionStr: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { setLocation, setTemperature, setConditionStr } = props;

  const formSchema = z.object({
    location: z.string().max(50),
  });

  const apiKey = import.meta.env.VITE_API_KEY;

  async function getWeather(location: string) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`
    );

    if (response.status !== 200) {
      alert('Please try another location!');
      return;
    }

    const data = await response.json();

    console.log(data);

    const temperature = Math.floor(data.main.temp);
    const condition = data.weather[0].main;

    setLocation(location);
    setTemperature(temperature);
    setConditionStr(condition);
  }

  useEffect(() => {
    getWeather('Detroit');
  }, []);

  // Capitalizes the first letter of each word in a string
  function capitalize(str: string): string {
    str = str
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ');
    return str;
  }

  function formatLocationStr(location: string): string {
    const segments = location.split(',');
    const city = capitalize(segments[0]);

    if (segments.length < 2) {
      return city;
    }

    const state = segments[1].replace(' ', '').toUpperCase();

    if (STATES.includes(state as STATE)) {
      return `${city},${state},us`;
    }

    return `${city},${state}`;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedLocation = formatLocationStr(values.location);
    console.log('Location: ', formattedLocation);
    getWeather(formattedLocation);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: 'Detroit',
    },
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex items-center gap-2'
        >
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className='grow-1 flex-1 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400'
                    placeholder='Enter a city'
                    type='text'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className='rounded-md bg-sky-500 dark:bg-sky-400 px-4 py-2 text-white hover:bg-sky-600 dark:hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400'
            type='submit'
          >
            Search
          </Button>
        </form>
      </Form>
    </>
  );
}

export default WeatherForm;
