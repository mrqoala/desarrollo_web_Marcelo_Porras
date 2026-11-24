package tarea.cuatro.services;

import java.util.List;
import java.util.Locale;

import org.springframework.stereotype.Service;

import tarea.cuatro.models.Avistamiento;
import tarea.cuatro.models.AvistamientoRepository;
import tarea.cuatro.models.Nota;
import tarea.cuatro.models.NotaRepository;

@Service
public class ApiService {

    public record Resultado(Integer id, String voluntario, String dia, String ave, String comuna, Double nota) {}

    private final AvistamientoRepository avistamientos;
    private final NotaRepository notas;

    public ApiService(AvistamientoRepository avistamientos, NotaRepository notas) {
        this.avistamientos = avistamientos;
        this.notas = notas;
    }

   
    private static String comuna(String lugar) {
        int i = lugar.indexOf(',');
        return (i < 0 ? lugar : lugar.substring(0, i)).trim();
    }

    public List<Resultado> buscar(String q) {
        String texto = q.trim().toLowerCase(Locale.ROOT);
        if (texto.isEmpty()) {
            return List.of();
        }
        return avistamientos.findAllByOrderByFechaHoraDesc().stream()
            .filter(a -> a.getAve().getNombre().toLowerCase(Locale.ROOT).contains(texto)
                      || a.getVoluntario().getNombre().toLowerCase(Locale.ROOT).contains(texto)
                      || comuna(a.getLugar()).toLowerCase(Locale.ROOT).contains(texto))
            .map(a -> new Resultado(a.getId(), a.getVoluntario().getNombre(),
                a.getFechaHora().toLocalDate().toString(), a.getAve().getNombre(),
                comuna(a.getLugar()), notas.promedio(a.getId())))
            .toList();
    }

    /** Guarda la nota y devuelve el nuevo promedio; null si el avistamiento no existe. */
    public Double evaluar(Integer avistamientoId, int nota) {
        Avistamiento a = avistamientos.findById(avistamientoId).orElse(null);
        if (a == null) {
            return null;
        }
        notas.save(new Nota(a, nota));
        return notas.promedio(avistamientoId);
    }
}
