let inputSearch = document.getElementById("search-input");
let searchMessage = document.getElementById("search-message");
let searchList = document.getElementById("search-list");

let timer = null;
let lastSearch = 0;

// Escapa el texto para insertarlo de forma segura en el HTML.
let escapeHtml = (text) => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};

// Escapa el texto y envuelve en <mark> lo que calza con lo buscado.
let highlight = (text, search) => {
  let lowerText = text.toLowerCase();
  let lowerSearch = search.trim().toLowerCase();
  let html = "";
  let from = 0;
  let index = lowerText.indexOf(lowerSearch, from);

  while (lowerSearch !== "" && index !== -1) {
    html += escapeHtml(text.slice(from, index));
    html += "<mark>" + escapeHtml(text.slice(index, index + lowerSearch.length)) + "</mark>";
    from = index + lowerSearch.length;
    index = lowerText.indexOf(lowerSearch, from);
  }
  return html + escapeHtml(text.slice(from));
};

let formatNota = (nota) => {
  return nota === null ? "-" : nota.toFixed(1);
};

let populateMatchList = (matchList, search) => {
  // delete previous childs
  while (searchList.firstChild) {
    searchList.removeChild(searchList.firstChild);
  }

  // if there are no matches, show a message
  if (matchList.length === 0) {
    searchMessage.innerText = "No se encontraron avistamientos.";
    return;
  }
  searchMessage.innerText = "";

  for (let av of matchList) {
    let item = document.createElement("li");
    item.dataset.id = av.id;
    item.innerHTML =
      "Voluntario: " + highlight(av.voluntario, search) +
      " | Día: " + escapeHtml(av.dia) +
      " | Ave: " + highlight(av.ave, search) +
      " | Comuna: " + highlight(av.comuna, search) +
      ' | Nota: <span class="nota">' + formatNota(av.nota) + "</span>" +
      '<button type="button" class="evaluar">evaluar</button>' +
      '<span class="selector"></span>';
    searchList.append(item);
  }
};

let fetchAJAX = (url, search) => {
  let currentSearch = ++lastSearch;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((ajaxResponse) => {
      // ignora respuestas de búsquedas anteriores
      if (currentSearch === lastSearch) {
        populateMatchList(ajaxResponse["data"], search);
      }
    })
    .catch((error) => {
      console.error("There has been a problem with your fetch operation:", error);
      searchMessage.innerText = "Error al buscar.";
    });
};

let handleSearch = (event) => {
  let search = event.target.value;
  clearTimeout(timer);

  if (search.trim() === "") {
    lastSearch++;
    searchMessage.innerText = "";
    while (searchList.firstChild) {
      searchList.removeChild(searchList.firstChild);
    }
    return;
  }
  timer = setTimeout(() => {
    fetchAJAX(`${window.origin}/get-avistamientos/${encodeURIComponent(search.trim())}`, search);
  }, 250);
};

// POST de la nota; si resulta bien actualiza el promedio mostrado.
let postNota = (item, select) => {
  let body = new URLSearchParams({
    "avistamiento-id": item.dataset.id,
    nota: select.value,
  });

  fetch(`${window.origin}/post-nota`, { method: "POST", body: body })
    .then((response) => {
      return response.json().then((data) => ({ ok: response.ok, data: data }));
    })
    .then((result) => {
      if (!result.ok) {
        alert(result.data.error);
        return;
      }
      item.querySelector(".nota").innerText = formatNota(result.data.promedio);
      item.querySelector(".selector").innerHTML = "";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al guardar la nota.");
    });
};

// Clic en "evaluar": muestra un select del 1 al 7 y al elegir envía la nota.
let handleEvaluar = (event) => {
  if (!event.target.classList.contains("evaluar")) {
    return;
  }
  let item = event.target.closest("li");
  let zone = item.querySelector(".selector");
  if (zone.firstChild) {
    return;
  }

  let select = document.createElement("select");
  select.innerHTML = '<option value="">Nota...</option>';
  for (let n = 1; n <= 7; n++) {
    select.innerHTML += `<option value="${n}">${n}</option>`;
  }
  select.addEventListener("change", () => {
    if (select.value !== "") {
      postNota(item, select);
    }
  });
  zone.append(select);
};

inputSearch.addEventListener("input", handleSearch);
searchList.addEventListener("click", handleEvaluar);
