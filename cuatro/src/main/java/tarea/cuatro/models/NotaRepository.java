package tarea.cuatro.models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NotaRepository extends JpaRepository<Nota, Integer> {
    @Query("select avg(n.nota) from Nota n where n.avistamiento.id = :id")
    Double promedio(@Param("id") Integer avistamientoId);
}
