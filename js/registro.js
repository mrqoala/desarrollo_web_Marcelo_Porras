
const validadorForm= (event) =>{
    event.preventDefault();
    const validadorNombre = (nombre)=> nombre && nombre.length>3;
    const seEligioOpcion = (opcion) => opcion !=="";
    const numeroVálido =(numero) =>{
        const regexchile= /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/;
        return regexchile.test(numero);
    }
    let nombre= document.getElementById("nombre");
    let region =document.getElementById("region");
    let comuna = document.getElementById("comuna");
    let numero = document.getElementById("telefono");
    let isValid = validadorNombre(nombre.value) && seEligioOpcion(region.value) && seEligioOpcion(comuna.value)&& numeroVálido(numero.value);

    let errorNombre=document.getElementById("error-nombre");
    errorNombre.className="error";
    
    let errorTelefono =document.getElementById("error-telefono");
    errorTelefono.className="error";

    let errorRegion =document.getElementById("error-region");
    errorRegion.className="error";

    let errorComuna = document.getElementById("error-comuna")
    errorComuna.className="error";

    if (!isValid){
        if (!validadorNombre(nombre.value)){
            errorNombre.className="error.visible";
        }
        if (!numeroVálido(numero.value)){
            errorTelefono.className="error.visible"
        }
        if (!seEligioOpcion(region.value)){
            errorRegion.className="error.visible"
        }
        if (!seEligioOpcion(comuna.value)){
            errorComuna.className="error.visible"
        }
    }
    else{
        window.location.href="index.html";
        window.alert("Registro Exitoso")
    }
}
let boton=document.querySelector("button[type=submit]");
boton.addEventListener("click",validadorForm);

async function cargarRegiones() {
  const regiones = await fetch('/regiones.json');
  const datos = await regiones.json();
  const seleccion= document.getElementById("region")
  const nombres= datos.regions.map(r=> r.name);
  
    for(const indice in nombres){
        let nuevaRegion= document.createElement("option");
        nuevaRegion.value=indice;
        let texto=document.createTextNode(nombres[indice])
        nuevaRegion.appendChild(texto);
        seleccion.appendChild(nuevaRegion);
  } 
    let selRegion= document.getElementById("region");
    selRegion.addEventListener("change",() =>{
        const id=selRegion.value;
        const comunaSelector=document.getElementById("comuna");
        while (comunaSelector.firstChild){
            comunaSelector.firstChild.remove();
        }
        const comunas = datos.regions[id].communes.map(r=>r.name);
        for(comuna in comunas){
            let nuevaComuna=document.createElement("option");
            let text=document.createTextNode(comunas[comuna]);
            nuevaComuna.appendChild(text);
            comunaSelector.appendChild(nuevaComuna);
    }
});
};
cargarRegiones();


