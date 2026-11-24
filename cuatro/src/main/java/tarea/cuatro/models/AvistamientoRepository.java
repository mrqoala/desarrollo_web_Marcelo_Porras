package tarea.cuatro.models;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvistamientoRepository extends JpaRepository<Avistamiento, Integer> {
    @EntityGraph(attributePaths = {"ave", "voluntario"})
    List<Avistamiento> findAllByOrderByFechaHoraDesc();
}
