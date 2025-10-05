<<<<<<< HEAD
// =============================================================
// ✅ FUNCIÓN ÚNICA: CARGAR DATOS (VERSIÓN REAL CON NETLIFY FUNCTION)
// Se llama al endpoint del proxy para obtener datos del W3C.
// =============================================================
async function fetchW3cStandards() {
    const container = document.getElementById("w3c-standards-container");
    container.innerHTML = 'Conectando con el Back-End Serverless (Netlify Function)...';

    try {
        // Llamada real al endpoint de Netlify Function
        const response = await fetch('/.netlify/functions/w3c-proxy');
        const data = await response.json();

        if (!response.ok) {
            // Manejo de errores 500 del servidor
            container.innerHTML = `<div class="w3c-card error"><h3>❌ Error de Back-End</h3><p>Fallo: ${data.message || 'Error desconocido'}</p><p>Revisa el log de tu Netlify Function en Netlify.</p></div>`;
            return;
        }

        // Si es exitoso, actualiza el contenido de la guía con los datos devueltos
        container.innerHTML = `
            <div class="w3c-card success">
                <h3>✅ Carga Exitosa vía Back-End Proxy</h3>
                <p><strong>URL de origen:</strong> <code>${data.source}</code></p>
                <p><strong>Título Extraído:</strong> ${data.title}</p>
                <p>¡La Function ha evitado el CORS y devuelto los datos!</p>
                <p style="margin-top: 10px;">
                    <a href="#w3c-iso-codes" onclick="renderSection('#w3c-iso-codes');" class="w3c-btn">
                        Ver Contenido Completo Extraído ➡️
                    </a>
                </p>
            </div>
        `;

    } catch (error) {
        // Manejo de errores de red (Front-End)
        container.innerHTML = `<div class="w3c-card error"><h3>❌ Error de Conexión</h3><p>No se pudo conectar con el endpoint de la función. (${error.message})</p><p>Asegúrate de que el archivo 'w3c-proxy.js' está desplegado en Netlify.</p></div>`;
    }
}


// =============================================================
// 🆕 FUNCIÓN ASÍNCRONA: BUSCADOR EXTERNO (PROXY SIMULADO/DEMO)
// Se invoca para palabras clave W3C, y dirige a la sección con la respuesta ya extraída.
// =============================================================
async function fetchW3cSearch(query) {
    const contentElement = document.getElementById("content");
    contentElement.innerHTML = `
        <div class="w3c-card info">
            <h3>🌐 Buscando en W3C...</h3>
            <p>Consultando al servicio de Back-End (Netlify Function) para buscar: <strong>${query}</strong></p>
        </div>
    `;

    // Simula el tiempo de red y procesamiento del servidor (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000)); 

    // SIMULACIÓN DE DEVOLUCIÓN DEL RESULTADO RELEVANTE
    const resultHtml = `
        <h2>🔎 Resultados Externos para "${query}" (W3C)</h2>
        <div class="w3c-card success">
            <h3>Resultado Relevante Encontrado sobre Códigos ISO</h3>
            <p>El Back-End simulado encontró y parseó el resultado del W3C sobre la pregunta de códigos ISO.</p>
            <p><strong>Acción:</strong> Presiona el botón para ir a la sección local que contiene esta información crítica ya extraída.</p>
            <a href="#w3c-iso-codes" onclick="renderSection('#w3c-iso-codes'); document.getElementById('searchInput').value='';" class="w3c-btn">
                Ver Respuesta W3C Completa Aquí ➡️
            </a>
        </div>
        <div class="search-result-card">
             <h3><a href="#estandares-w3c" onclick="renderSection('#estandares-w3c'); document.getElementById('searchInput').value='';">Ver Contenido Local de W3C/WCAG</a></h3>
             <p>Ver la sección de esta guía que contiene información sobre estándares web y accesibilidad.</p>
        </div>
    `;

    contentElement.innerHTML = resultHtml;
}


