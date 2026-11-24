package tarea.cuatro.services;

import org.springframework.stereotype.Service;

import tarea.cuatro.models.Avistamiento;
import tarea.cuatro.models.AvistamientoRepository;
import tarea.cuatro.models.Nota;
import tarea.cuatro.models.NotaRepository;

@Service
public class AppService {
    private final AvistamientoRepository avistamientoRepository;
    private final NotaRepository notaRepository;

    public AppService(AvistamientoRepository avistamientoRepository, NotaRepository notaRepository) {
        this.avistamientoRepository = avistamientoRepository;
        this.notaRepository = notaRepository;
    }

    public Double handlePostNota(String avistamientoId, String nota) {
        int id;
        int valor;
        try {
            id = Integer.parseInt(avistamientoId.trim());
            valor = Integer.parseInt(nota.trim());
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("La nota debe ser un número entero.");
        }

        if (valor < 1 || valor > 7) {
            throw new IllegalArgumentException("La nota debe estar entre 1 y 7.");
        }

        Avistamiento avistamiento = avistamientoRepository.findById(id).orElse(null);
        if (avistamiento == null) {
            throw new IllegalArgumentException("El avistamiento no existe.");
        }

        notaRepository.save(new Nota(avistamiento, valor));
        return notaRepository.promedio(id);
    }
}
