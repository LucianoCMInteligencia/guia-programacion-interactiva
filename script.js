// ✅ Función para copiar código al portapapeles
function copyCode(button) {
  // 1. Buscamos el elemento de código que siempre está JUSTO antes del botón.
  //    Puede ser un <pre> o un <div class="terminal-command">
  const codeContainer = button.previousElementSibling;
  
  // 2. Si el contenedor existe, obtenemos su texto y limpiamos espacios.
  const code = codeContainer ? codeContainer.textContent.trim() : '';

  if (code) {
    // 3. Usamos la API del portapapeles.
    navigator.clipboard.writeText(code).then(() => {
      // 4. Cambiamos el texto del botón por 2 segundos.
      const originalText = button.textContent;
      button.textContent = "¡Copiado! ✅";
      setTimeout(() => button.textContent = originalText, 2000);
    }).catch(err => {
      console.error('Error al copiar el texto: ', err);
      alert('Error al copiar el texto.');
    });
  } else {
    console.error("No se encontró el contenedor de código.");
  }
}

// ✅ Función para validar comando Linux
function checkLinuxCommand() {
  const input = document.getElementById("linuxInput").value.trim().toLowerCase();
  const feedback = document.getElementById("linuxFeedback");
  if (input === "sudo apt install firefox") {
    feedback.textContent = "✅ ¡Correcto! El comando instala el paquete.";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "❌ Intenta de nuevo. Recuerda la sintaxis: sudo apt install [paquete].";
    feedback.style.color = "red";
  }
}

// ✅ Funciones para ejercicios DAM y DAW
function checkDamQuiz() {
  const value = document.getElementById("damQuiz").value;
  const feedback = document.getElementById("damFeedback");
  if (value === "Java") {
    feedback.textContent = "✅ ¡Correcto! Java se usa ampliamente en DAM y desarrollo Android.";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "❌ Intenta de nuevo. Uno de esos es un lenguaje clave en DAM.";
    feedback.style.color = "red";
  }
}

function checkDawQuiz() {
  const value = document.getElementById("dawQuiz").value;
  const feedback = document.getElementById("dawFeedback");
  if (value === "JavaScript") {
    feedback.textContent = "✅ ¡Correcto! JavaScript es esencial en el Front-End web.";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "❌ Intenta de nuevo. Uno de esos lenguajes es el núcleo de la interactividad web.";
    feedback.style.color = "red";
  }
}

