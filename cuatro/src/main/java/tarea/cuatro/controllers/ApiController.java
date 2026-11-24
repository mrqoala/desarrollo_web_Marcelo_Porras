package tarea.cuatro.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import tarea.cuatro.services.ApiService;

@RestController
public class ApiController {
    private final ApiService apiService;

    public ApiController(ApiService apiService) {
        this.apiService = apiService;
    }

    @GetMapping("/get-avistamientos/{texto}")
    public Map<String, List<Map<String, Object>>> getAvistamientosEndpoint(@PathVariable("texto") String texto) {
        List<Map<String, Object>> avistamientos = apiService.getAvistamientos(texto);
        return Map.of("data", avistamientos); // Encapsula la lista en un mapa con clave "data"
    }
}
