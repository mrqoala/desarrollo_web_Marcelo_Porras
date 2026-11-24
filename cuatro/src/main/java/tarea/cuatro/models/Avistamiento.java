package tarea.cuatro.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "avistamiento")
public class Avistamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voluntario_id")
    private Voluntario voluntario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ave_id")
    private Ave ave;

    @Column(name = "fecha_hora")
    private LocalDateTime fechaHora;

    private String lugar;

    public Avistamiento() {
    }

    public Avistamiento(Voluntario voluntario,
                        Ave ave,
                        LocalDateTime fechaHora,
                        String lugar) {
        this.voluntario = voluntario;
        this.ave = ave;
        this.fechaHora = fechaHora;
        this.lugar = lugar;
    }

    public Integer getId() {
        return id;
    }

    public Voluntario getVoluntario() {
        return voluntario;
    }

    public Ave getAve() {
        return ave;
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public String getLugar() {
        return lugar;
    }
}