// =============================================================
// ✅ Contenido dinámico por sección (CLAVES SINCRONIZADAS CON EL HTML)
// =============================================================
const sections = {
  // HOME - Coincide con #home
  home: `
    <section id="home">
      <h2>👋 Bienvenido a Mi Guía Interactiva</h2>
      <p>Esta guía te acompañará paso a paso en tu formación como programador, Luciano Francisco Amaya Gutiérrez. Navega por el menú superior para explorar los temas clave de los ciclos DAM y DAW, desde los fundamentos hasta el control de versiones y el despliegue profesional.</p>
      <p>¡Comencemos!</p>
    </section>
  `,

  // DAM vs DAW - Coincide con #que-es-dam-daw
  "que-es-dam-daw": `
    <section id="que-es-dam-daw">
      <h2>🎓 DAM vs DAW: Elige tu camino</h2>
      <p>DAM (Desarrollo de Aplicaciones Multiplataforma) y DAW (Desarrollo de Aplicaciones Web) son especialidades con un enfoque distinto:</p>
      
      <h3>🎯 Enfoque Principal</h3>
      <table>
        <thead>
          <tr>
            <th>Ciclo</th>
            <th>Entorno Principal</th>
            <th>Ejecución</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>**DAM**</td>
            <td>Multiplataforma (Escritorio/Móvil)</td>
            <td>Se instala y ejecuta directamente en el sistema operativo del dispositivo (móvil o escritorio).</td>
          </tr>
          <tr>
            <td>**DAW**</td>
            <td>Web</td>
            <td>Se ejecuta en un navegador de internet (Front-End) o en un servidor (Back-End).</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,

  // DAW - Coincide con #daw
  daw: `
    <section id="daw">
      <h2>🌐 Desarrollo de Aplicaciones Web (DAW)</h2>
      <p>Especialidad centrada en el diseño, desarrollo y mantenimiento de sitios web y aplicaciones que se ejecutan en navegadores y servidores.</p>

      <h3>📚 Tecnologías Esenciales</h3>
      <ul>
        <li>**HTML5:** Estructura de la web.</li>
        <li>**CSS3:** Diseño, estilo y apariencia visual.</li>
        <li>**JavaScript:** Interactividad y lógica del lado del cliente.</li>
      </ul>

      <h3>🧪 Ejercicio Interactivo</h3>
      <p>¿Cuál de estos lenguajes se usa para añadir interactividad en el Front-End?</p>
      <select id="dawQuiz">
        <option value="">Selecciona una opción</option>
        <option value="PHP">PHP</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Python">Python</option>
      </select>
      <button onclick="checkDawQuiz()">Comprobar</button>
      <p id="dawFeedback"></p>
    </section>
  `,

  // DAM - Coincide con #dam
  dam: `
    <section id="dam">
      <h2>💻 Desarrollo de Aplicaciones Multiplataforma (DAM)</h2>
      <p>Especialidad centrada en la creación de aplicaciones informáticas que funcionan en múltiples sistemas operativos y dispositivos móviles.</p>

      <h3>📚 Tecnologías Esenciales</h3>
      <ul>
        <li>**Java/Kotlin:** Lógica principal, especialmente en desarrollo Android.</li>
        <li>**C# (.NET):** Aplicaciones de escritorio para Windows.</li>
        <li>**XML / XAML:** Diseño de la Interfaz de Usuario (UI).</li>
      </ul>

      <h3>🧪 Ejercicio Interactivo</h3>
      <p>¿Cuál de los siguientes lenguajes se usa comúnmente para la lógica principal en DAM?</p>
      <select id="damQuiz">
        <option value="">Selecciona una opción</option>
        <option value="HTML">HTML</option>
        <option value="Java">Java</option>
        <option value="Ruby">Ruby</option>
      </select>
      <button onclick="checkDamQuiz()">Comprobar</button>
      <p id="damFeedback"></p>
    </section>
  `,
  
  // HERRAMIENTAS DEV - Coincide con #herramientas-dev
  "herramientas-dev": `
    <section id="herramientas-dev">
      <h2>🛠️ Herramientas de Desarrollo (IDEs y VSC)</h2>
      <p>Visual Studio Code (VSC) es el editor más popular. Mediante extensiones, se convierte en un IDE completo para DAW y DAM.</p>
      
      <h3>Extensiones Clave de VSC</h3>
      <table>
        <thead>
          <tr>
            <th>Extensiones Clave</th>
            <th>Función</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>**Live Server**</td>
            <td>Previsualización instantánea de proyectos web (DAW).</td>
          </tr>
          <tr>
            <td>**Language Packs**</td>
            <td>Soporte para lenguajes como Java o C# (DAM).</td>
          </tr>
          <tr>
            <td>**GitLens**</td>
            <td>Integración avanzada con el control de versiones Git.</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,

  // COMANDOS LINUX - Coincide con #linux-detallado
  "linux-detallado": `
    <section id="linux-detallado">
      <h2>🐧 Comandos Esenciales de Linux</h2>
      <p>Linux es el sistema operativo estándar para servidores. Aprender comandos es crucial para el despliegue y administración de sistemas.</p>
      
      <h3>Comando Fundamental</h3>
      <div class="terminal-command">
        sudo apt update && sudo apt upgrade -y
      </div>
      <p>Este comando actualiza la lista de paquetes y luego instala las nuevas versiones de forma automática.</p>
      
      <h3>Ejercicio interactivo</h3>
      <label for="linuxInput">Escribe el comando completo que usarías para instalar el navegador Firefox:</label><br>
      <input type="text" id="linuxInput" placeholder="Ej: sudo apt install [paquete]" />
      <button onclick="checkLinuxCommand()">Comprobar</button>
      <p id="linuxFeedback"></p>
    </section>
  `,

  // FLUJO GIT - Coincide con #flujo-git
  "flujo-git": `
    <section id="flujo-git">
      <h2>🚀 Flujo de Despliegue y Control de Versiones</h2>
      <p>**Git** es esencial para el control de versiones y **Vercel/Netlify** para desplegar proyectos web.</p>

      <h3>Flujo Git Básico</h3>
      <p>Para guardar y subir tu código a un repositorio:</p>
      <div class="terminal-command">
        git init<br>
        git add .<br>
        git commit -m "Mensaje de tu cambio"<br>
        git push origin main
      </div>
      <button onclick="copyCode(this)">Copiar comandos</button>

      <h3>Despliegue Web (DAW)</h3>
      <p>Plataformas como Vercel o Netlify permiten desplegar tu aplicación web (DAW) automáticamente desde tu repositorio de Git.</p>
    </section>
  `,

  // SOBRE MÍ - Coincide con #sobre-mi
  "sobre-mi": `
    <section id="sobre-mi">
      <h2>👤 Sobre Mí</h2>
      <p>Hola, soy **Luciano Francisco Amaya Gutiérrez**. Soy un estudiante apasionado por la programación.</p>
      <p>Esta guía interactiva es parte de mi proyecto educativo para consolidar conocimientos clave de los ciclos DAM y DAW.</p>
    </section>
  `
};

// ✅ Renderizar sección según el hash
function renderSection(hash) {
  // Obtenemos la clave, si no hay hash, usamos 'home'
  const key = hash.replace("#", "") || "home"; 
  const contentElement = document.getElementById("content");
  
  // Cargamos la sección si existe, si no, volvemos a 'home'
  contentElement.innerHTML = sections[key] || sections.home;
}

// ✅ Eventos para cargar contenido dinámico
// 1. Cuando la URL cambia (al hacer clic en los enlaces del menú)
window.addEventListener("hashchange", () => renderSection(location.hash));

// 2. Cuando la página carga por primera vez (para mostrar el home al inicio)
document.addEventListener("DOMContentLoaded", () => renderSection(location.hash));
