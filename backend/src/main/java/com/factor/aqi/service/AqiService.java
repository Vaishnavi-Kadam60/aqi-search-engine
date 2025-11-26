package com.factor.aqi.service; 

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.Map;

@Service
public class AqiService {

    @Value("${aqi.api.token}")
    private String apiToken;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String BASE_URL = "https://api.waqi.info/feed/";

    @Cacheable("aqiCache")
    public Map<String, Object> getAirQuality(String city) {
        // If token is missing, print a warning to console
        if (apiToken == null || apiToken.isEmpty()) {
            System.out.println("ERROR: API Token is missing in application.properties!");
        }

        String url = UriComponentsBuilder.fromHttpUrl(BASE_URL)
                .pathSegment(city) // Securely adds city to URL
                .path("/")
                .queryParam("token", apiToken)
                .toUriString();

        return restTemplate.getForObject(url, Map.class);
    }
}
