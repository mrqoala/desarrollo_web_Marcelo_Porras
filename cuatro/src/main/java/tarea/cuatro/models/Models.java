package tarea.cuatro.models;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;



@Entity
@Table

public class Voluntario {

    @Id
    @SequenceGenerator(
        name="voluntario_sequence"
        sequenceName="voluntario_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "voluntario_sequence"
    )    

    private Int id;

    @NotNull
    private String nombre;

    @NotNull
    private String email;

    @NotNull
    private String telefono;

    @NotNull
    private DateTime fecha_registro;

    @NotNull
    private Int comuna_id;

    @NotNull
    @private String password;   


    public Voluntario(){    
    }

    public Voluntario(String nombre,
                String email,
                String telefono,
                DateTime fecha_registro,
                Int comuna_id
                String password){
        
        this.nombre=nombre;
        this.email=email;
        this.telefono=telefono;
        this.fecha_registro= fecha_registro;
        this.comuna_id= comuna_id;
        this.password=password;
                }

    public Int getId(){
    return id;
    }

    public String nombre(){
        return nombre;
    }

        

}