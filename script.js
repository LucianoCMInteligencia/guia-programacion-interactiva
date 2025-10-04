document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");

  const sections = {
    home: `
      <section id="home">
        <h2>Bienvenido</h2>
        <p>Esta guía te ayudará a entender conceptos clave de programación, DAW, DAM y comandos Linux.</p>
      </section>
    `,
    daw: `
      <section id="daw">
        <h2>DAW (Desarrollo de Aplicaciones Web)</h2>
        <p>DAW se enfoca en tecnologías como HTML, CSS, JavaScript, PHP y bases de datos.</p>
        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;&lt;title&gt;Ejemplo DAW&lt;/title&gt;&lt;/head&gt;
  &lt;body&gt;&lt;h1&gt;Hola DAW&lt;/h1&gt;&lt;/body&gt;
&lt;/html&gt;</code></pre>
      </section>
    `,
    dam: `
      <section id="dam">
        <h2>DAM (Desarrollo de Aplicaciones Multiplataforma)</h2>
        <p>DAM incluye Java, Kotlin, Android Studio, y desarrollo de apps móviles y de escritorio.</p>
        <pre><code>public class HolaDAM {
  public static void main(String[] args) {
    System.out.println("Hola DAM");
  }
}</code></pre>
      </section>
    `,
    linux: `
      <section id="linux">
        <h2>Comandos Linux</h2>
        <ul>
          <li><strong>sudo apt update</strong>: Actualiza la lista de paquetes.</li>
          <li><strong>sudo apt install nombre_paquete</strong>: Instala un paquete.</li>
          <li><strong>ls</strong>: Lista archivos y carpetas.</li>
          <li><strong>cd</strong>: Cambia de directorio.</li>
        </ul>
      </section>
    `,
    "sobre-mi": `
      <section id="sobre-mi">
        <h2>Sobre Mí</h2>
        <p>Estudiante apasionado por la programación y el desarrollo web. Esta guía es parte de mi proyecto educativo.</p>
      </section>
    `
  };

  function renderSection(hash) {
    const key = hash.replace("#", "") || "home";
    content.innerHTML = sections[key] || sections.home;
  }

  renderSection(location.hash);

  window.addEventListener("hashchange", () => {
    renderSection(location.hash);
  });
});