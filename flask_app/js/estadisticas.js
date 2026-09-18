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

const containergrafico = document.getElementById("container-grafico");

function mostrarGrafico(data, layout) {
  Plotly.newPlot(containergrafico, data, layout);  
}
let botontipos=document.getElementById("tipos-aves");
botontipos.addEventListener("click",(event)=>{
  event.preventDefault();
  mostrarGrafico(datatipos, layouttipos);
})

let botonubicaciones=document.getElementById("ubicaciones");
botonubicaciones.addEventListener("click",(event)=>{
  event.preventDefault();
  mostrarGrafico(dataubi, layoutubi);
});

let botonavesmasvisitadas=document.getElementById("masvistas")
botonavesmasvisitadas.addEventListener("click",(event)=>{
  event.preventDefault();
  mostrarGrafico(datamasvistas, layoutuavesmasvistas);
})
mostrarGrafico(datatipos, layouttipos);