import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './form';
import { Input } from './input';
import { useEffect } from 'react';
import { Button } from './button';

function WeatherForm(props: {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setTemperature: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { setLocation, setTemperature } = props;

  const formSchema = z.object({
    location: z.string().max(50),
  });

  const apiKey = import.meta.env.VITE_API_KEY;

  async function getWeather() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Detroit&appid=${apiKey}&units=imperial`
    );
    const data = await response.json();

    const temperature = Math.floor(data.main.temp);

    setTemperature(temperature);
  }

  useEffect(() => {
    getWeather();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${values.location}&appid=${apiKey}&units=imperial`
    );

    if (response.status !== 200) {
      alert('Please try another location!');
      return;
    }

    const data = await response.json();

    const temperature = Math.floor(data.main.temp);

    setLocation(values.location);
    setTemperature(temperature);
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