// =============================================================
// ✅ FUNCIÓN DE BÚSQUEDA DEDICADA (Instantánea) - MODIFICADA
// =============================================================
function searchContent() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    const contentElement = document.getElementById("content");

    if (query.length === 0) {
        renderSection(location.hash); 
        return;
    }

    // 1. Identificar si la búsqueda debe ir al servicio externo (W3C/Netlify Proxy)
    // Se ha ampliado la lista de palabras clave para ser un asistente más útil.
    const w3cKeywords = ['w3c', 'accesibilidad', 'wcag', 'wai', 'estandares web', 'html', 'css', 'javascript', 'iso', 'idioma', 'etiqueta', 'bcp 47', 'cors', 'proxy'];
    const isW3CQuery = w3cKeywords.some(keyword => query.includes(keyword));

    if (isW3CQuery) {
        // Llama a la función del asistente W3C, que simula la búsqueda externa
        fetchW3cSearch(query); 
        return;
    }


    // 2. Si no es W3C, realizar la búsqueda interna normal

    // (El resto del código de búsqueda interna, funciones de ejercicios y la estructura de 'sections'
    // se mantienen idénticos a como los proporcionaste y están completos a continuación.)
    
    // HACK para incluir palabras clave de W3C en la búsqueda interna también
    const searchableSections = { ...sections }; 
    searchableSections['estandares-w3c'] = searchableSections['estandares-w3c'].replace(
        '</section>', 
        'WCAG W3C Accesibilidad Usabilidad' + '</section>'
    );
    // Fin del HACK

    let resultsHtml = '<h2>🔎 Resultados de la Búsqueda Interna:</h2>';
    let matchFound = false;

    for (const key in searchableSections) {
        if (searchableSections.hasOwnProperty(key)) {
            const fullContent = searchableSections[key];

            const titleMatch = fullContent.match(/<h2>(.*?)<\/h2>/);
            const title = titleMatch ? titleMatch[1] : key.replace(/-/g, ' ').toUpperCase();

            const contentLower = fullContent.toLowerCase();

            if (contentLower.includes(query) || title.toLowerCase().includes(query)) {
                matchFound = true;

                let summary = fullContent.substring(fullContent.indexOf('</h2>') + 5).trim();
                summary = summary.replace(/<[^>]*>/g, '').substring(0, 150) + '...'; 

                const highlightedSummary = summary.replace(new RegExp(query, 'gi'), (match) => `<span class="highlight">${match}</span>`);

                resultsHtml += `
                    <div class="search-result-card">
                        <h3><a href="#${key}" onclick="renderSection('#${key}'); document.getElementById('searchInput').value='';">${title}</a></h3>
                        <p>${highlightedSummary}</p>
                    </div>
                `;
            }
        }
    }

    if (!matchFound) {
        resultsHtml += '<div class="w3c-card error"><h3>No se encontraron resultados en esta guía.</h3><p>Intenta buscar con un término diferente.</p></div>';
    }

    contentElement.innerHTML = resultsHtml;
}


// =============================================================
// ✅ FUNCIONES DE UTILIDAD Y EJERCICIOS (Sin cambios)
// =============================================================

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

function checkHttpCode() {
    const input = document.getElementById('httpCodeInput').value.trim();
    const feedback = document.getElementById('httpCodeFeedback');

    if (input === '301') {
        feedback.innerHTML = '¡Correcto! El código **301 Moved Permanently** informa al navegador que debe usar la nueva URL para futuras peticiones.';
        feedback.style.color = '#28a745';
    } else {
        feedback.innerHTML = '❌ Incorrecto. El código correcto es **301**. Los códigos 3xx indican redirecciones.';
        feedback.style.color = '#dc3545';
    }
}

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

function checkSqlQuery() {
    const input = document.getElementById("sqlInput").value.trim();
    const feedback = document.getElementById("sqlFeedback");

    const normalizedInput = input.toLowerCase().replace(/\s+/g, ' ').replace(/;$/, '').trim();

    if (normalizedInput === "select nombre from alumnos") {
        feedback.textContent = "✅ ¡Correcto! Usas SELECT para leer y especificas la columna 'nombre' de la tabla 'alumnos'.";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "❌ Incorrecto. Recuerda la sintaxis: SELECT [columnas] FROM [tabla].";
        feedback.style.color = "red";
    }
}

function checkJoinQuery() {
    const input = document.getElementById("joinInput").value.trim();
    const feedback = document.getElementById("joinFeedback");

    const normalizedInput = input.toLowerCase().replace(/\s+/g, ' ').replace(/;$/, '').trim();

    if (normalizedInput.includes('inner join') && normalizedInput.includes('alumnos') && normalizedInput.includes('clases') && normalizedInput.includes('id_clase')) {
        feedback.textContent = "✅ ¡Correcto! Usaste INNER JOIN para conectar las tablas 'alumnos' y 'clases' usando la clave 'id_clase'. ¡Concepto esencial en DAM/DAW!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "❌ Incorrecto. Recuerda la estructura básica del JOIN: SELECT * FROM Tabla1 INNER JOIN Tabla2 ON Tabla1.Clave = Tabla2.Clave.";
        feedback.style.color = "red";
    }
}

