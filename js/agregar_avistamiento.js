
class Avistamiento{
    constructor(nombreAve,tipoAve,fecha,region,comuna,imagen){
        this.nombreAve=nombreAve;
        this.tipoAve=tipoAve;
        this.region=region;
        this.fecha=fecha;
        this.comuna=comuna;
        this.imagen=imagen;
    }
}

const validadorAgregar= (event) =>{
    event.preventDefault();
    const validadorNombre = (nombre)=> nombre && nombre.length>3;
    const seEligioOpcion = (opcion) => opcion !=="";
    const subioFoto = (foto) => foto.files.length===0;

    let nombreAve= document.getElementById("nombre-ave");
    let region =document.getElementById("region");
    let comuna = document.getElementById("comuna");
    let tipoAve = document.getElementById("tipo-ave");
    let imagen=document.getElementById("fotoave");
    let isValid = validadorNombre(nombreAve.value) && seEligioOpcion(region.value) && seEligioOpcion(comuna.value)&& seEligioOpcion(tipoAve.value)&& !(subioFoto(imagen));
    let fecha=document.getElementById("fecha-avistamiento");

    let errorNombre=document.getElementById("error-nombre");
    errorNombre.className="error";
    
    let errorRegion =document.getElementById("error-region");
    errorRegion.className="error";

    let errorComuna = document.getElementById("error-comuna");
    errorComuna.className="error";
    
    let errorTipo =document.getElementById("error-tipo");
    errorTipo.className="error";
    let errorFoto=document.getElementById("error-foto");
    errorFoto.className="error";

    if (!isValid){
        if (!validadorNombre(nombreAve.value)){
            errorNombre.className="error visible";
        }
        if (!seEligioOpcion(region.value)){
            errorRegion.className="error visible"
        }
        if (!seEligioOpcion(comuna.value)){
            errorComuna.className="error visible"
        }
        if(!seEligioOpcion(tipoAve.value)){
            errorTipo.className="error visible";
        }
        if (subioFoto(imagen)){
            errorFoto.className="error visible";
        }

        }
    else{
        window.location.href="index.html";
        window.alert("Agregar Exitoso")
    }
}
let boton=document.querySelector("button[type=submit]");
boton.addEventListener("click",validadorAgregar);


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
        for(const comuna in comunas){
            let nuevaComuna=document.createElement("option");
            let text=document.createTextNode(comunas[comuna]);
            nuevaComuna.appendChild(text);
            comunaSelector.appendChild(nuevaComuna);
    };
    })};
cargarRegiones()
