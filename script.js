// =============================================================
// ✅ FUNCIÓN ÚNICA: CARGAR DATOS (VERSIÓN DE PROXY EXTERNO)
// Solución definitiva para asegurar que la demo de "Carga de Datos" funcione
// sin depender de la Vercel Function.
// =============================================================
async function fetchW3cStandards() {
    const container = document.getElementById("w3c-standards-container");
    container.innerHTML = 'Corriendo prueba de conexión...';

    // URL que queremos cargar (W3C), bloqueada por CORS
    const targetUrl = 'https://www.w3.org/WAI/standards-guidelines/es';
    
    // Usamos el proxy público de CORS (corsproxy.io) para evitar el error ❌
    const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(targetUrl);

    try {
        // Hacemos la llamada al proxy externo para obtener el HTML de la web W3C
        const response = await fetch(proxyUrl); 
        
        if (!response.ok) {
            throw new Error(`Fallo en la conexión al proxy externo. Estado HTTP: ${response.status}`);
        }
        
        // El proxy externo devuelve el HTML crudo
        const rawHtml = await response.text(); 
        
        // LÓGICA DE EXTRACCIÓN MÁS ROBUSTA: Verificamos una etiqueta de idioma que es muy estable.
        const extractionMarker = 'lang="es"'; 
        
        let extractedContent = "No se pudo encontrar el fragmento clave en el HTML cargado.";
        let successMessage = "Esta sección demuestra la lógica de Front-End al usar un proxy para superar el bloqueo CORS.";

        if (rawHtml.includes(extractionMarker)) {
            extractedContent = `**Etiqueta de idioma encontrada:** "${extractionMarker}"`;
            successMessage = "¡Victoria! La conexión funcionó y confirmamos que el HTML es de la página W3C en español.";
        }

        // Inyectar el resultado de ÉXITO
        container.innerHTML = `
            <div class="w3c-card success">
                <h3>✅ Datos Actualizados desde W3C (Vía Proxy Estable)</h3>
                <p><strong>URL de origen:</strong> <code>${targetUrl}</code></p>
                <p>${successMessage}</p>
                <p><strong>Verificación de Contenido:</strong> ${extractedContent}</p>
            </div>
        `;
        
    } catch (error) {
        console.error('Error en fetchW3cStandards:', error);
        // Inyectar el resultado de ERROR
        container.innerHTML = `
            <div class="w3c-card error">
                <h3>❌ Error Crítico de Conexión</h3>
                <p>La conexión al proxy externo falló. Esto suele ser un problema de red o que el servicio de proxy está caído.</p>
                <p>Detalle: ${error.message}</p>
            </div>
        `;
    }
}


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

// ✅ Función para validar el ejercicio de SQL (SELECT)
function checkSqlQuery() {
    const input = document.getElementById("sqlInput").value.trim();
    const feedback = document.getElementById("sqlFeedback");
    
    // Normalización: minúsculas, elimina espacios extra, elimina punto y coma final
    const normalizedInput = input.toLowerCase().replace(/\s+/g, ' ').replace(/;$/, '').trim();

    // La respuesta correcta es "select nombre from alumnos"
    if (normalizedInput === "select nombre from alumnos") {
        feedback.textContent = "✅ ¡Correcto! Usas SELECT para leer y especificas la columna 'nombre' de la tabla 'alumnos'.";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "❌ Incorrecto. Recuerda la sintaxis: SELECT [columnas] FROM [tabla].";
        feedback.style.color = "red";
    }
}

// ✅ Función para validar el ejercicio de JOIN
function checkJoinQuery() {
    const input = document.getElementById("joinInput").value.trim();
    const feedback = document.getElementById("joinFeedback");
    
    // Normalización: minúsculas, elimina espacios extra, elimina punto y coma final
    const normalizedInput = input.toLowerCase().replace(/\s+/g, ' ').replace(/;$/, '').trim();

    // Usamos una verificación más flexible para los términos clave
    if (normalizedInput.includes('inner join') && normalizedInput.includes('alumnos') && normalizedInput.includes('clases') && normalizedInput.includes('id_clase')) {
        feedback.textContent = "✅ ¡Correcto! Usaste INNER JOIN para conectar las tablas 'alumnos' y 'clases' usando la clave 'id_clase'. ¡Concepto esencial en DAM/DAW!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "❌ Incorrecto. Recuerda la estructura básica del JOIN: SELECT * FROM Tabla1 INNER JOIN Tabla2 ON Tabla1.Clave = Tabla2.Clave.";
        feedback.style.color = "red";
    }
}