function checkPooQuery() {
    const input = document.getElementById("pooInput").value.trim();
    const feedback = document.getElementById("pooFeedback");

    const normalizedInput = input.toLowerCase().replace(/\s+/g, ' ').replace(/;$/, '').trim();

    if (normalizedInput.includes('const devmaria') && normalizedInput.includes('new desarrollador') && normalizedInput.includes('maría j.') && normalizedInput.includes('front-end')) {
        feedback.textContent = "✅ ¡Excelente! Has creado una nueva instancia del objeto 'Desarrollador'. ¡Dominas la creación de objetos!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "❌ Incorrecto. Recuerda la sintaxis: const [nombreVariable] = new [NombreClase]('[valor1]', '[valor2]');";
        feedback.style.color = "red";
    }
}


// =============================================================
// ✅ Contenido dinámico por sección (sections) - COPIA DE TU ESTRUCTURA
// (Se asume que la función renderSection existe en el HTML para cargar este contenido)
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

            <h3>Demostración de Carga de Datos en Vivo (Solución CORS)</h3>
            <p>Esta sección demuestra una habilidad Full-Stack al llamar a una **Netlify Function** para obtener datos de una URL externa, burlando la política CORS.</p>

            <button onclick="fetchW3cStandards()" class="w3c-btn">Actualizar Estándares Ahora</button>

            <div id="w3c-standards-container" style="margin-top: 20px;">
                <p>Pulsa el botón para cargar la información.</p>
            </div>
        </section>
    `,

    // 🆕 SECCIÓN: Contenido extraído de W3C sobre códigos ISO (Hardcodeado para la demo)
    "w3c-iso-codes": `
        <section id="w3c-iso-codes">
            <h2>📝 Códigos de Idioma ISO (2 vs 3 letras)</h2>
            <p>Este contenido fue extraído de forma simulada/demostración del sitio **w3.org** a través de la lógica de Back-End.</p>

            <h3>Respuesta del W3C (Estándar Actual)</h3>
            <div class="w3c-card info">
                <p>Tanto en Internet como en la Web se utilizan etiquetas de idioma para indicar el idioma natural del texto en protocolos y formatos, como **HTML, XHTML, XML, HTTP** y otros. En el pasado, los valores de las etiquetas de idioma estaban definidos por la especificación **RFC 3066** Etiquetas para la identificación de idiomas (y la anterior RFC 1766), y comenzaban con un **código de idioma de dos letras ISO 639-1** o un **código de tres letras ISO 639-2**.</p>
                <p>Para algunos idiomas existían alternativas de dos y tres letras en los códigos ISO. (Incluso para algunos idiomas había hasta dos alternativas de tres letras para elegir). En algunos casos, resultaba confuso elegir qué código ISO se debía usar en una etiqueta de idioma.</p>
                <p>✅ **Actualización (BCP 47):** Hoy en día ya no es necesario preocuparse por este tema. La especificación actual, **BCP 47**, indica que para consultar las subetiquetas se debe recurrir al nuevo **Registro de subetiquetas de idioma de la IANA**, simplificando la elección.</p>
            </div>
        </section>
    `,

    // SQL BÁSICO - Coincide con #sql-basico
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

    // POO EN JAVASCRIPT - Coincide con #poo-js
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
    `,

    // CONCEPTOS BASE - Coincide con #conceptos-base
    "conceptos-base": `
        <section id="conceptos-base">
            <h2>📚 Conceptos Base: El Vocabulario del Programador</h2>
            <p>Antes de escribir código, debemos entender el panorama general. Dominar estos términos es el primer paso para interpretar cualquier proyecto.</p>

            <h3>Frontend y Backend</h3>
            <table class="concept-table">
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Función Principal</th>
                        <th>Tecnologías Comunes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>**Frontend**</td>
                        <td>La parte que el usuario ve e interactúa directamente. Se ejecuta en el navegador.</td>
                        <td>HTML, CSS, JavaScript (React, Vue, Angular).</td>
                    </tr>
                    <tr>
                        <td>**Backend**</td>
                        <td>El "cerebro" o servidor. Procesa la lógica, gestiona la seguridad y almacena los datos.</td>
                        <td>Node.js, Python (Django/Flask), Java, PHP.</td>
                    </tr>
                </tbody>
            </table>

            <h3>Términos Clave</h3>
            <ul>
                <li>**API (Application Programming Interface):** Un puente que permite a dos sistemas (ej. Frontend y Backend) hablar entre sí.</li>
                <li>**Base de Datos (BBDD):** Donde se almacena la información de manera persistente (ej. MySQL, MongoDB).</li>
            </ul>
        </section>
    `,

    // FLUJO HTTP - Coincide con #flujo-http
    "flujo-http": `
        <section id="flujo-http">
            <h2>🌐 Flujo de Petición HTTP: Cómo funciona la Web</h2>
            <p>Para entender cualquier desarrollo web, es crucial saber qué ocurre desde que escribes una URL hasta que ves la página. Esto se conoce como el **Ciclo de Petición-Respuesta HTTP**.</p>

            <ol>
                <li>
                    <h3>1. Petición (Request) del Cliente 🧑‍💻</h3>
                    <p>El **Navegador** (Cliente) toma la URL y lo primero que hace es un **DNS Lookup** para traducir el nombre del dominio a una dirección IP. Luego, envía la Petición HTTP (que usa métodos como **GET** o **POST**) a esa dirección IP.</p>
                </li>
                <li>
                    <h3>2. Procesamiento del Servidor 🧠</h3>
                    <p>El **Servidor Web** procesa la petición. Si es dinámico, ejecuta código (Node.js, Python) que interactúa con la **Base de Datos (BBDD)** para obtener información.</p>
                </li>
                <li>
                    <h3>3. Respuesta (Response) del Servidor 📦</h3>
                    <p>El Servidor construye la respuesta que incluye un **Código de Estado HTTP** (ej. <strong>200 OK</strong> para éxito, <strong>404 Not Found</strong> para error) y el contenido solicitado.</p>
                </li>
                <li>
                    <h3>4. Renderizado del Navegador 🖼️</h3>
                    <p>El Navegador analiza el HTML, aplica el CSS y ejecuta el JavaScript para mostrar la página.</p>
                </li>
            </ol>

            <section class="ejercicio">
                <h3>Test Rápido: Códigos de Estado</h3>
                <p>¿Qué código HTTP se genera cuando el navegador intenta acceder a una página que ha sido **movida permanentemente** a una nueva dirección?</p>
                <input type="text" id="httpCodeInput" placeholder="Ej: 200">
                <button onclick="checkHttpCode()">Comprobar Respuesta</button>
                <p id="httpCodeFeedback"></p>
            </section>
        </section>
    `,

    // ALGORITMOS Y FLUJO - Coincide con #algoritmos-flujo
    "algoritmos-flujo": `
        <section id="algoritmos-flujo">
            <h2>🔀 Algoritmos y Flujo de Control</h2>
            <p>Un **algoritmo** es una secuencia de pasos para resolver un problema. El **Flujo de Control** (bucles, condicionales) determina qué parte del código se ejecuta y cuándo.</p>
        </section>
    `,
};
// =============================================================
// FIN DE LA ESTRUCTURA DE SECCIONES
// =============================================================


