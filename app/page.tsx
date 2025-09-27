'use client';
import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import Image from 'next/image'; // Import the Next.js Image component
import { insertData, selectData, deleteData } from './dbrelated';

// Define a more detailed type for weather data
type WeatherRecord = {
  id: number;
  city: string;
  temp: number;
  description: string;
  iconUrl: string;
};

// Custom Alert Component
const CustomAlert: React.FC<{ message: string; onClose: () => void; type?: 'error' | 'success' }> = ({ message, onClose, type = 'error' }) => {
    if (!message) return null;

    const alertClasses = type === 'error'
        ? "bg-red-100 border-red-400 text-red-700 dark:bg-red-900/50 dark:border-red-700 dark:text-red-300"
        : "bg-green-100 border-green-400 text-green-700 dark:bg-green-900/50 dark:border-green-700 dark:text-green-300";

    return (
        <div className={`max-w-xl mx-auto my-4 p-4 rounded-lg shadow-md border-l-4 transition-opacity duration-300 ease-in-out ${alertClasses}`} role="alert">
            <div className="flex items-center justify-between">
                <p className="font-semibold">{message}</p>
                <button
                    onClick={onClose}
                    className="ml-4 text-2xl font-bold p-1 leading-none hover:scale-110 transition-transform"
                    aria-label="Close Alert"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};


const Home = () => {
  const [records, setRecords] = useState<WeatherRecord[]>([]);
  const { isSignedIn, user } = useUser();
  const [city, setCity] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'error' | 'success'>('error');

  const email = isSignedIn ? user.emailAddresses[0].emailAddress : "";

  const showAlert = (message: string, type: 'error' | 'success' = 'error', duration = 4000) => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => {
        setAlertMessage(null);
    }, duration);
  };

  useEffect(() => {
    if (isSignedIn) {
      const fetchData = async () => {
        setIsLoading(true);
        const dbRecords = await selectData(email);
        const validRecords: WeatherRecord[] = [];

        for (const row of dbRecords) {
          const c = row.city;
          const URL = `https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=628472ab5d9e03f68262007eabc246cb&units=metric`;
          try {
            const weatherRes = await fetch(URL);
            if (!weatherRes.ok) {
              console.warn(`Could not fetch weather for "${c}". It might be an invalid city or API issue.`);
              continue;
            }
            const data = await weatherRes.json();
            if (data.main) {
              validRecords.push({
                id: row.id,
                city: data.name,
                temp: data.main.temp,
                description: data.weather[0].description,
                iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
              });
            }
          } catch (err) {
            console.error(`Error processing weather for ${c}:`, err);
            continue;
          }
        }
        setRecords(validRecords);
        setIsLoading(false);
      }
      fetchData();
    }
  }, [email, msg, isSignedIn]);

  const handleAdd = async () => {
    if (city.trim() === "") {
        showAlert("Please enter a city name.");
        return;
    }
    if (records.some(record => record.city.toLowerCase() === city.trim().toLowerCase())) {
        showAlert(`"${city.trim()}" is already in your list.`);
        return;
    }
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=628472ab5d9e03f68262007eabc246cb&units=metric`;
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            showAlert(`Could not find city: "${city.trim()}". Please check the spelling.`);
            return;
        }
        await insertData(email, city.trim());
        showAlert(`"${city.trim()}" added successfully!`, 'success');
        setCity("");
        setMsg(""+Math.random());
    } catch (apiError) {
        showAlert("Network error or failed to validate city. Please try again.");
        console.error("API validation error:", apiError);
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    if (alertMessage) setAlertMessage(null);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  }

  const handleDel = async (id: number, cityName: string) => {
    if (window.confirm(`Are you sure you want to remove "${cityName}"?`)) {
      await deleteData(id);
      showAlert(`"${cityName}" removed successfully.`, 'success');
      setMsg(""+Math.random());
    }
  }
  
  if (!isSignedIn) {
    return (
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to the Weather App</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Please sign in or sign up to continue.</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <CustomAlert message={alertMessage || ""} onClose={() => setAlertMessage(null)} type={alertType} />

      <h2 className="text-4xl font-bold mb-4">Hello, {user?.fullName}!</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Add a city to see the current weather.</p>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={city}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          placeholder="Enter a city name"
          className="p-3 border-2 border-gray-300 rounded-l-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition-colors font-semibold"
        >
          Add City
        </button>
      </div>
      
      {isLoading ? (
        <p className="text-gray-700 dark:text-gray-300">Loading your saved cities...</p>
      ) : (
        <div className="flex flex-wrap justify-center">
          {records.length === 0 && !isLoading ? (
            <p className="text-lg text-gray-600 dark:text-gray-300">Your city list is empty. Add a city above!</p>
          ) : (
            records.map((row) => (

              <div key={row.id} className="box relative group">
                <button
                  onClick={() => handleDel(row.id, row.city)}
                  className="absolute top-3 right-3 bg-red-500 text-white rounded-full h-8 w-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700"
                  aria-label={`Remove ${row.city}`}
                >
                  &times;
                </button>
                <div>
                  <h3 className="text-2xl font-bold capitalize truncate w-full" style={{ color: 'rgb(var(--card-text-primary))' }}>{row.city}</h3>
                  <p className="capitalize" style={{ color: 'rgb(var(--card-text-secondary))' }}>{row.description}</p>
                </div>
                {/* Use Next.js Image Component */}
                <Image 
                  src={row.iconUrl} 
                  alt={row.description} 
                  width={120} 
                  height={120}
                  className="mx-auto -my-4"
                />
                <p className="text-5xl font-light" style={{ color: 'rgb(var(--card-text-primary))' }}>{Math.round(row.temp)}°C</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Home;