package com.freetime.allapi.geoweather;

import com.freetime.allapi..user.User;
import com.freetime.allapi..user.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/weather")
public class WeatherController {

    private final WeatherService weatherService;
    private final UserService userService;

    public WeatherController(WeatherService weatherService, UserService userService) {
        this.weatherService = weatherService;
        this.userService = userService;
    }

    @GetMapping("/forecast")
    public Object getForecast(
            @RequestParam Double lat,
            @RequestParam Double lon,
            @AuthenticationPrincipal OAuth2User principal) {
        
        if (principal == null) {
            return Map.of("error", "Please login to see weather data (FREE access).");
        }

        User user = userService.getOrCreateUser(principal);
        String plan = user.getPlan();

        switch (plan) {
            case "PREMIUM":
                // Full data: Current + Hourly + Daily + Air Quality
                return weatherService.getPremiumWeatherData(lat, lon);
            case "FREEMIUM":
                // Mid data: Current + Daily
                return weatherService.getFreemiumWeatherData(lat, lon);
            case "FREE":
            default:
                // Basic data: Current only
                return Map.of(
                    "current", weatherService.getFreeWeatherData(lat, lon),
                    "upsell", "Upgrade to FREEMIUM for 7-day forecast or PREMIUM for air quality and hourly details."
                );
        }
    }
}