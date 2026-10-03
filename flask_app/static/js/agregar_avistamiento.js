const validadorAgregar= (event) =>{
    const seEligioOpcion = (opcion) => opcion !=="";
    const fechaFutura = (fecha,hora) => hora !=="" && new Date(fecha+"T"+hora) > new Date();
    const fechaValida = (fecha,hora) => fecha !=="" && !fechaFutura(fecha,hora);
    const cantidadValida = (archivos) => archivos.length>=1 && archivos.length<=5;

    let ave= document.getElementById("ave");
    let fecha= document.getElementById("fecha");
    let hora= document.getElementById("hora");
    let region= document.getElementById("region");
    let comuna= document.getElementById("comuna");
    let archivos= document.getElementById("archivos");
    let isValid = seEligioOpcion(ave.value) && fechaValida(fecha.value,hora.value) && seEligioOpcion(hora.value) && seEligioOpcion(region.value) && seEligioOpcion(comuna.value) && cantidadValida(archivos.files);

    let errorAve=document.getElementById("error-ave");
    errorAve.className="error";

    let errorFecha=document.getElementById("error-fecha");
    errorFecha.className="error";

    let errorHora=document.getElementById("error-hora");
    errorHora.className="error";

    let errorRegion=document.getElementById("error-region");
    errorRegion.className="error";

    let errorComuna=document.getElementById("error-comuna");
    errorComuna.className="error";

    let errorArchivos=document.getElementById("error-archivos");
    errorArchivos.className="error";

    if (!isValid){
        event.preventDefault();
        if (!seEligioOpcion(ave.value)){
            errorAve.className="error visible";
        }
        if (!fechaValida(fecha.value,hora.value)){
            errorFecha.className="error visible";
        }
        if (!seEligioOpcion(hora.value)){
            errorHora.className="error visible";
        }
        if (!seEligioOpcion(region.value)){
            errorRegion.className="error visible";
        }
        if (!seEligioOpcion(comuna.value)){
            errorComuna.className="error visible";
        }
        if (!cantidadValida(archivos.files)){
            errorArchivos.className="error visible";
        }
    }
}
let boton=document.querySelector("button[type=submit]");
boton.addEventListener("click",validadorAgregar);


const selectRegion = document.getElementById("region");
const selectComuna = document.getElementById("comuna");

selectRegion.addEventListener("change", () => {
    const comunasDeLaRegion = COMUNAS.filter(c => c.region_id == selectRegion.value);

    selectComuna.innerHTML = '<option value="">--Seleccione--</option>';
    for (const c of comunasDeLaRegion) {
        selectComuna.innerHTML += `<option value="${c.id}">${c.nombre}</option>`;
    }
});
