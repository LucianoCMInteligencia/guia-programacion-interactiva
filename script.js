// ✅ Función para copiar código al portapapeles
function copyCode(button) {
  // Buscamos el elemento <pre> o .terminal-command anterior
  const codeContainer = button.previousElementSibling;
  const code = codeContainer ? codeContainer.textContent.trim() : '';

  if (code) {
    navigator.clipboard.writeText(code).then(() => {
      const originalText = button.textContent;
      button.textContent = "¡Copiado! ✅";
      setTimeout(() => button.textContent = originalText, 2000);
    }).catch(err => {
      console.error('Error al copiar el texto: ', err);
      alert('Error al copiar el texto.');
    });
  }
}

// ✅ Función para validar comando Linux
function checkLinuxCommand() {
  // Añadimos .toLowerCase() para aceptar mayúsculas/minúsculas
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

// ✅ Contenido dinámico por sección (Objeto Consolidado y Correcto)
const sections = {
  home: `
    <section id="home">
      <h2>👋 Bienvenido a Mi Guía Interactiva</h2>
      <p>Esta guía te acompañará paso a paso en tu formación como programador. Navega por el menú superior para explorar los temas clave de los ciclos DAM y DAW, desde los fundamentos hasta el control de versiones y el despliegue profesional.</p>
      <p>¡Comencemos!</p>
    </section>
  `,

  introduccion: `
    <section id="introduccion">
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
            <td>Se instala y ejecuta directamente en el sistema operativo del dispositivo.</td>
          </tr>
          <tr>
            <td>**DAW**</td>
            <td>Web</td>
            <td>Se ejecuta en un navegador de internet (Front-End) o en un servidor (Back-End).</td>
          </tr>
        </tbody>
      </table>
      
      <h3>📚 Lenguajes Clave</h3>
      <p>DAM se enfoca en lenguajes como **Java/Kotlin** (Android) y **C#** (.NET), mientras que DAW se centra en **HTML**, **CSS**, **JavaScript** y lenguajes de servidor como **PHP** o **Python**.</p>
    </section>
  `,

  daw: `
    <section id="daw">
      <h2>🌐 Desarrollo de Aplicaciones Web (DAW)</h2>
      <p>Especialidad centrada en el diseño, desarrollo y mantenimiento de sitios web y aplicaciones que se ejecutan en navegadores (Front-End) y servidores (Back-End).</p>

      <h3>📚 Tecnologías Esenciales</h3>
      <ul>
        <li>**HTML5:** Estructura de la web.</li>
        <li>**CSS3:** Diseño, estilo y apariencia visual.</li>
        <li>**JavaScript:** Interactividad, funcionalidad y lógica del lado del cliente.</li>
        <li>**PHP/Python/Node.js:** Lógica del lado del servidor (Back-End).</li>
        <li>**SQL:** Gestión de bases de datos.</li>
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

  dam: `
    <section id="dam">
      <h2>💻 Desarrollo de Aplicaciones Multiplataforma (DAM)</h2>
      <p>Especialidad centrada en la creación de aplicaciones informáticas que funcionan en múltiples sistemas operativos (Windows, Linux, macOS) y dispositivos móviles (Android, iOS).</p>

      <h3>📚 Tecnologías Esenciales</h3>
      <ul>
        <li>**Java/Kotlin:** Lógica principal, especialmente en desarrollo Android.</li>
        <li>**C# (.NET):** Aplicaciones de escritorio para Windows y entornos empresariales.</li>
        <li>**XML / XAML:** Diseño de la Interfaz de Usuario (UI) en Android y C#.</li>
        <li>**SQL (SQLite):** Persistencia de datos local en las aplicaciones.</li>
        <li>**JSON:** Intercambio de datos con servicios web externos (APIs).</li>
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
  
  "herramientas-dev": `
    <section id="herramientas-dev">
      <h2>🛠️ Herramientas de Desarrollo (IDEs y VSC)</h2>
      <p>Tu entorno de desarrollo integrado (IDE) es tu estación de trabajo. La herramienta más popular y flexible es **Visual Studio Code (VSC)**.</p>
      
      <h3>VS Code: El Editor que se Convierte en IDE</h3>
      <p>VSC es ligero y, mediante extensiones, se adapta a cualquier lenguaje (DAW o DAM).</p>
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
            <td>Previsualización instantánea de HTML/CSS/JS (DAW).</td>
          </tr>
          <tr>
            <td>**Language Packs** (Java, C#)</td>
            <td>Soporte para compilación, autocompletado y depuración (DAM).</td>
          </tr>
          <tr>
            <td>**GitLens**</td>
            <td>Integración avanzada con el control de versiones Git.</td>
          </tr>
        </tbody>
      </table>
    </section>
  `,

  linux: `
    <section id="linux">
      <h2>🐧 Comandos Esenciales de Linux</h2>
      <p>Linux es el sistema operativo estándar para servidores y desarrollo. Entender sus comandos es crucial para la administración de sistemas y el despliegue.</p>
      
      <h3>Comandos Básicos</h3>
      <div class="terminal-command">
        sudo apt update && sudo apt upgrade -y
      </div>
      <p>Este comando actualiza la lista de paquetes (`update`) y luego instala las nuevas versiones (`upgrade`) de forma automática y con permisos de administrador (`sudo`).</p>
      
      <h3>Ejercicio interactivo</h3>
      <label for="linuxInput">Escribe el comando completo que usarías para instalar el navegador Firefox:</label><br>
      <input type="text" id="linuxInput" placeholder="Ej: sudo apt install [paquete]" />
      <button onclick="checkLinuxCommand()">Comprobar</button>
      <p id="linuxFeedback"></p>
    </section>
  `,

  "flujo-git": `
    <section id="flujo-git">
      <h2>🚀 Flujo de Despliegue y Control de Versiones</h2>
      <p>El control de versiones con **Git** y el despliegue son las fases finales de cualquier proyecto profesional.</p>

      <h3>Flujo Git Básico</h3>
      <p>Para subir tu código a un repositorio como GitHub o GitLab:</p>
      <div class="terminal-command">
        git init<br>
        git add .<br>
        git commit -m "Mensaje de tu cambio"<br>
        git push origin main
      </div>
      <button onclick="copyCode(this)">Copiar comandos</button>

      <h3>Despliegue (Hosting)</h3>
      <p>Plataformas como **Vercel** o **Netlify** permiten desplegar tu aplicación web (DAW) automáticamente, conectándose a tu repositorio de Git y publicando los cambios en segundos.</p>
    </section>
  `,

  "sobre-mi": `
    <section id="sobre-mi">
      <h2>👤 Sobre Mí</h2>
      <p>Hola, soy **Luciano Francisco Amaya Gutiérrez**. Soy un estudiante apasionado por la programación y el desarrollo de software.</p>
      <p>Esta guía interactiva es parte de mi proyecto educativo para consolidar conocimientos clave de los ciclos DAM y DAW. Si tienes alguna sugerencia o encuentras algún error, ¡no dudes en notificarlo!</p>
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
// 1. Cuando la URL cambia (clic en un enlace del menú)
window.addEventListener("hashchange", () => renderSection(location.hash));

// 2. Cuando la página carga por primera vez (para mostrar el home al inicio)
document.addEventListener("DOMContentLoaded", () => renderSection(location.hash));