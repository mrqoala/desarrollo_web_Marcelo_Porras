
const validadorForm= (event) =>{
    const validadorNombre = (nombre)=> nombre && nombre.length>3;
    const seEligioOpcion = (opcion) => opcion !=="";
    const numeroVálido =(numero) =>{
        const regexchile= /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/;
        return regexchile.test(numero);
    }
    const emailValido=(email) =>{
        const patron = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
        return patron.test(email)
    }
    let nombre= document.getElementById("nombre");
    let region =document.getElementById("region");
    let comuna = document.getElementById("comuna");
    let numero = document.getElementById("telefono");
    let email= document.getElementById("correo")
    let isValid = validadorNombre(nombre.value) && seEligioOpcion(region.value) && seEligioOpcion(comuna.value)&& numeroVálido(numero.value) && emailValido(email.value);

    let errorNombre=document.getElementById("error-nombre");
    errorNombre.className="error";
    
    let errorTelefono =document.getElementById("error-telefono");
    errorTelefono.className="error";

    let errorRegion =document.getElementById("error-region");
    errorRegion.className="error";

    let errorComuna = document.getElementById("error-comuna")
    errorComuna.className="error";

    let errorCorreo=document.getElementById("error-correo")
    errorCorreo.className="error";
    
    if (!isValid){
        event.preventDefault();
        if (!validadorNombre(nombre.value)){
            errorNombre.className="error visible";
        }
        if (!numeroVálido(numero.value)){
            errorTelefono.className="error visible"
        }
        if (!seEligioOpcion(region.value)){
            errorRegion.className="error visible"
        }
        if (!seEligioOpcion(comuna.value)){
            errorComuna.className="error visible"
        }
        if(!emailValido(email.value)){
            errorCorreo.className="error visible"
        }
    }
}
let boton=document.querySelector("button[type=submit]");
boton.addEventListener("click",validadorForm);


const selectRegion = document.getElementById("region");
const selectComuna = document.getElementById("comuna");

selectRegion.addEventListener("change", () => {
    const comunasDeLaRegion = COMUNAS.filter(c => c.region_id == selectRegion.value);

    selectComuna.innerHTML = '<option value="">Seleccione</option>';
    for (const c of comunasDeLaRegion) {
        selectComuna.innerHTML += `<option value="${c.id}">${c.nombre}</option>`;
    }
});

