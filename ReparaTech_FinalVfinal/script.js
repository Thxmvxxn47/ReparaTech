
document.addEventListener("DOMContentLoaded", function () {
  setupContactForm();
  setupLoginForm();
  setupSeguimientoForm();
});

function mostrarError(inputId, mensaje) {
  const input = document.getElementById(inputId);
  const error = document.getElementById("error-" + inputId);
  if (input) input.classList.add("input-invalido");
  if (error) error.textContent = mensaje;
}

function limpiarError(inputId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById("error-" + inputId);
  if (input) input.classList.remove("input-invalido");
  if (error) error.textContent = "";
}

function esEmailValido(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

function mostrarMensaje(msgId, texto, tipo) {
  const msg = document.getElementById(msgId);
  if (!msg) return;
  msg.textContent = texto;
  msg.classList.remove("ok", "error");
  msg.classList.add(tipo);
}

function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const campos = ["nombre", "email", "dispositivo", "servicio"];

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    campos.forEach(limpiarError);
    let valido = true;
    let primerCampoInvalido = null;

    const nombre = document.getElementById("nombre").value.trim();
    if (nombre.length < 2) {
      mostrarError("nombre", "Ingresa tu nombre completo.");
      valido = false;
      primerCampoInvalido = primerCampoInvalido || "nombre";
    }

    const email = document.getElementById("email").value.trim();
    if (!esEmailValido(email)) {
      mostrarError("email", "Ingresa un correo válido, por ejemplo nombre@correo.com.");
      valido = false;
      primerCampoInvalido = primerCampoInvalido || "email";
    }

    const dispositivo = document.getElementById("dispositivo").value.trim();
    if (dispositivo.length < 2) {
      mostrarError("dispositivo", "Indica la marca y el modelo de tu dispositivo.");
      valido = false;
      primerCampoInvalido = primerCampoInvalido || "dispositivo";
    }

    const servicio = document.getElementById("servicio").value;
    if (servicio === "") {
      mostrarError("servicio", "Selecciona el servicio que necesitas.");
      valido = false;
      primerCampoInvalido = primerCampoInvalido || "servicio";
    }

    if (!valido) {
      mostrarMensaje("formMsg", "Revisa los campos marcados en rojo.", "error");
      document.getElementById(primerCampoInvalido).focus();
      return;
    }

    mostrarMensaje(
      "formMsg",
      "¡Listo! Tu orden de trabajo fue registrada. Te contactaremos a " + email + ".",
      "ok"
    );
    form.reset();
  });
}

function setupLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    limpiarError("usuario");
    limpiarError("clave");
    let valido = true;

    const usuario = document.getElementById("usuario").value.trim();
    if (usuario === "") {
      mostrarError("usuario", "Ingresa tu usuario.");
      valido = false;
    }

    const clave = document.getElementById("clave").value;
    if (clave.length < 4) {
      mostrarError("clave", "La contraseña debe tener al menos 4 caracteres.");
      valido = false;
    }

    if (!valido) {
      mostrarMensaje("loginMsg", "Revisa los campos marcados en rojo.", "error");
      return;
    }

    const rolSeleccionado = document.querySelector('input[name="rol"]:checked');
    mostrarMensaje("loginMsg", "Ingresando…", "ok");
    setTimeout(function () {
      window.location.href = rolSeleccionado.value;
    }, 400);
  });
}

function setupSeguimientoForm() {
  const form = document.getElementById("seguimientoForm");
  if (!form) return;

  const patronOrden = /^OT-\d{4}-\d{4}$/;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    limpiarError("orden");
    const orden = document.getElementById("orden").value.trim().toUpperCase();

    if (orden === "") {
      mostrarError("orden", "Ingresa el número de tu orden de trabajo.");
      mostrarMensaje("seguimientoMsg", "Falta el número de orden.", "error");
      document.getElementById("orden").focus();
      return;
    }

    if (!patronOrden.test(orden)) {
      mostrarError("orden", "El formato debe ser OT-AAAA-NNNN, por ejemplo OT-2026-0341.");
      mostrarMensaje("seguimientoMsg", "Revisa el formato del número de orden.", "error");
      document.getElementById("orden").focus();
      return;
    }
    mostrarMensaje("seguimientoMsg", "Mostrando resultados para " + orden + ".", "ok");
  });
}
