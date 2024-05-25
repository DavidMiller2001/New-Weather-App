import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import './globals.css';
import WeatherDisplay from './components/ui/WeatherDisplay';
function App() {
  return (
    <>
      <main className='flex h-screen w-screen justify-center items-center bg-slate-400'>
        <Card>
          <CardHeader>
            <CardTitle>New Weather App</CardTitle>
            <CardDescription>
              a simple little practice react app made with vite and the
              openweathermap api!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WeatherDisplay />
          </CardContent>
          <CardFooter>
            <CardDescription>David Miller 2024</CardDescription>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}

export default App;
