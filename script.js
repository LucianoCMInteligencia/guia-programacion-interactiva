// Funciones de interactividad (No modificadas)
// ----------------------------

// ✅ Función para copiar código al portapapeles
function copyCode(button) {
  const codeContainer = button.previousElementSibling;
  const code = codeContainer ? codeContainer.textContent.trim() : '';

  if (code) {
    navigator.clipboard.writeText(code).then(() => {
      const originalText = button.textContent;
      button.textContent = "¡Copiado! ✅";
      setTimeout(() => button.textContent = originalText, 2000);
    }).catch(err => {
      console.error('Error al copiar el texto: ', err);
    });
  }
}

// ✅ Función para validar comando Linux (Mantiene la interactividad)
function checkLinuxCommand() {
  const input = document.getElementById("linuxInput").value.trim().toLowerCase();
  const feedback = document.getElementById("linuxFeedback");
  if (input === "sudo apt install firefox") {
    feedback.textContent = "✅ ¡Correcto! El comando para instalar Firefox es 'sudo apt install firefox'.";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "❌ Intenta de nuevo. Recuerda usar 'sudo apt install' seguido del paquete.";
    feedback.style.color = "red";
  }
}

// ✅ Funciones para ejercicios DAM y DAW (Mantiene la interactividad)
function checkDamQuiz() {
  const value = document.getElementById("damQuiz").value;
  const feedback = document.getElementById("damFeedback");
  if (value === "Java") {
    feedback.textContent = "✅ ¡Correcto! Java es un lenguaje clave en DAM para lógica de negocio y Android.";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "❌ Intenta de nuevo. (Pista: Es un lenguaje multi-plataforma).";
    feedback.style.color = "red";
  }
}

function checkDawQuiz() {
  const value = document.getElementById("dawQuiz").value;
  const feedback = document.getElementById("dawFeedback");
  if (value === "JavaScript") {
    feedback.textContent = "✅ ¡Correcto! JavaScript es el lenguaje esencial de la interactividad Front-End.";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "❌ Intenta de nuevo. (Pista: Es el único lenguaje que el navegador entiende de forma nativa para la interactividad).";
    feedback.style.color = "red";
  }
}


// Contenido dinámico por sección (Objeto profesional y consolidado)
// -------------------------------------------------------------

