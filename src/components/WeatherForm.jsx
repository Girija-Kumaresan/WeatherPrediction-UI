import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';

function WeatherForm() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/weather?city=${city}`);
            console.log("Response status:", response.status);
            if (response.ok) {
                const data = await response.text();
                console.log("Data------",data);
                setWeatherData(data);
            } else {
                console.error('API request failed:', response.status);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <Paper elevation={3}>
            <Typography variant="h4">Weather Prediction</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Enter City"
                    variant="outlined"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">
                    Get Weather
                </Button>
            </form>
            {weatherData && (
                <div>
                    <Typography variant="h5">Weather Data for {weatherData.city}</Typography>
                    
                       
                            <p>Date: {weatherData.date}</p>
                            <p>Temperature: {weatherData.temperature}°C</p>
                            <p>Rain Prediction: {weatherData.rainPrediction ? 'Carry umbrella' : 'No rain expected'}</p>
                            <p>Wind Speed: {weatherData.windSpeed} mph</p>
                            <p>Thunderstorm: {weatherData.thunderstorm ? 'Don’t step out! A Storm is brewing!' : 'No thunderstorm expected'}</p>
                        
                  
                </div>
            )}
        </Paper>
    );
}

export default WeatherForm;