// =============================================================
// ✅ LÓGICA DE NAVEGACIÓN (Necesaria para que las funciones anteriores funcionen)
// Se asume que esta lógica es parte de tu script.js
// =============================================================
// Función para renderizar el contenido de una sección
function renderSection(hash) {
    const sectionKey = hash.replace('#', '') || 'home';
    const contentElement = document.getElementById("content");
    const sectionContent = sections[sectionKey];

    if (sectionContent) {
        contentElement.innerHTML = sectionContent;
        // Opcional: Actualizar el estado de la barra de navegación aquí
        
        // Si la sección es la de estándares, asegura que el contenedor de W3C se cargue
        if (sectionKey === 'estandares-w3c') {
            document.getElementById("w3c-standards-container").innerHTML = '<p>Pulsa el botón para cargar la información.</p>';
        }

    } else {
        contentElement.innerHTML = '<h2>404 - Sección no encontrada</h2><p>Parece que has introducido una URL incorrecta.</p>';
    }
}

// Escuchar los cambios en la URL (al hacer clic en los enlaces del menú)
window.addEventListener('hashchange', () => {
    renderSection(location.hash);
});

// Cargar la sección inicial al cargar la página
window.addEventListener('load', () => {
    renderSection(location.hash);
});
// =============================================================
// ✅ LÓGICA DE NAVEGACIÓN (Necesaria para que las funciones anteriores funcionen)
// =============================================================
// Función para renderizar el contenido de una sección
function renderSection(hash) {
    // ... (El cuerpo de la función) ...
}

// Escuchar los cambios en la URL
window.addEventListener('hashchange', () => {
    renderSection(location.hash);
});