const sections = {
  home: `
    <section id="home">
      <h2>👋 Bienvenido a tu Guía Profesional de Programación</h2>
      <p>Esta guía interactiva contiene toda la información esencial para tu formación como programador, cubriendo los ciclos de <strong>Desarrollo de Aplicaciones Multiplataforma (DAM)</strong> y <strong>Desarrollo de Aplicaciones Web (DAW)</strong>, además de las herramientas y el ciclo de vida de un proyecto de software.</p>
      <p>Usa el menú superior para acceder al contenido detallado, incluyendo listas de códigos, IDEs recomendados y explicaciones de comandos fundamentales.</p>
    </section>
  `,

  "que-es-dam-daw": `
    <section id="que-es-dam-daw">
      <h2>DAM vs DAW: La Distinción Fundamental 🎯</h2>
      <p><strong>DAM (Desarrollo de Aplicaciones Multiplataforma)</strong> y <strong>DAW (Desarrollo de Aplicaciones Web)</strong> son dos Ciclos Formativos de Grado Superior enfocados en el desarrollo de software, pero con especializaciones claras.</p>

      <h3>Desarrollo de Aplicaciones Multiplataforma (DAM) 💻📱</h3>
      <p>Se enfoca en la creación, implementación y mantenimiento de aplicaciones informáticas para diversos entornos y sistemas operativos.</p>
      <ul>
        <li><strong>Enfoque Principal:</strong> Aplicaciones de Escritorio (Windows, Linux, macOS) y Aplicaciones Móviles Nativas (Android, iOS).</li>
        <li><strong>Salidas Profesionales:</strong> Desarrollador de aplicaciones móviles, Programador multiplataforma, Técnico en sistemas ERP/CRM.</li>
      </ul>

      <h3>Desarrollo de Aplicaciones Web (DAW) 🌐</h3>
      <p>Se especializa en el diseño, desarrollo, implementación y mantenimiento de sitios web y aplicaciones informáticas en entornos web.</p>
      <ul>
        <li><strong>Enfoque Principal:</strong> Desarrollo Web Front-End (la interfaz) y Back-End (la lógica del servidor).</li>
        <li><strong>Salidas Profesionales:</strong> Desarrollador Web Front-End, Desarrollador Web Back-End, Desarrollador Full-Stack.</li>
      </ul>

      <h3>Tabla: Diferencia Clave</h3>
      <table>
          <thead>
              <tr>
                  <th>Ciclo</th>
                  <th>Entorno Principal</th>
                  <th>¿Dónde se ejecuta la aplicación?</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td><strong>DAM</strong></td>
                  <td>Multiplataforma</td>
                  <td>Directamente en el sistema operativo del dispositivo (móvil o escritorio).</td>
              </tr>
              <tr>
                  <td><strong>DAW</strong></td>
                  <td>Web</td>
                  <td>En un navegador de internet.</td>
              </tr>
          </tbody>
      </table>
    </section>
  `,

  daw: `
    <section id="daw">
      <h2>🌐 Códigos Fundamentales para DAW (Desarrollo Web)</h2>
      <p>La programación web profesional se basa en la combinación de lenguajes para el cliente (Front-End) y para el servidor (Back-End).</p>

      <h3>Guía de Códigos Esenciales (Front-End & Back-End)</h3>
      <table>
          <thead>
              <tr>
                  <th>Código</th>
                  <th>Tipo</th>
                  <th>Uso Esencial</th>
                  <th>Ejemplo de Uso Básico</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td><strong>HTML5</strong></td>
                  <td>Front-End (Estructura)</td>
                  <td>Construir la <strong>estructura</strong> y el contenido base de la web (esqueleto).</td>
                  <td><code>&lt;button id="saludar"&gt;Haz clic aquí&lt;/button&gt;</code>.</td>
              </tr>
              <tr>
                  <td><strong>CSS3</strong></td>
                  <td>Front-End (Estilo)</td>
                  <td>Dar <strong>diseño y apariencia visual</strong> a los elementos HTML (colores, fuentes, responsive design).</td>
                  <td><code>#saludar { background-color: blue; color: white; padding: 10px; }</code>.</td>
              </tr>
              <tr>
                  <td><strong>JavaScript (JS)</strong></td>
                  <td>Front-End (Lógica)</td>
                  <td>Añadir <strong>interactividad</strong> en el navegador, validar datos y manipular la interfaz.</td>
                  <td><code>document.getElementById('saludar').addEventListener('click', function() { alert('¡Hola!'); });</code>.</td>
              </tr>
              <tr>
                  <td><strong>PHP, Python o Node.js</strong></td>
                  <td>Back-End (Lógica)</td>
                  <td>Escribir la <strong>lógica del servidor</strong>, gestionar usuarios, seguridad y procesamiento de datos.</td>
                  <td>Un <em>script</em> que recibe un usuario y contraseña y lo verifica.</td>
              </tr>
              <tr>
                  <td><strong>SQL</strong></td>
                  <td>Bases de Datos</td>
                  <td>Lenguaje para <strong>crear, consultar y modificar</strong> la información almacenada en el servidor (MySQL, PostgreSQL).</td>
                  <td><code>SELECT nombre FROM clientes WHERE edad > 30;</code></td>
              </tr>
          </tbody>
      </table>

      <h3>🎓 Ejercicio (Front-End)</h3>
      <p>¿Cuál de estos lenguajes se usa en el desarrollo Front-End para añadir interactividad?</p>
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
      <h2>💻 Códigos Fundamentales para DAM (Multiplataforma)</h2>
      <p>La programación multiplataforma se enfoca en la lógica que se ejecuta dentro del dispositivo (móvil o escritorio) y su interacción con el sistema operativo.</p>

      <h3>Guía de Códigos Esenciales (Lógica y Datos)</h3>
      <table>
          <thead>
              <tr>
                  <th>Código</th>
                  <th>Tipo</th>
                  <th>Entorno Principal</th>
                  <th>Propósito en el Proyecto Básico</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td><strong>Kotlin / Java</strong></td>
                  <td>Lógica Principal (Android)</td>
                  <td>Multiplataforma / Móvil (Android)</td>
                  <td>Escribe la <strong>lógica central</strong> de la aplicación y se usa para construir apps Android nativas.</td>
              </tr>
              <tr>
                  <td><strong>C# (C Sharp)</strong></td>
                  <td>Lógica Principal (.NET)</td>
                  <td>Escritorio (Windows)</td>
                  <td>Lenguaje fundamental para desarrollar <strong>aplicaciones de escritorio en Windows</strong> (con el framework .NET).</td>
              </tr>
              <tr>
                  <td><strong>XML / XAML</strong></td>
                  <td>Interfaz de Usuario</td>
                  <td>Multiplataforma / Escritorio</td>
                  <td>Define el <strong>diseño de la pantalla</strong> de la aplicación (similar a HTML, pero para apps).</td>
              </tr>
              <tr>
                  <td><strong>SQL (SQLite)</strong></td>
                  <td>Persistencia de Datos</td>
                  <td>Bases de Datos Locales</td>
                  <td>Se usa para <strong>guardar datos directamente en el dispositivo</strong> (base de datos local) para que la app funcione sin internet.</td>
              </tr>
              <tr>
                  <td><strong>JSON</strong></td>
                  <td>Intercambio de Datos</td>
                  <td>Front-End & Back-End</td>
                  <td>Formato estándar para <strong>intercambiar datos</strong> con servidores externos (APIs).</td>
              </tr>
          </tbody>
      </table>

      <h3>🎓 Ejercicio (Multiplataforma)</h3>
      <p>¿Cuál de los siguientes lenguajes se usa comúnmente como base para la lógica en DAM (Android/Backend)?</p>
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
      <h2>🛠️ IDEs y Entorno de Desarrollo Profesional</h2>
      <p>Un <strong>IDE (Entorno de Desarrollo Integrado)</strong> es la herramienta principal que usarás para escribir, editar y depurar tu código.</p>

      <h3>1. El Editor/IDE Más Recomendado: Visual Studio Code (VSC)</h3>
      <p><strong>Visual Studio Code (VS Code)</strong> es la herramienta más popular en la industria. Funciona como un editor de código muy potente que se transforma en un IDE completo y ligero gracias a su sistema de extensiones.</p>
      
      <table>
          <thead>
              <tr>
                  <th>Característica</th>
                  <th>Beneficio para el Programador</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>Ligero y Rápido</td>
                  <td>Consume menos recursos que un IDE tradicional.</td>
              </tr>
              <tr>
                  <td>Multiplataforma</td>
                  <td>Funciona en Windows, macOS y Linux.</td>
              </tr>
              <tr>
                  <td>Sistema de Extensiones</td>
                  <td>Permite añadir soporte para lenguajes (Java, Python, C#), depuradores e integración con Git.</td>
              </tr>
          </tbody>
      </table>

      <h3>2. IDEs Específicos para DAM</h3>
      <p>Para el desarrollo más complejo de aplicaciones nativas, se suelen usar IDEs tradicionales:</p>
      <ul>
        <li><strong>IntelliJ IDEA</strong> (o Android Studio): El mejor soporte para Kotlin/Java y el desarrollo Android.</li>
        <li><strong>Visual Studio</strong> (el IDE completo): Esencial para el desarrollo de aplicaciones empresariales en el ecosistema C# y .NET.</li>
      </ul>
    </section>
  `,

  // SECCIÓN LINUX CORREGIDA Y AMPLIADA
  "linux-detallado": `
    <section id="linux-detallado">
      <h2>🐧 Módulo: La Terminal de Linux para Programadores</h2>
      <p>¡Hola, futuros desarrolladores! Como vuestro profesor, os diré que la terminal de Linux es vuestra <strong>navaja suiza profesional</strong>. En DAW, la usaréis para administrar servidores y en DAM, para configurar entornos de trabajo. ¡Dominarla es obligatorio!</p>

      <h3>Comandos Esenciales: Tu Caja de Herramientas de Desarrollo ⚙️</h3>
      <p>Aquí tenéis los comandos más usados en el día a día para navegar, gestionar archivos e instalar herramientas.</p>
      <table>
          <thead>
              <tr>
                  <th>Comando</th>
                  <th>Función</th>
                  <th>Uso Profesional (DAM/DAW)</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td><strong>pwd</strong></td>
                  <td>Saber dónde estás</td>
                  <td>Verificar la ruta actual de tu proyecto antes de ejecutar un comando Git.</td>
              </tr>
              <tr>
                  <td><strong>ls -l</strong></td>
                  <td>Listar contenido detallado</td>
                  <td>Inspeccionar los archivos del servidor para ver permisos y fechas de modificación.</td>
              </tr>
              <tr>
                  <td><strong>cd carpeta</strong></td>
                  <td>Moverse entre directorios</td>
                  <td>Navegar rápidamente a la carpeta del proyecto Back-End o del entorno de desarrollo.</td>
              </tr>
              <tr>
                  <td><strong>mkdir nombre</strong></td>
                  <td>Crear una carpeta</td>
                  <td>Iniciar la estructura de un nuevo proyecto (ej: 'mi-app-android').</td>
              </tr>
              <tr>
                  <td><strong>touch archivo.ext</strong></td>
                  <td>Crear un archivo vacío</td>
                  <td>Crear archivos de configuración o código rápido (ej: 'Dockerfile').</td>
              </tr>
              <tr>
                  <td><strong>sudo apt install [paquete]</strong></td>
                  <td>Instalar software</td>
                  <td>Instalar gestores de bases de datos (MySQL), librerías de Python o, como en el ejercicio, un navegador (Firefox).</td>
              </tr>
          </tbody>
      </table>

      <hr style="margin: 25px 0;">

      <h3>Desglose Detallado de la Instalación y Actualización</h3>
      <p>El comando <code>sudo apt install firefox</code> es la respuesta al ejercicio, pero <code>sudo apt update && sudo apt upgrade -y</code> es fundamental para mantener el sistema actualizado.</p>

      <h4>Comando de Ejemplo: Instalar Firefox (La respuesta al Quiz)</h4>
      <div class="terminal-command">
        sudo apt install firefox
      </div>
      
      <h4>Desglose del Comando de Mantenimiento Completo</h4>
      <p>Analicemos la secuencia completa de mantenimiento que todo desarrollador debe conocer:</p>
      <table>
          <thead>
              <tr>
                  <th>Componente</th>
                  <th>¿Qué es?</th>
                  <th>Propósito o Función</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td><strong>sudo</strong></td>
                  <td>Super User Do (Administrador)</td>
                  <td>Ejecuta comandos con privilegios de administrador.</td>
              </tr>
              <tr>
                  <td><strong>apt update</strong></td>
                  <td>Advanced Packaging Tool (Actualizar)</td>
                  <td>Actualiza la <strong>lista</strong> de paquetes disponibles desde internet.</td>
              </tr>
              <tr>
                  <td><strong>&&</strong></td>
                  <td>Operador Encadenador</td>
                  <td>Ejecuta el siguiente comando <strong>SOLO si el anterior fue exitoso</strong>.</td>
              </tr>
              <tr>
                  <td><strong>apt upgrade -y</strong></td>
                  <td>Advanced Packaging Tool (Instalar nuevas versiones)</td>
                  <td>Instala las nuevas versiones de los programas que ya tienes. (-y confirma automáticamente).</td>
              </tr>
          </tbody>
      </table>


      <h3>🎓 Ejercicio Interactivo (Conservado)</h3>
      <label for="linuxInput">Según la lista, ¿qué comando usarías para instalar Firefox?</label><br>
      <input type="text" id="linuxInput" placeholder="Escribe aquí..." />
      <button onclick="checkLinuxCommand()">Comprobar</button>
      <p id="linuxFeedback"></p>
    </section>
  `,

  "ciclo-despliegue": `
    <section id="ciclo-despliegue">
      <h2>🚀 Ciclo de Vida del Proyecto y Despliegue Profesional</h2>
      <p>El desarrollo profesional no termina con el código. Un proyecto requiere de herramientas para su mantenimiento y publicación (Despliegue).</p>

      <h3>Fase 1: Control de Versiones (Git y GitHub)</h3>
      <p><strong>Git</strong> es el sistema para rastrear cambios en tu código y <strong>GitHub</strong> es la plataforma para colaborar y almacenar tu repositorio de forma remota.</p>
      <table>
          <thead>
              <tr>
                  <th>Herramienta</th>
                  <th>Rol en el Proyecto</th>
                  <th>Comando Esencial</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td><strong>Git</strong></td>
                  <td>Control de Versiones</td>
                  <td><code>git init</code> (iniciar repositorio)</td>
              </tr>
              <tr>
                  <td><strong>GitHub</strong></td>
                  <td>Almacenamiento y Colaboración</td>
                  <td><code>git push -u origin main</code> (enviar código a la nube)</td>
              </tr>
          </tbody>
      </table>
      
      <h3>Fase 2: Publicación y Despliegue (Hosting)</h3>
      <p><strong>Vercel</strong> es una plataforma popular para desplegar rápidamente sitios estáticos (como esta guía) o aplicaciones web dinámicas.</p>
      
      <p><strong>Flujo Completo (Desarrollo Local -> Despliegue)</strong>:</p>
      <ol>
        <li>Crea la estructura del proyecto en VSC: <code>mkdir guia-programacion</code></li>
        <li>Escribe HTML, CSS y JS.</li>
        <li>Inicializa Git: <code>git init</code> y guarda los cambios: <code>git add . && git commit -m "Primera versión"</code>.</li>
        <li>Conecta tu proyecto local con GitHub y sube el código: <code>git push</code>.</li>
        <li><strong>Despliega en Vercel:</strong> Conecta tu cuenta de Vercel a GitHub, importa el repositorio y Vercel lo publicará automáticamente, dándote una URL pública.</li>
      </ol>
    </section>
  `,
  
  "sobre-mi": `
    <section id="sobre-mi">
      <h2>Sobre Mí</h2>
      <p>Hola, soy Luciano Francisco Amaya Gutiérrez. Soy estudiante apasionado por la programación y el desarrollo web. Esta guía interactiva es parte de mi proyecto educativo para compartir lo que he aprendido en detalle sobre DAM, DAW y el ciclo de vida de un proyecto de software.</p>
    </section>
  `
};


// Lógica de Renderizado
// ---------------------

// ✅ Renderizar sección según el hash
function renderSection(hash) {
  // Elimina el '#' y usa 'home' por defecto si el hash está vacío
  const key = hash.replace("#", "") || "home";
  
  // Usa la sección correspondiente o la de 'home' si la clave no existe
  document.getElementById("content").innerHTML = sections[key] || sections.home;
}

// ✅ Eventos para cargar contenido dinámico
window.addEventListener("hashchange", () => renderSection(location.hash));
document.addEventListener("DOMContentLoaded", () => renderSection(location.hash));
