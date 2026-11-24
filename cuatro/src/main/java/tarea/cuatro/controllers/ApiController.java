package tarea.cuatro.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tarea.cuatro.services.ApiService;
import tarea.cuatro.services.ApiService.Resultado;

@RestController
@RequestMapping("/api")
public class ApiController {
    private final ApiService apiService;

    public ApiController(ApiService apiService) {
        this.apiService = apiService;
    }

    @GetMapping("/buscar")
    public List<Resultado> buscar(@RequestParam(defaultValue = "") String q) {
        return apiService.buscar(q);
    }

 
    @PostMapping("/nota")
    public ResponseEntity<Map<String, Object>> nota(@RequestParam String avistamientoId, @RequestParam String nota) {
        int id;
        int valor;
        try {
            id = Integer.parseInt(avistamientoId.trim());
            valor = Integer.parseInt(nota.trim());
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "La nota debe ser un número entero."));
        }
        if (valor < 1 || valor > 7) {
            return ResponseEntity.badRequest().body(Map.of("error", "La nota debe estar entre 1 y 7."));
        }
        Double promedio = apiService.evaluar(id, valor);
        if (promedio == null) {
            return ResponseEntity.status(404).body(Map.of("error", "El avistamiento no existe."));
        }
        return ResponseEntity.ok(Map.of("promedio", promedio));
    }
}
