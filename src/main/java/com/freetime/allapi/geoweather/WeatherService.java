package com.freetime.allapi.geoweather;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class WeatherService {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String BASE_URL = "https://api.open-meteo.com/v1/forecast";

    // PREMIUM: Alles inklusive Luftqualität
    public Object getPremiumWeatherData(Double lat, Double lon) {
        String url = UriComponentsBuilder.fromHttpUrl(BASE_URL)
                .queryParam("latitude", lat)
                .queryParam("longitude", lon)
                .queryParam("current", "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m")
                .queryParam("hourly", "temperature_2m,weather_code,precipitation")
                .queryParam("daily", "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max")
                .queryParam("timezone", "auto")
                .toUriString();
        return restTemplate.getForObject(url, Object.class);
    }

    // FREEMIUM: Aktuelles Wetter + Tägliche Vorhersage
    public Object getFreemiumWeatherData(Double lat, Double lon) {
        String url = UriComponentsBuilder.fromHttpUrl(BASE_URL)
                .queryParam("latitude", lat)
                .queryParam("longitude", lon)
                .queryParam("current", "temperature_2m,weather_code")
                .queryParam("daily", "weather_code,temperature_2m_max,temperature_2m_min")
                .queryParam("timezone", "auto")
                .toUriString();
        return restTemplate.getForObject(url, Object.class);
    }

    // FREE: Nur aktuelles Wetter
    public Object getFreeWeatherData(Double lat, Double lon) {
        String url = UriComponentsBuilder.fromHttpUrl(BASE_URL)
                .queryParam("latitude", lat)
                .queryParam("longitude", lon)
                .queryParam("current", "temperature_2m,weather_code")
                .queryParam("timezone", "auto")
                .toUriString();
        return restTemplate.getForObject(url, Object.class);
    }
}