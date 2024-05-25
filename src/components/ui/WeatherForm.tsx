import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './form';
import { Input } from './input';
import { useEffect } from 'react';

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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Enter Location' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
}

export default WeatherForm;