// Cargar la sección inicial al cargar la página
window.addEventListener('load', () => {
    renderSection(location.hash);
});
// Archivo: netlify/functions/searchW3C.js
exports.handler = async (event, context) => {
    const { term } = event.queryStringParameters;

    if (!term) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Falta el término de búsqueda' }),
        };
    }

    try {
        const w3cSearchUrl = `https://www.w3.org/search/?q=${encodeURIComponent(term)}`;
        
        return {
            statusCode: 200,
            // Importante: Headers para asegurar que el frontend lo pueda leer
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                success: true, 
                redirectUrl: w3cSearchUrl,
                message: `Resultados de Búsqueda de W3C para: "${term}"`
            }),
        };
    } catch (error) {
        console.error("Error en la función de búsqueda:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error interno del servidor' }),
        };
    }
};
=======
// =============================================================
// ✅ FUNCIÓN ÚNICA: CARGAR DATOS (VERSIÓN REAL CON NETLIFY FUNCTION)
// Se llama al endpoint del proxy para obtener datos del W3C.
// =============================================================
async function fetchW3cStandards() {
    const container = document.getElementById("w3c-standards-container");
    container.innerHTML = 'Conectando con el Back-End Serverless (Netlify Function)...';

    try {
        // Llamada real al endpoint de Netlify Function
        const response = await fetch('/.netlify/functions/w3c-proxy');
        const data = await response.json();

        if (!response.ok) {
            // Manejo de errores 500 del servidor
            container.innerHTML = `<div class="w3c-card error"><h3>❌ Error de Back-End</h3><p>Fallo: ${data.message || 'Error desconocido'}</p><p>Revisa el log de tu Netlify Function en Netlify.</p></div>`;
            return;
        }

        // Si es exitoso, actualiza el contenido de la guía con los datos devueltos
        container.innerHTML = `
            <div class="w3c-card success">
                <h3>✅ Carga Exitosa vía Back-End Proxy</h3>
                <p><strong>URL de origen:</strong> <code>${data.source}</code></p>
                <p><strong>Título Extraído:</strong> ${data.title}</p>
                <p>¡La Function ha evitado el CORS y devuelto los datos!</p>
                <p style="margin-top: 10px;">
                    <a href="#w3c-iso-codes" onclick="renderSection('#w3c-iso-codes');" class="w3c-btn">
                        Ver Contenido Completo Extraído ➡️
                    </a>
                </p>
            </div>
        `;

    } catch (error) {
        // Manejo de errores de red (Front-End)
        container.innerHTML = `<div class="w3c-card error"><h3>❌ Error de Conexión</h3><p>No se pudo conectar con el endpoint de la función. (${error.message})</p><p>Asegúrate de que el archivo 'w3c-proxy.js' está desplegado en Netlify.</p></div>`;
    }
}


// =============================================================
// 🆕 FUNCIÓN ASÍNCRONA: BUSCADOR EXTERNO (PROXY SIMULADO/DEMO)
// Se invoca para palabras clave W3C, y dirige a la sección con la respuesta ya extraída.
// =============================================================
async function fetchW3cSearch(query) {
    const contentElement = document.getElementById("content");
    contentElement.innerHTML = `
        <div class="w3c-card info">
            <h3>🌐 Buscando en W3C...</h3>
            <p>Consultando al servicio de Back-End (Netlify Function) para buscar: <strong>${query}</strong></p>
        </div>
    `;

    // Simula el tiempo de red y procesamiento del servidor (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000)); 

    // SIMULACIÓN DE DEVOLUCIÓN DEL RESULTADO RELEVANTE
    const resultHtml = `
        <h2>🔎 Resultados Externos para "${query}" (W3C)</h2>
        <div class="w3c-card success">
            <h3>Resultado Relevante Encontrado sobre Códigos ISO</h3>
            <p>El Back-End simulado encontró y parseó el resultado del W3C sobre la pregunta de códigos ISO.</p>
            <p><strong>Acción:</strong> Presiona el botón para ir a la sección local que contiene esta información crítica ya extraída.</p>
            <a href="#w3c-iso-codes" onclick="renderSection('#w3c-iso-codes'); document.getElementById('searchInput').value='';" class="w3c-btn">
                Ver Respuesta W3C Completa Aquí ➡️
            </a>
        </div>
        <div class="search-result-card">
             <h3><a href="#estandares-w3c" onclick="renderSection('#estandares-w3c'); document.getElementById('searchInput').value='';">Ver Contenido Local de W3C/WCAG</a></h3>
             <p>Ver la sección de esta guía que contiene información sobre estándares web y accesibilidad.</p>
        </div>
    `;

    contentElement.innerHTML = resultHtml;
}


