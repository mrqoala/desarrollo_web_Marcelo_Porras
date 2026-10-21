

Highcharts.setOptions({
  colors: ["#1c3a1f", "#5b7f3c", "#a3b26b", "#c9a24a", "#8c5a2b", "#6b8f8a", "#b3ab91", "#3d3d33"],
  chart: {
    backgroundColor: "#fbf9f3",
    borderRadius: 0,
    spacing: [20, 20, 16, 20],
    style: { fontFamily: '"Work Sans", "Helvetica Neue", Arial, sans-serif' },
  },
  title: {
    align: "left",
    style: { fontFamily: '"Lora", Georgia, serif', fontSize: "20px", fontWeight: "700", color: "#1c3a1f" },
  },
  credits: { enabled: false },
  xAxis: {
    lineColor: "#b3ab91",
    tickColor: "#b3ab91",
    labels: { style: { color: "#4a4a3e", fontSize: "12px" } },
    title: { style: { color: "#1c3a1f", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em" } },
  },
  yAxis: {
    gridLineColor: "#e8e3d0",
    gridLineDashStyle: "Dash",
    labels: { style: { color: "#4a4a3e", fontSize: "12px" } },
    title: { style: { color: "#1c3a1f", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em" } },
  },
  tooltip: {
    backgroundColor: "#1c3a1f",
    borderWidth: 0,
    borderRadius: 4,
    shadow: false,
    style: { color: "#f4f0e6", fontSize: "13px" },
  },
  plotOptions: {
    line: {
      lineWidth: 3,
      marker: { radius: 5, lineWidth: 2, lineColor: "#fbf9f3" },
    },
    column: { borderWidth: 0, borderRadius: 3 },
    bar: { borderWidth: 0, borderRadius: 3 },
    pie: {
      borderColor: "#fbf9f3",
      borderWidth: 2,
      dataLabels: { style: { color: "#26261f", fontWeight: "500", textOutline: "none" } },
    },
  },
});


const normalizar =(datos)=>{

  const labels=[]
  const values=[]

  datos.forEach(element => {

    const entradas= Object.values(element)
    const value= entradas.find((v) => typeof v === "number");
    const label =entradas.find((v) => v !== value);
    labels.push(label);
    values.push(value);
  });
  return {labels,values}
}


const crearPie =(contenedor, titulo,labels,values) => {
  const datos= labels.map((label,i)=> ({
    name:label,
    y:values[i],
  }));

  Highcharts.chart(contenedor, {
    chart: { type: "pie" },
    title: { text: titulo },
    tooltip: {
      pointFormat: "<b>{point.y}</b> ({point.percentage:.1f}%)",
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.percentage:.1f}%",
        },
      },
    },
    series: [{ name: titulo, data: datos }],
  });
};

const crearXY = (contenedor, titulo, labels, values, tipo = "column", tituloX = "", tituloY = "") => {
  Highcharts.chart(contenedor, {
    chart: { type: tipo },
    title: { text: titulo },
    xAxis: {
      categories: labels,
      title: { text: tituloX },
    },
    yAxis: {
      min: 0,
      title: { text: tituloY },
      allowDecimals: false,
    },
    legend: { enabled: false },
    tooltip: {
      pointFormat: "<b>{point.y}</b>",
    },
    series: [{ name: titulo, data: values }],
  });
};

// Guarda los datos ya pedidos para no repetir el fetch en cada click
const cache = {};

const createGraphic = (url, dibujar) => {
  if (cache[url]) {
    dibujar(cache[url].labels, cache[url].values);
    return;
  }

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((ajaxResponse) => {
      cache[url] = normalizar(ajaxResponse.data);
      dibujar(cache[url].labels, cache[url].values);
    })
    .catch((error) => {
      console.error("Error con", url, error);
      document.getElementById("container-grafico").textContent = "No se pudieron cargar los datos.";
    });
};



const CONTENEDOR = "container-grafico";

const graficos = {
  dias: () =>
    createGraphic(dias, (labels, values) =>
      crearXY(CONTENEDOR, "Avistamientos por día", labels, values, "line", "Día", "Cantidad")
    ),

  "tipos-aves": () =>
    createGraphic(avesmasvistas, (labels, values) =>
      crearPie(CONTENEDOR, "Avistamientos por tipo de ave", labels, values)
    ),

  voluntarios: () =>
    createGraphic(voluntarioscomunas, (labels, values) =>
      crearXY(CONTENEDOR, "Voluntarios por comuna", labels, values, "column", "Comuna", "Voluntarios")
    ),
};

const marcarActivo = (id) => {
  document.querySelectorAll(".container-botones .boton").forEach((boton) => {
    boton.classList.toggle("activo", boton.id === id);
  });
};

const mostrarGrafico = (id) => {
  marcarActivo(id);
  graficos[id]();
};

Object.keys(graficos).forEach((id) => {
  const boton = document.getElementById(id);
  if (boton) {
    boton.addEventListener("click", () => mostrarGrafico(id));
  }
});

// Gráfico que aparece al cargar la página
mostrarGrafico("dias");
