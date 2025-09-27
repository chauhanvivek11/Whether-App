'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import Image from 'next/image';
import { FiX, FiWind, FiDroplet } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';

type ForecastModalProps = {
    city: string | null;
    isOpen: boolean;
    onClose: () => void;
};

type DailyForecast = {
    date: string;
    day: string;
    temp_max: number;
    temp_min: number;
    icon: string;
    description: string;
    humidity: number;
    wind_speed: number;
};

// A helper function to process the API data
const processForecastData = (data: any): DailyForecast[] => {
    const dailyData: { [key: string]: any[] } = {};

    data.list.forEach((item: any) => {
        const date = item.dt_txt.split(' ')[0];
        if (!dailyData[date]) {
            dailyData[date] = [];
        }
        dailyData[date].push(item);
    });

    return Object.keys(dailyData).slice(0, 5).map(date => {
        const dayEntries = dailyData[date];
        const temps = dayEntries.map(e => e.main.temp);
        const dateObj = new Date(date + 'T12:00:00'); // Use midday to avoid timezone issues

        return {
            date: date,
            day: dateObj.toLocaleDateString('en-US', { weekday: 'long' }),
            temp_max: Math.round(Math.max(...temps)),
            temp_min: Math.round(Math.min(...temps)),
            icon: dayEntries[0].weather[0].icon,
            description: dayEntries[0].weather[0].description,
            humidity: dayEntries[0].main.humidity,
            wind_speed: Math.round(dayEntries[0].wind.speed * 3.6), // convert m/s to km/h
        };
    });
};

const ForecastModal = ({ city, isOpen, onClose }: ForecastModalProps) => {
    const [forecast, setForecast] = useState<DailyForecast[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && city) {
            const fetchForecast = async () => {
                setIsLoading(true);
                setForecast(null);
                const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=628472ab5d9e03f68262007eabc246cb&units=metric`;
                try {
                    const response = await fetch(URL);
                    if (!response.ok) throw new Error('Failed to fetch forecast');
                    const data = await response.json();
                    setForecast(processForecastData(data));
                } catch (error) {
                    console.error("Forecast fetch error:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchForecast();
        }
    }, [isOpen, city]);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/80 p-6 text-left align-middle shadow-xl transition-all border border-slate-300 dark:border-slate-700">
                                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900 dark:text-white flex justify-between items-center">
                                    5-Day Forecast for {city}
                                    <button onClick={onClose} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
                                        <FiX className="h-6 w-6" />
                                    </button>
                                </Dialog.Title>
                                
                                <div className="mt-4">
                                    {isLoading && <div className="flex justify-center items-center h-64"><ImSpinner2 className="h-12 w-12 animate-spin text-blue-500" /></div>}
                                    {forecast && (
                                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                            {forecast.map(day => (
                                                <div key={day.date} className="flex flex-col items-center p-4 bg-black/5 dark:bg-white/5 rounded-xl">
                                                    <p className="font-bold text-lg text-gray-800 dark:text-gray-200">{day.day}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(day.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                                    <Image src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} alt={day.description} width={80} height={80} />
                                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{day.temp_max}°</p>
                                                    <p className="text-lg text-gray-500 dark:text-gray-400">{day.temp_min}°</p>
                                                    <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                                        <div className="flex items-center gap-2"><FiDroplet /><span>{day.humidity}%</span></div>
                                                        <div className="flex items-center gap-2"><FiWind /><span>{day.wind_speed} km/h</span></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ForecastModal;