// =============================================================
// ✅ FUNCIÓN DE BÚSQUEDA DEDICADA (Instantánea) - MODIFICADA
// =============================================================
function searchContent() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    const contentElement = document.getElementById("content");

    if (query.length === 0) {
        renderSection(location.hash); 
        return;
    }

    // 1. Identificar si la búsqueda debe ir al servicio externo (W3C/Netlify Proxy)
    // Se ha ampliado la lista de palabras clave para ser un asistente más útil.
    const w3cKeywords = ['w3c', 'accesibilidad', 'wcag', 'wai', 'estandares web', 'html', 'css', 'javascript', 'iso', 'idioma', 'etiqueta', 'bcp 47', 'cors', 'proxy'];
    const isW3CQuery = w3cKeywords.some(keyword => query.includes(keyword));

    if (isW3CQuery) {
        // Llama a la función del asistente W3C, que simula la búsqueda externa
        fetchW3cSearch(query); 
        return;
    }


    // 2. Si no es W3C, realizar la búsqueda interna normal

    // (El resto del código de búsqueda interna, funciones de ejercicios y la estructura de 'sections'
    // se mantienen idénticos a como los proporcionaste y están completos a continuación.)
    
    // HACK para incluir palabras clave de W3C en la búsqueda interna también
    const searchableSections = { ...sections }; 
    searchableSections['estandares-w3c'] = searchableSections['estandares-w3c'].replace(
        '</section>', 
        'WCAG W3C Accesibilidad Usabilidad' + '</section>'
    );
    // Fin del HACK

    let resultsHtml = '<h2>🔎 Resultados de la Búsqueda Interna:</h2>';
    let matchFound = false;

    for (const key in searchableSections) {
        if (searchableSections.hasOwnProperty(key)) {
            const fullContent = searchableSections[key];

            const titleMatch = fullContent.match(/<h2>(.*?)<\/h2>/);
            const title = titleMatch ? titleMatch[1] : key.replace(/-/g, ' ').toUpperCase();

            const contentLower = fullContent.toLowerCase();

            if (contentLower.includes(query) || title.toLowerCase().includes(query)) {
                matchFound = true;

                let summary = fullContent.substring(fullContent.indexOf('</h2>') + 5).trim();
                summary = summary.replace(/<[^>]*>/g, '').substring(0, 150) + '...'; 

                const highlightedSummary = summary.replace(new RegExp(query, 'gi'), (match) => `<span class="highlight">${match}</span>`);

                resultsHtml += `
                    <div class="search-result-card">
                        <h3><a href="#${key}" onclick="renderSection('#${key}'); document.getElementById('searchInput').value='';">${title}</a></h3>
                        <p>${highlightedSummary}</p>
                    </div>
                `;
            }
        }
    }

    if (!matchFound) {
        resultsHtml += '<div class="w3c-card error"><h3>No se encontraron resultados en esta guía.</h3><p>Intenta buscar con un término diferente.</p></div>';
    }

    contentElement.innerHTML = resultsHtml;
}


// =============================================================
// ✅ FUNCIONES DE UTILIDAD Y EJERCICIOS (Sin cambios)
// =============================================================

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

function checkHttpCode() {
    const input = document.getElementById('httpCodeInput').value.trim();
    const feedback = document.getElementById('httpCodeFeedback');

    if (input === '301') {
        feedback.innerHTML = '¡Correcto! El código **301 Moved Permanently** informa al navegador que debe usar la nueva URL para futuras peticiones.';
        feedback.style.color = '#28a745';
    } else {
        feedback.innerHTML = '❌ Incorrecto. El código correcto es **301**. Los códigos 3xx indican redirecciones.';
        feedback.style.color = '#dc3545';
    }
}

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

function checkSqlQuery() {
    const input = document.getElementById("sqlInput").value.trim();
    const feedback = document.getElementById("sqlFeedback");

    const normalizedInput = input.toLowerCase().replace(/\s+/g, ' ').replace(/;$/, '').trim();

    if (normalizedInput === "select nombre from alumnos") {
        feedback.textContent = "✅ ¡Correcto! Usas SELECT para leer y especificas la columna 'nombre' de la tabla 'alumnos'.";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "❌ Incorrecto. Recuerda la sintaxis: SELECT [columnas] FROM [tabla].";
        feedback.style.color = "red";
    }
}

function checkJoinQuery() {
    const input = document.getElementById("joinInput").value.trim();
    const feedback = document.getElementById("joinFeedback");

    const normalizedInput = input.toLowerCase().replace(/\s+/g, ' ').replace(/;$/, '').trim();

    if (normalizedInput.includes('inner join') && normalizedInput.includes('alumnos') && normalizedInput.includes('clases') && normalizedInput.includes('id_clase')) {
        feedback.textContent = "✅ ¡Correcto! Usaste INNER JOIN para conectar las tablas 'alumnos' y 'clases' usando la clave 'id_clase'. ¡Concepto esencial en DAM/DAW!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "❌ Incorrecto. Recuerda la estructura básica del JOIN: SELECT * FROM Tabla1 INNER JOIN Tabla2 ON Tabla1.Clave = Tabla2.Clave.";
        feedback.style.color = "red";
    }
}

