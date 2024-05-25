import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './form';
import { Input } from './input';

function WeatherForm(props: {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}) {
  const setLocation = props.setLocation;

  const formSchema = z.object({
    location: z.string().max(50),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLocation(values.location);
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
