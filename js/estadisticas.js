let torta_tipos=document.getElementById("torta-tipos");
let torta_avesmasvistas=document.getElementById("torta-masvistas");
let torta_ubicaciones=document.getElementById("torta-ubicaciones");

const layouttipos = {
  height: 400,
  width: 500,
  title:{ text:"Tipos de Aves"}
  };
const datatipos = [{
  values: [40, 20, 40],
  labels: ['Rapaz','Carroñera', 'Loro'],
  type: 'pie'}]


const layoutubi = {
  height: 400,
  width: 600,
  title:{ text:"Ubicaciones Avistamientos"}
  };
const dataubi = [{
  values: [19, 26, 55],
  labels: ['Iquique','Antofagasta', 'Calama'],
  type: 'pie'
}];


const datamasvistas = [{
  values: [10, 37, 21],
  labels: ['Lechuza','Condor', 'Loro Choroy'],
  type: 'pie'}]
const layoutuavesmasvistas = {
  height: 400,
  width: 600,
  title:{ text:" Aves más Avistadas"}
  };

Plotly.newPlot(torta_tipos,datatipos,layouttipos);
Plotly.newPlot(torta_ubicaciones,dataubi,layoutubi);
Plotly.newPlot(torta_avesmasvistas,datamasvistas,layoutuavesmasvistas);

let botontipos=document.getElementById("tipos-aves");
let botonubicaciones=document.getElementById("ubicaciones");
let botonmasvistas=document.getElementById("masvistas");

botontipos.addEventListener("click",(event) =>{
  event.preventDefault()
torta_tipos.className="torta-mostrar";
torta_ubicaciones.className="torta-nomostrar";
torta_avesmasvistas.className="torta-nomostrar";
})
botonubicaciones.addEventListener("click",(event) =>{
  event.preventDefault()
torta_tipos.className="torta-nomostrar";
torta_ubicaciones.className="torta-mostrar";
torta_avesmasvistas.className="torta-nomostrar";
})
botonmasvistas.addEventListener("click",(event) =>{
  event.preventDefault()
torta_tipos.className="torta-nomostrar";
torta_ubicaciones.className="torta-nomostrar";
torta_avesmasvistas.className="torta-mostrar";
Plotly.Plots.resize(torta_avesmasvistas);
})

