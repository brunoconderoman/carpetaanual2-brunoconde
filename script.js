const modalCarrusel = document.getElementById("modalCarrusel");
const fondoModal = document.getElementById("fondoModal");
const btnCerrar = document.getElementById("btnCerrar");
const btnAnteriorModal = document.getElementById("btnAnteriorModal");
const btnSiguienteModal = document.getElementById("btnSiguienteModal");
const imgModal = document.getElementById("imgModal");
const contadorModal = document.getElementById("contadorModal");
const contenedorImagenModal = document.getElementById("contenedorImagenModal");
const videoModal = document.getElementById("videoModal");
const imagenesClick = document.querySelectorAll(".imgClick");
const videosClick = document.querySelectorAll(".videoClick");

const btnHeroVideo = document.getElementById("btnHeroVideo");

if (btnHeroVideo) {
  btnHeroVideo.addEventListener("click", function () {
    abrirVideo("img/carpeta-anual2.mp4");
  });
}

let listaImagenesModal = [];
let indiceModal = 0;
let modo = "imagenes";

function abrirModal(lista) {
  modo = "imagenes";
  listaImagenesModal = lista;
  indiceModal = 0;

  imgModal.style.display = "block";
  videoModal.style.display = "none";
  videoModal.pause();
  videoModal.src = "";

  btnAnteriorModal.style.display = "block";
  btnSiguienteModal.style.display = "block";
  contadorModal.style.display = "block";

  modalCarrusel.style.display = "block";
  document.body.style.overflow = "hidden";

  actualizarModal();
}

function abrirVideo(rutaVideo) {
  modo = "video";

  imgModal.style.display = "none";
  videoModal.style.display = "block";
  videoModal.src = rutaVideo;
  videoModal.currentTime = 0;

  btnAnteriorModal.style.display = "none";
  btnSiguienteModal.style.display = "none";
  contadorModal.style.display = "none";

  modalCarrusel.style.display = "block";
  document.body.style.overflow = "hidden";

  videoModal.play().catch(() => {});
}

function cerrarModal() {
  modalCarrusel.style.display = "none";
  document.body.style.overflow = "";

  imgModal.src = "";

  videoModal.pause();
  videoModal.src = "";
  videoModal.style.display = "none";

  modo = "imagenes";
}

function actualizarModal() {
  imgModal.src = listaImagenesModal[indiceModal];
  contadorModal.textContent = (indiceModal + 1) + " / " + listaImagenesModal.length;

  btnAnteriorModal.disabled = indiceModal === 0;
  btnSiguienteModal.disabled = indiceModal === listaImagenesModal.length - 1;

  btnAnteriorModal.style.opacity = btnAnteriorModal.disabled ? "0.35" : "1";
  btnSiguienteModal.style.opacity = btnSiguienteModal.disabled ? "0.35" : "1";
}

function siguiente() {
  if (indiceModal < listaImagenesModal.length - 1) {
    indiceModal++;
    actualizarModal();
  }
}

function anterior() {
  if (indiceModal > 0) {
    indiceModal--;
    actualizarModal();
  }
}

for (let i = 0; i < imagenesClick.length; i++) {
  imagenesClick[i].addEventListener("click", function () {
    const data = this.getAttribute("data-imagenes") || "";
    const lista = data
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    if (lista.length) abrirModal(lista);
  });
}

for (let i = 0; i < videosClick.length; i++) {
  videosClick[i].addEventListener("click", function () {
    const rutaVideo = (this.getAttribute("data-video") || "").trim();
    if (rutaVideo) abrirVideo(rutaVideo);
  });
}

btnSiguienteModal.addEventListener("click", siguiente);
btnAnteriorModal.addEventListener("click", anterior);
btnCerrar.addEventListener("click", cerrarModal);
fondoModal.addEventListener("click", cerrarModal);

document.addEventListener("keydown", function (e) {
  if (modalCarrusel.style.display !== "block") return;

  if (e.key === "Escape") cerrarModal();

  if (modo === "imagenes") {
    if (e.key === "ArrowRight") siguiente();
    if (e.key === "ArrowLeft") anterior();
  }
});

let inicioX = 0;
let finX = 0;

contenedorImagenModal.addEventListener("touchstart", function (e) {
  if (modo !== "imagenes") return;
  inicioX = e.touches[0].clientX;
});

contenedorImagenModal.addEventListener("touchend", function (e) {
  if (modo !== "imagenes") return;
  finX = e.changedTouches[0].clientX;

  const diferencia = finX - inicioX;

  if (diferencia > 50) anterior();
  else if (diferencia < -50) siguiente();
});