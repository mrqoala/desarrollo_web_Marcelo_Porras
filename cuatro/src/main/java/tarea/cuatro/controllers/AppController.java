package tarea.cuatro.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import tarea.cuatro.services.AppService;

@Controller
public class AppController {
    private final AppService appService;

    public AppController(AppService appService) {
        this.appService = appService;
    }

    @GetMapping("/")
    public String indexRoute() {
        return "index";
    }

    @PostMapping("/post-nota")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> postNotaRoute(
        @RequestParam("avistamiento-id") String avistamientoId,
        @RequestParam("nota") String nota) {

        try {
            Double promedio = appService.handlePostNota(avistamientoId, nota);
            return ResponseEntity.ok(Map.of("promedio", promedio));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