function checkPooQuery() {
    const input = document.getElementById("pooInput").value.trim();
    const feedback = document.getElementById("pooFeedback");

    const normalizedInput = input.toLowerCase().replace(/\s+/g, ' ').replace(/;$/, '').trim();

    if (normalizedInput.includes('const devmaria') && normalizedInput.includes('new desarrollador') && normalizedInput.includes('maría j.') && normalizedInput.includes('front-end')) {
        feedback.textContent = "✅ ¡Excelente! Has creado una nueva instancia del objeto 'Desarrollador'. ¡Dominas la creación de objetos!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = "❌ Incorrecto. Recuerda la sintaxis: const [nombreVariable] = new [NombreClase]('[valor1]', '[valor2]');";
        feedback.style.color = "red";
    }
}


// =============================================================
// ✅ Contenido dinámico por sección (sections) - COPIA DE TU ESTRUCTURA
// (Se asume que la función renderSection existe en el HTML para cargar este contenido)
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

            <h3>Demostración de Carga de Datos en Vivo (Solución CORS)</h3>
            <p>Esta sección demuestra una habilidad Full-Stack al llamar a una **Netlify Function** para obtener datos de una URL externa, burlando la política CORS.</p>

            <button onclick="fetchW3cStandards()" class="w3c-btn">Actualizar Estándares Ahora</button>

            <div id="w3c-standards-container" style="margin-top: 20px;">
                <p>Pulsa el botón para cargar la información.</p>
            </div>
        </section>
    `,

    // 🆕 SECCIÓN: Contenido extraído de W3C sobre códigos ISO (Hardcodeado para la demo)
    "w3c-iso-codes": `
        <section id="w3c-iso-codes">
            <h2>📝 Códigos de Idioma ISO (2 vs 3 letras)</h2>
            <p>Este contenido fue extraído de forma simulada/demostración del sitio **w3.org** a través de la lógica de Back-End.</p>

            <h3>Respuesta del W3C (Estándar Actual)</h3>
            <div class="w3c-card info">
                <p>Tanto en Internet como en la Web se utilizan etiquetas de idioma para indicar el idioma natural del texto en protocolos y formatos, como **HTML, XHTML, XML, HTTP** y otros. En el pasado, los valores de las etiquetas de idioma estaban definidos por la especificación **RFC 3066** Etiquetas para la identificación de idiomas (y la anterior RFC 1766), y comenzaban con un **código de idioma de dos letras ISO 639-1** o un **código de tres letras ISO 639-2**.</p>
                <p>Para algunos idiomas existían alternativas de dos y tres letras en los códigos ISO. (Incluso para algunos idiomas había hasta dos alternativas de tres letras para elegir). En algunos casos, resultaba confuso elegir qué código ISO se debía usar en una etiqueta de idioma.</p>
                <p>✅ **Actualización (BCP 47):** Hoy en día ya no es necesario preocuparse por este tema. La especificación actual, **BCP 47**, indica que para consultar las subetiquetas se debe recurrir al nuevo **Registro de subetiquetas de idioma de la IANA**, simplificando la elección.</p>
            </div>
        </section>
    `,

    // SQL BÁSICO - Coincide con #sql-basico
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

    // POO EN JAVASCRIPT - Coincide con #poo-js
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
    `,

    // CONCEPTOS BASE - Coincide con #conceptos-base
    "conceptos-base": `
        <section id="conceptos-base">
            <h2>📚 Conceptos Base: El Vocabulario del Programador</h2>
            <p>Antes de escribir código, debemos entender el panorama general. Dominar estos términos es el primer paso para interpretar cualquier proyecto.</p>

            <h3>Frontend y Backend</h3>
            <table class="concept-table">
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Función Principal</th>
                        <th>Tecnologías Comunes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>**Frontend**</td>
                        <td>La parte que el usuario ve e interactúa directamente. Se ejecuta en el navegador.</td>
                        <td>HTML, CSS, JavaScript (React, Vue, Angular).</td>
                    </tr>
                    <tr>
                        <td>**Backend**</td>
                        <td>El "cerebro" o servidor. Procesa la lógica, gestiona la seguridad y almacena los datos.</td>
                        <td>Node.js, Python (Django/Flask), Java, PHP.</td>
                    </tr>
                </tbody>
            </table>

            <h3>Términos Clave</h3>
            <ul>
                <li>**API (Application Programming Interface):** Un puente que permite a dos sistemas (ej. Frontend y Backend) hablar entre sí.</li>
                <li>**Base de Datos (BBDD):** Donde se almacena la información de manera persistente (ej. MySQL, MongoDB).</li>
            </ul>
        </section>
    `,

    // FLUJO HTTP - Coincide con #flujo-http
    "flujo-http": `
        <section id="flujo-http">
            <h2>🌐 Flujo de Petición HTTP: Cómo funciona la Web</h2>
            <p>Para entender cualquier desarrollo web, es crucial saber qué ocurre desde que escribes una URL hasta que ves la página. Esto se conoce como el **Ciclo de Petición-Respuesta HTTP**.</p>

            <ol>
                <li>
                    <h3>1. Petición (Request) del Cliente 🧑‍💻</h3>
                    <p>El **Navegador** (Cliente) toma la URL y lo primero que hace es un **DNS Lookup** para traducir el nombre del dominio a una dirección IP. Luego, envía la Petición HTTP (que usa métodos como **GET** o **POST**) a esa dirección IP.</p>
                </li>
                <li>
                    <h3>2. Procesamiento del Servidor 🧠</h3>
                    <p>El **Servidor Web** procesa la petición. Si es dinámico, ejecuta código (Node.js, Python) que interactúa con la **Base de Datos (BBDD)** para obtener información.</p>
                </li>
                <li>
                    <h3>3. Respuesta (Response) del Servidor 📦</h3>
                    <p>El Servidor construye la respuesta que incluye un **Código de Estado HTTP** (ej. <strong>200 OK</strong> para éxito, <strong>404 Not Found</strong> para error) y el contenido solicitado.</p>
                </li>
                <li>
                    <h3>4. Renderizado del Navegador 🖼️</h3>
                    <p>El Navegador analiza el HTML, aplica el CSS y ejecuta el JavaScript para mostrar la página.</p>
                </li>
            </ol>

            <section class="ejercicio">
                <h3>Test Rápido: Códigos de Estado</h3>
                <p>¿Qué código HTTP se genera cuando el navegador intenta acceder a una página que ha sido **movida permanentemente** a una nueva dirección?</p>
                <input type="text" id="httpCodeInput" placeholder="Ej: 200">
                <button onclick="checkHttpCode()">Comprobar Respuesta</button>
                <p id="httpCodeFeedback"></p>
            </section>
        </section>
    `,

    // ALGORITMOS Y FLUJO - Coincide con #algoritmos-flujo
    "algoritmos-flujo": `
        <section id="algoritmos-flujo">
            <h2>🔀 Algoritmos y Flujo de Control</h2>
            <p>Un **algoritmo** es una secuencia de pasos para resolver un problema. El **Flujo de Control** (bucles, condicionales) determina qué parte del código se ejecuta y cuándo.</p>
        </section>
    `,
};
// =============================================================
// FIN DE LA ESTRUCTURA DE SECCIONES
// =============================================================