// ✅ Función para validar el ejercicio de POO (Clases)
function checkPooQuery() {
    const input = document.getElementById("pooInput").value.trim();
    const feedback = document.getElementById("pooFeedback");
    
    // Normalización: minúsculas, elimina espacios extra, elimina punto y coma final
    const normalizedInput = input.toLowerCase().replace(/\s+/g, ' ').replace(/;$/, '').trim();

    // Verificamos los términos clave
    if (normalizedInput.includes('const devmaria') && normalizedInput.includes('new desarrollador') && normalizedInput.includes('maría j.') && normalizedInput.includes('front-end')) {
        feedback.textContent = "✅ ¡Excelente! Has creado una nueva instancia del objeto 'Desarrollador'. ¡Dominas la creación de objetos!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "❌ Incorrecto. Recuerda la sintaxis: const [nombreVariable] = new [NombreClase]('[valor1]', '[valor2]');";
        feedback.style.color = "red";
    }
}


// =============================================================
// ✅ Contenido dinámico por sección
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

  // BLOG - Coincide con #blog
  "blog": `
    <section id="blog">
      <h2>📰 Mi Blog de Programación</h2>
      <p>Aquí compartiré artículos, tutoriales y reflexiones sobre el desarrollo web (DAW), aplicaciones multiplataforma (DAM) y las últimas tendencias tecnológicas.</p>

      <div class="blog-container">
        <article class="blog-post">
          <h3>Comandos Linux: El ABC para el Servidor</h3>
          <p class="post-meta">Publicado por Luciano F.A.G. el 15 de Octubre, 2025</p>
          <p>Un repaso a los comandos esenciales como **cd**, **ls**, y **sudo**, cruciales para la administración de cualquier entorno de desarrollo o servidor.</p>
          <a href="#linux-detallado" class="read-more-btn">Leer Tutorial Completo</a>
        </article>

        <article class="blog-post">
          <h3>DAW vs DAM: ¿Cuál elegir en 2026?</h3>
          <p class="post-meta">Publicado por Luciano F.A.G. el 20 de Septiembre, 2025</p>
          <p>Analizamos las salidas profesionales, salarios y tecnologías clave para ayudarte a decidir entre el desarrollo web y el desarrollo de aplicaciones nativas.</p>
          <a href="#que-es-dam-daw" class="read-more-btn">Leer Análisis Completo</a>
        </article>
        
        </div>
    </section>
  `,
  
  // ESTÁNDARES W3C - Coincide con #estandares-w3c
  "estandares-w3c": `
    <section id="estandares-w3c">
      <h2>🌐 Accesibilidad y Estándares W3C (WCAG)</h2>
      <p>La accesibilidad web (DAW) y la usabilidad (DAM) son fundamentales. Los estándares **WCAG (Web Content Accessibility Guidelines)** son la referencia mundial.</p>

      <h3>Demostración de Carga de Datos en Vivo</h3>
      <p>Esta sección demuestra una habilidad Full-Stack (Back-End Serverless) al intentar cargar un dato directamente de una URL de prueba, burlando la política CORS mediante una **solución de proxy estable**.</p>

      <button onclick="fetchW3cStandards()" class="w3c-btn">Actualizar Estándares Ahora</button>
      
      <div id="w3c-standards-container" style="margin-top: 20px;">
        <p>Pulsa el botón para cargar la información.</p>
      </div>
    </section>
  `, 

  // ✅ NUEVA SECCIÓN: SQL BÁSICO (Actualizada con JOIN)
  "sql-basico": `
    <section id="sql-basico">
      <h2>🗄️ SQL Básico: La Persistencia de Datos</h2>
      <p>SQL (**Structured Query Language**) es el lenguaje estándar para manejar bases de datos relacionales. Su fortaleza radica en la capacidad de relacionar datos de múltiples tablas.</p>
      
      <h3>Comandos Fundamentales (CRUD y JOIN)</h3>
      
      <p>El comando clave para relacionar tablas es **JOIN**, y el más común es el **INNER JOIN**, que devuelve filas cuando hay coincidencias en ambas tablas.</p>
      
      <table class="sql-table">
        <thead>
          <tr>
            <th>Comando</th>
            <th>Uso</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>**SELECT**</td>
            <td>Leer datos de tablas.</td>
          </tr>
          <tr>
            <td>**INSERT INTO**</td>
            <td>Crear/añadir nuevos registros.</td>
          </tr>
          <tr>
            <td>**INNER JOIN**</td>
            <td>Combina filas de dos tablas basándose en una columna relacionada (llave).</td>
          </tr>
        </tbody>
      </table>

      <h3>🧪 Ejercicio 1: SELECT</h3>
      <p>Imagina que tienes una tabla de 'alumnos'. Escribe la consulta SQL para obtener **solo la columna 'nombre'** de todos los alumnos:</p>
      
      <div class="code-editor">
        <textarea id="sqlInput" placeholder="Ej: SELECT * FROM tabla;"></textarea>
        <button onclick="checkSqlQuery()">Comprobar SELECT</button>
      </div>
      <p id="sqlFeedback"></p>

      <h3>🧪 Ejercicio 2: INNER JOIN</h3>
      <p>Tienes dos tablas: **'alumnos'** y **'clases'**. Ambas comparten la columna **'id_clase'**. Escribe el comando SQL completo para unir ambas tablas con un INNER JOIN:</p>
      
      <div class="code-editor">
        <textarea id="joinInput" placeholder="Ej: SELECT * FROM tabla1 INNER JOIN tabla2 ON tabla1.clave = tabla2.clave;"></textarea>
        <button onclick="checkJoinQuery()">Comprobar JOIN</button>
      </div>
      <p id="joinFeedback"></p>
    </section>
  `,

  // ✅ NUEVA SECCIÓN: POO EN JAVASCRIPT
  "poo-js": `
    <section id="poo-js">
      <h2>🧠 POO en JavaScript: Clases y Objetos</h2>
      <p>La **Programación Orientada a Objetos (POO)** organiza el código alrededor de 'objetos' que contienen datos y funciones. En JavaScript, usamos la sintaxis de **clases** para crear planos (blueprints) de estos objetos.</p>
      
      <h3>Conceptos Clave de POO</h3>
      <ul>
        <li>**Clase:** El plano para crear objetos (Ej: Persona).</li>
        <li>**Objeto (Instancia):** Un elemento creado a partir de la clase (Ej: Luciano, María).</li>
        <li>**Método:** Una función definida dentro de una clase.</li>
        <li>**Herencia:** Una clase nueva que toma propiedades y métodos de una clase ya existente.</li>
      </ul>
      
      <h3>Ejemplo de Clase en JS</h3>
      <p>Una clase simple para representar un **Desarrollador**:</p>
      
      <div class="terminal-command">
        class Desarrollador {
          constructor(nombre, rol) {
            this.nombre = nombre;
            this.rol = rol;
          }
        
          presentarse() {
            return \`Hola, soy \${this.nombre} y mi rol es \${this.rol}.\`;
          }
        }
        
        // Crear una instancia (un objeto)
        const devLuciano = new Desarrollador('Luciano F.', 'Full-Stack');
      </div>
      <button onclick="copyCode(this)">Copiar Código</button>
      
      <h3>🧪 Ejercicio Interactivo</h3>
      <p>Crea una nueva instancia de la clase **Desarrollador** llamada **devMaria** con el nombre 'María J.' y el rol 'Front-End'.</p>
      
      <div class="code-editor">
        <textarea id="pooInput" placeholder="Ej: const miObjeto = new Clase(...);"></textarea>
        <button onclick="checkPooQuery()">Comprobar POO</button>
      </div>
      <p id="pooFeedback"></p>
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
  
  // Cargamos la sección si existe. Si la clave no existe, cargamos 'home' como respaldo.
  contentElement.innerHTML = sections[key] || sections.home;
}

// ✅ Eventos para cargar contenido dinámico
// 1. Cuando la URL cambia (al hacer clic en los enlaces del menú)
window.addEventListener("hashchange", () => renderSection(location.hash));

// 2. Cuando la página carga por primera vez (para mostrar el home al inicio)
document.addEventListener("DOMContentLoaded", () => renderSection(location.hash));
