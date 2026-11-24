package tarea.cuatro.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import tarea.cuatro.models.Avistamiento;
import tarea.cuatro.models.AvistamientoRepository;
import tarea.cuatro.models.NotaRepository;

@Service
public class ApiService {
    private final AvistamientoRepository avistamientoRepository;
    private final NotaRepository notaRepository;

    public ApiService(AvistamientoRepository avistamientoRepository, NotaRepository notaRepository) {
        this.avistamientoRepository = avistamientoRepository;
        this.notaRepository = notaRepository;
    }

    // "lugar" se guarda como "Comuna, Región": la comuna es lo que va antes de la coma.
    private String getComuna(String lugar) {
        int coma = lugar.indexOf(',');
        if (coma < 0) {
            return lugar.trim();
        }
        return lugar.substring(0, coma).trim();
    }

    public List<Map<String, Object>> getAvistamientos(String texto) {
        String buscado = texto.trim().toLowerCase();
        List<Map<String, Object>> matchAvistamientos = new ArrayList<>();
        if (buscado.isEmpty()) {
            return matchAvistamientos;
        }

        List<Avistamiento> avistamientos = avistamientoRepository.findAllByOrderByFechaHoraDesc();
        for (Avistamiento av : avistamientos) {
            String ave = av.getAve().getNombre();
            String voluntario = av.getVoluntario().getNombre();
            String comuna = getComuna(av.getLugar());

            if (ave.toLowerCase().contains(buscado)
                    || voluntario.toLowerCase().contains(buscado)
                    || comuna.toLowerCase().contains(buscado)) {
                Map<String, Object> data = new HashMap<>();
                data.put("id", av.getId());
                data.put("voluntario", voluntario);
                data.put("dia", av.getFechaHora().toLocalDate().toString());
                data.put("ave", ave);
                data.put("comuna", comuna);
                data.put("nota", notaRepository.promedio(av.getId()));
                matchAvistamientos.add(data);
            }
        }
        return matchAvistamientos;
    }
}
