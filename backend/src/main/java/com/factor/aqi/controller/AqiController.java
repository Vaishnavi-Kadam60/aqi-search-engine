package com.factor.aqi.controller;

import com.factor.aqi.service.AqiService; // IMPORT ADDED: Allows Controller to see Service
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/aqi")
@CrossOrigin(origins = "*") 
public class AqiController {

    @Autowired
    private AqiService aqiService;

    @GetMapping
    public Map<String, Object> searchCity(@RequestParam String city) {
        return aqiService.getAirQuality(city);
    }
}