const axios = require('axios');

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

const getWeatherData = async (lat, lon) => {
    const url = `${BASE_URL}?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m` +
        `&hourly=temperature_2m,weather_code,precipitation` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max` +
        `&timezone=auto`;
    
    const response = await axios.get(url);
    return response.data;
};

const getFreemiumWeatherData = async (lat, lon) => {
    const url = `${BASE_URL}?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,weather_code` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
        `&timezone=auto`;
    
    const response = await axios.get(url);
    return response.data;
};

const getFreeWeatherData = async (lat, lon) => {
    const url = `${BASE_URL}?latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,weather_code` +
        `&timezone=auto`;
    
    const response = await axios.get(url);
    return response.data;
};

module.exports = {
    getWeatherData,
    getFreemiumWeatherData,
    getFreeWeatherData
};