// =============================================================
// ✅ LÓGICA DE NAVEGACIÓN (Necesaria para que las funciones anteriores funcionen)
// Se asume que esta lógica es parte de tu script.js
// =============================================================
// Función para renderizar el contenido de una sección
function renderSection(hash) {
    const sectionKey = hash.replace('#', '') || 'home';
    const contentElement = document.getElementById("content");
    const sectionContent = sections[sectionKey];

    if (sectionContent) {
        contentElement.innerHTML = sectionContent;
        // Opcional: Actualizar el estado de la barra de navegación aquí
        
        // Si la sección es la de estándares, asegura que el contenedor de W3C se cargue
        if (sectionKey === 'estandares-w3c') {
            document.getElementById("w3c-standards-container").innerHTML = '<p>Pulsa el botón para cargar la información.</p>';
        }

    } else {
        contentElement.innerHTML = '<h2>404 - Sección no encontrada</h2><p>Parece que has introducido una URL incorrecta.</p>';
    }
}

// Escuchar los cambios en la URL (al hacer clic en los enlaces del menú)
window.addEventListener('hashchange', () => {
    renderSection(location.hash);
});

// Cargar la sección inicial al cargar la página
window.addEventListener('load', () => {
    renderSection(location.hash);
});
// =============================================================
// ✅ LÓGICA DE NAVEGACIÓN (Necesaria para que las funciones anteriores funcionen)
// =============================================================
// Función para renderizar el contenido de una sección
function renderSection(hash) {
    // ... (El cuerpo de la función) ...
}

// Escuchar los cambios en la URL
window.addEventListener('hashchange', () => {
    renderSection(location.hash);
});

// Cargar la sección inicial al cargar la página
window.addEventListener('load', () => {
    renderSection(location.hash);
});
>>>>>>> 58a1bf46ae04bf852aa2284fc9c6eb5b40baa935
